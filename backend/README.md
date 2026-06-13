# Backend — GBI Sion Karawang

FastAPI REST API untuk website dan CMS admin GBI Sion Karawang.

## Tech Stack

| Tool | Versi | Fungsi |
|------|-------|--------|
| Python | 3.11+ | Bahasa backend |
| FastAPI | 0.111 | REST API framework async |
| Uvicorn | 0.30 | ASGI server |
| SQLAlchemy | 2.0 | ORM database |
| Alembic | 1.13 | Migrasi skema database |
| Pydantic | 2.7 | Validasi request dan response |
| Passlib + bcrypt | — | Hash password |
| Pillow | 10 | Resize dan optimasi gambar upload |
| python-slugify | — | Generate URL slug artikel blog |

> Tidak menggunakan Redis. Session admin disimpan di tabel `sessions` SQLite.

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # edit minimal: SECRET_KEY
python init_admin.py          # buat superadmin pertama
uvicorn main:app --reload --port 8000
```

## Struktur Folder

```
backend/
├── main.py               Entry point: router, CORS, static files, lifespan
├── requirements.txt      Semua dependency Python
├── alembic.ini           Konfigurasi Alembic untuk migrasi
├── init_admin.py         Script sekali-jalan: buat akun superadmin pertama
├── .env.example          Template environment variables
├── gbi_sion.db           File database SQLite (auto-dibuat saat pertama run)
│
├── app/
│   ├── core/             Fondasi aplikasi
│   │   ├── config.py         Baca .env pakai pydantic-settings
│   │   ├── database.py       Engine SQLite, SessionLocal, get_db(), init_db()
│   │   ├── security.py       bcrypt hash/verify, generate_session_token()
│   │   └── session_store.py  Session CRUD di SQLite: create, get, delete, cleanup
│   │
│   ├── middleware/
│   │   └── session.py        get_current_admin(): baca cookie → cek tabel sessions → sliding TTL
│   │
│   ├── models/           SQLAlchemy ORM — satu file = satu tabel database
│   │   ├── user.py           Tabel users: id name email password role
│   │   ├── session.py        Tabel sessions: token user_data expires_at (pengganti Redis)
│   │   ├── pastor.py         Tabel pastors: id name title bio photo_url order
│   │   ├── program.py        Tabel programs: id title description schedule location
│   │   ├── schedule.py       Tabel schedules: id name day_of_week time_start time_end
│   │   ├── blog.py           Tabel blog_posts: id title slug content is_published
│   │   ├── announcement.py   Tabel announcements: id title content is_pinned
│   │   └── gallery.py        Tabel gallery_items: id title image_url album
│   │
│   ├── schemas/          Pydantic — validasi request body dan response shape
│   │   ├── auth.py           LoginRequest LoginResponse UserOut
│   │   ├── user.py           UserCreate UserUpdate UserOut
│   │   ├── pastor.py         PastorCreate PastorUpdate PastorOut
│   │   ├── program.py        ProgramCreate ProgramUpdate ProgramOut
│   │   ├── schedule.py       ScheduleCreate ScheduleUpdate ScheduleOut
│   │   ├── blog.py           BlogPostCreate BlogPostUpdate BlogPostOut
│   │   ├── announcement.py   AnnouncementCreate AnnouncementUpdate AnnouncementOut
│   │   └── gallery.py        GalleryCreate GalleryUpdate GalleryOut
│   │
│   ├── routers/          REST endpoints — satu file = satu resource
│   │   ├── auth.py           POST /login  POST /logout  GET /me
│   │   ├── programs.py       GET /  GET /:id  POST  PUT  DELETE
│   │   ├── blog.py           GET /  GET /:slug  POST  PUT  DELETE
│   │   ├── pastors.py        CRUD pastors
│   │   ├── schedules.py      CRUD jadwal ibadah
│   │   ├── announcements.py  CRUD pengumuman (pin/unpin)
│   │   ├── gallery.py        GET list (filter album) POST DELETE
│   │   ├── upload.py         POST /image — terima multipart, resize, simpan WebP
│   │   └── admin_users.py    CRUD user admin (superadmin only)
│   │
│   ├── services/         Business logic yang dipisah dari router
│   │   └── __init__.py       Dikembangkan saat logic makin kompleks
│   │
│   └── utils/
│       └── slug.py           unique_slug(): pastikan tidak ada slug duplikat di DB
│
├── alembic/
│   └── versions/         File migrasi database (auto-generated oleh alembic revision)
│
├── uploads/              Gambar yang diupload admin — di-serve sebagai static files
│   ├── gallery/          Foto kegiatan
│   ├── pastors/          Foto pendeta
│   └── blog/             Cover artikel blog
│
└── tests/
    ├── __init__.py
    └── test_auth.py      Pytest: test login, logout, cek session
```

## API Endpoints

| Method | Endpoint | Auth | Keterangan |
|--------|----------|------|-----------|
| GET | /api/health | — | Cek status server |
| POST | /api/auth/login | — | Login admin |
| POST | /api/auth/logout | Cookie | Logout admin |
| GET | /api/auth/me | Cookie | Cek session aktif |
| GET | /api/pastors | — | List semua pendeta |
| GET | /api/programs | — | List program aktif |
| GET | /api/blog | — | List artikel published |
| GET | /api/blog/:slug | — | Detail artikel |
| GET | /api/schedules | — | Jadwal ibadah |
| GET | /api/announcements | — | Pengumuman |
| GET | /api/gallery | — | Foto galeri |
| POST | /api/upload/image | Cookie | Upload gambar |
| POST/PUT/DELETE | /api/* | Cookie | CRUD admin |

Dokumentasi interaktif: `http://localhost:8000/docs`

## Session tanpa Redis

Session admin disimpan di tabel `sessions` SQLite:

```
sessions
├── id          Integer PK
├── token       String(64) — disimpan di httpOnly cookie
├── user_data   Text — JSON: {id, name, email, role}
├── expires_at  DateTime — TTL 15 menit
└── created_at  DateTime
```

Alur:
1. Login → `create_session()` → simpan row di tabel sessions → set cookie
2. Setiap request admin → baca cookie → `get_session()` → cek `expires_at`
3. Jika valid → sliding window: `expires_at` di-reset +15 menit
4. Logout → `delete_session()` → hapus row, clear cookie
5. `cleanup_expired_sessions()` bisa dijadwalkan berkala untuk bersihkan session mati

## Environment Variables

File: `backend/.env`

| Variable | Keterangan |
|----------|-----------|
| `DATABASE_URL` | `sqlite:///./gbi_sion.db` |
| `SECRET_KEY` | String random 32+ karakter — wajib diganti! |
| `SESSION_COOKIE_NAME` | Nama cookie (default: `gbi_session`) |
| `SESSION_TTL_MINUTES` | Durasi session menit (default: `15`) |
| `ALLOWED_ORIGINS` | Origin frontend untuk CORS |
| `UPLOAD_DIR` | Folder upload gambar |
| `MAX_FILE_SIZE_MB` | Batas ukuran file |
| `INIT_ADMIN_EMAIL` | Email superadmin pertama |
| `INIT_ADMIN_PASSWORD` | Password superadmin pertama |

## Perintah Berguna

```bash
# Jalankan dev server
uvicorn main:app --reload --port 8000

# Buat superadmin
python init_admin.py

# Cek tabel database
sqlite3 gbi_sion.db ".tables"
sqlite3 gbi_sion.db "SELECT id, email, role FROM users;"
sqlite3 gbi_sion.db "SELECT token, expires_at FROM sessions;"

# Jalankan test
pytest tests/ -v

# Generate SECRET_KEY
python -c "import secrets; print(secrets.token_hex(32))"

# Migrasi database (Alembic)
alembic revision --autogenerate -m "nama perubahan"
alembic upgrade head
```

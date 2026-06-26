# GBI Sion Karawang — Website

Website profil gereja modern dengan CMS admin berbasis peran (RBAC).

## Ringkasan Proyek

| | |
|---|---|
| **Nama** | Website GBI Sion Karawang |
| **Tujuan** | Profil gereja, program pelayanan, blog, galeri, dan CMS admin multi-peran |
| **Frontend** | React 18 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + GSAP |
| **Backend** | FastAPI + Uvicorn + SQLAlchemy ORM |
| **Database** | SQLite3 (zero-config, satu file) |
| **Session** | SQLite-based session store (tanpa Redis) |
| **Upload** | Lokal — gambar disimpan di `uploads/` |
| **Auth** | Cookie httpOnly + session table, RBAC multi-role |

---

## Status Pengembangan

### Halaman Publik

| Halaman | Status | Keterangan |
|---|---|---|
| Beranda (Home) | Selesai | Hero, about, program highlight, CTA |
| Program Pelayanan | Selesai | Terhubung ke backend, filter aktif |
| Galeri | Selesai | Grid foto, GSAP scroll animation |
| Blog | Selesai | Filter kategori (Renungan / Kesaksian), kartu artikel |
| Detail Blog | Selesai | Render by slug, kategori badge |
| Kontak | Selesai | Form pesan, Google Maps embed, sosial media, WhatsApp CTA |
| Jadwal Ibadah | Direncanakan | — |
| Pengumuman | Direncanakan | — |
| Profil Pendeta | Direncanakan | — |

### CMS Admin

| Modul | Status | Keterangan |
|---|---|---|
| Login / Logout | Selesai | Session cookie, proteksi route |
| Dashboard | Selesai | Ringkasan konten |
| Kelola Program | Selesai | CRUD lengkap + konfirmasi dialog + toast |
| Kelola Galeri | Selesai | CRUD + edit + upload gambar |
| Kelola Blog | Selesai | CRUD, draft/terbit, kategori, cover upload |
| Kelola Komunitas | Selesai | CRUD per komunitas (Remaja, Pemuda, Kaum Pria/Wanita) |
| Kelola Pengguna | Selesai | CRUD akun admin, RBAC role assignment |
| Kelola Jadwal | Direncanakan | — |
| Kelola Pengumuman | Direncanakan | — |
| Kelola Pendeta | Direncanakan | — |

### Fitur Lintas Modul

| Fitur | Status |
|---|---|
| RBAC (Super Admin / Admin / Admin Komunitas) | Selesai |
| Konfirmasi dialog sebelum CRUD | Selesai |
| Toast notifikasi (sonner) | Selesai |
| Upload gambar (multipart/form-data) | Selesai |
| Blog slug auto-generate | Selesai |
| SQLite migration runtime (ALTER TABLE) | Selesai |
| Cookie `secure` flag via ENV (`ENVIRONMENT=production`) | Selesai |

---

## Struktur Proyek

```
gbi-sion-karawang/
├── frontend/
│   ├── src/
│   │   ├── assets/images/       Gambar statis (gereja.jpg, dll)
│   │   ├── components/
│   │   │   ├── forms/           ImageUpload
│   │   │   ├── layout/          Navbar, Footer, AdminLayout, AdminSidebar
│   │   │   └── ui/              ConfirmDialog
│   │   ├── hooks/               useAuth
│   │   ├── lib/                 axios instance
│   │   ├── pages/
│   │   │   ├── admin/           CMS pages (ManageXxx)
│   │   │   └── public/          Halaman publik
│   │   ├── stores/              Zustand authStore
│   │   ├── App.tsx              Router + Toaster
│   │   └── index.css            Tailwind v4 @theme tokens
│   └── vite.config.ts
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   ├── config.py        Settings dari .env
│   │   │   ├── database.py      Engine, migrations
│   │   │   ├── security.py      Password hashing
│   │   │   └── session_store.py SQLite session CRUD
│   │   ├── middleware/
│   │   │   └── session.py       get_current_admin dependency
│   │   ├── models/              SQLAlchemy ORM models
│   │   ├── routers/             FastAPI routers (auth, programs, gallery, blog, upload, users)
│   │   └── schemas/             Pydantic schemas
│   ├── main.py                  App entrypoint, CORS, router mounting
│   ├── init_admin.py            Script buat akun admin pertama
│   └── requirements.txt
└── README.md
```

---

## Cara Menjalankan

```bash
# Terminal 1 — Backend
cd backend
python -m venv venv
venv\Scripts\activate          # Linux/Mac: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env           # edit SECRET_KEY
python init_admin.py           # buat akun superadmin pertama
uvicorn main:app --reload

# Terminal 2 — Frontend
cd frontend
npm install
cp .env.example .env.local     # isi VITE_API_BASE_URL jika perlu
npm run dev
```

| URL | Keterangan |
|---|---|
| `http://localhost:5173` | Halaman publik |
| `http://localhost:5173/admin/login` | Login CMS admin |
| `http://localhost:8000/docs` | Swagger / API docs |

---

## Environment Variables

### Backend (`.env`)

```env
DATABASE_URL=sqlite:///./gbi_sion.db
SECRET_KEY=ganti-dengan-secret-key-aman
ENVIRONMENT=development          # production untuk aktifkan secure cookie
SESSION_COOKIE_NAME=gbi_session
SESSION_TTL_MINUTES=15
ALLOWED_ORIGINS=http://localhost:5173
UPLOAD_DIR=./uploads
MAX_FILE_SIZE_MB=5
INIT_ADMIN_EMAIL=admin@gbision.org
INIT_ADMIN_PASSWORD=AdminGbiSion123_.!
```

### Frontend (`.env.local`)

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## Sistem Peran (RBAC)

| Peran | Akses |
|---|---|
| `superadmin` | Seluruh CMS + manajemen semua pengguna |
| `admin` | Seluruh CMS + buat/kelola akun komunitas |
| `admin_remaja` | Program & kegiatan RBI SION (Remaja) |
| `admin_pemuda` | Program & kegiatan PBI SION (Pemuda) |
| `admin_kaum_pria` | Program & kegiatan Kaum Pria |
| `admin_kaum_wanita` | Program & kegiatan Kaum Wanita |

---

## Catatan Teknis

- **Tailwind v4** — warna custom (`navy`, `orange`, `cream`) didaftarkan via blok `@theme {}` di `index.css`, bukan `:root` saja, agar utility class (`bg-navy`, `text-orange`) tergenerate.
- **Blog slug** — di-generate otomatis dari judul saat POST; jika duplikat, diberi suffix angka.
- **SQLite migration** — `_run_migrations()` di `database.py` menjalankan `ALTER TABLE ... ADD COLUMN` per startup; wrapped `try/except` karena SQLite tidak support `ADD COLUMN IF NOT EXISTS`.
- **Cookie secure** — dikontrol via `ENVIRONMENT=production` di `.env`; di development selalu `False` agar bisa berjalan tanpa HTTPS.
- **Upload** — file disimpan di `backend/uploads/{folder}/` dan diakses via endpoint `/uploads/{path}` yang di-mount sebagai static files.

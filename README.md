# GBI Sion Karawang — Website

Website profil dan program gereja modern dengan CMS admin.

## Ringkasan Proyek

| | |
|---|---|
| **Nama** | Website GBI Sion Karawang |
| **Tujuan** | Profil gereja, program pelayanan, dan CMS admin untuk pengelola konten |
| **Frontend** | React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion |
| **Backend** | FastAPI + Uvicorn + SQLAlchemy |
| **Database** | SQLite3 (satu file, zero-config) |
| **Session** | SQLite-based session store (tanpa Redis) |
| **Upload** | Lokal — gambar disimpan di folder `uploads/` |

## Struktur Proyek

```
gbi-sion-karawang/
├── frontend/          React app (TypeScript + Vite)
├── backend/           FastAPI app (Python)
├── README.md          Dokumentasi ini
├── .gitignore
└── docker-compose.yml Opsional — jalankan semua sekaligus
```

## Cara Cepat Menjalankan

```bash
# Terminal 1 — Backend
cd backend
python -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env         # edit SECRET_KEY
python init_admin.py         # buat akun admin pertama
uvicorn main:app --reload

# Terminal 2 — Frontend
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Buka `http://localhost:5173` untuk halaman publik.
Buka `http://localhost:5173/admin/login` untuk CMS admin.
Buka `http://localhost:8000/docs` untuk Swagger API docs.

## Dokumentasi Per Folder

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

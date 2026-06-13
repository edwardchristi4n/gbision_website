# Entry point FastAPI — daftarkan semua router, CORS, startup events
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.core.config   import settings
from app.core.database import init_db
from app.routers import (
    auth, programs, blog, gallery,
    pastors, schedules, announcements, upload, admin_users
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Buat folder uploads jika belum ada
    os.makedirs(settings.upload_dir, exist_ok=True)
    os.makedirs(f"{settings.upload_dir}/gallery", exist_ok=True)
    os.makedirs(f"{settings.upload_dir}/pastors",  exist_ok=True)
    os.makedirs(f"{settings.upload_dir}/blog",     exist_ok=True)

    init_db()   # Buat semua tabel SQLite
    yield

app = FastAPI(
    title       = "GBI Sion Karawang API",
    description = "REST API untuk website GBI Sion Karawang",
    version     = "1.0.0",
    lifespan    = lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins      = settings.allowed_origins,
    allow_credentials  = True,   # wajib untuk cookie
    allow_methods      = ["*"],
    allow_headers      = ["*"],
)

app.mount("/uploads", StaticFiles(directory=settings.upload_dir), name="uploads")

app.include_router(auth.router,          prefix="/api/auth",          tags=["Auth"])
app.include_router(pastors.router,       prefix="/api/pastors",       tags=["Pastors"])
app.include_router(programs.router,      prefix="/api/programs",      tags=["Programs"])
app.include_router(schedules.router,     prefix="/api/schedules",     tags=["Schedules"])
app.include_router(blog.router,          prefix="/api/blog",          tags=["Blog"])
app.include_router(announcements.router, prefix="/api/announcements", tags=["Announcements"])
app.include_router(gallery.router,       prefix="/api/gallery",       tags=["Gallery"])
app.include_router(upload.router,        prefix="/api/upload",        tags=["Upload"])
app.include_router(admin_users.router,   prefix="/api/admin/users",   tags=["Admin Users"])

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "GBI Sion Karawang API"}

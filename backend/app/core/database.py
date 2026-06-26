# Setup SQLAlchemy — engine SQLite, SessionLocal, Base, get_db(), init_db()
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings

engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

def get_db():
    """Dependency injection — beri session DB ke setiap request, tutup setelah selesai."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def _run_migrations():
    """Tambahkan kolom baru yang belum ada (SQLite tidak support ADD COLUMN IF NOT EXISTS)."""
    from sqlalchemy import text
    migrations = [
        "ALTER TABLE programs ADD COLUMN community VARCHAR(50)",
        "ALTER TABLE blog_posts ADD COLUMN category VARCHAR(50)",
    ]
    with engine.connect() as conn:
        for sql in migrations:
            try:
                conn.execute(text(sql))
                conn.commit()
            except Exception:
                pass  # kolom sudah ada


def init_db():
    """Buat semua tabel berdasarkan model yang sudah di-import."""
    from app import models  # noqa: F401
    Base.metadata.create_all(bind=engine)
    _run_migrations()

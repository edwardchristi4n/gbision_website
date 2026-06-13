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

def init_db():
    """Buat semua tabel berdasarkan model yang sudah di-import."""
    from app import models  # noqa: F401
    Base.metadata.create_all(bind=engine)

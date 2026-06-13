# Session store berbasis SQLite — pengganti Redis
# Menyimpan session admin di tabel 'sessions' dengan TTL manual
from sqlalchemy.orm import Session
from datetime import datetime, timedelta, timezone
from app.core.config import settings
from app.core.security import generate_session_token
import json


def create_session(db: Session, user_data: dict) -> str:
    """Buat session baru, simpan di DB, return token."""
    from app.models.session import UserSession

    token    = generate_session_token()
    expires  = datetime.now(timezone.utc) + timedelta(minutes=settings.session_ttl_minutes)

    session  = UserSession(
        token      = token,
        user_data  = json.dumps(user_data),
        expires_at = expires
    )
    db.add(session)
    db.commit()
    return token


def get_session(db: Session, token: str) -> dict | None:
    """Ambil data session dari token. Return None jika tidak ada atau expired."""
    from app.models.session import UserSession

    session = db.query(UserSession).filter(UserSession.token == token).first()
    if not session:
        return None

    now = datetime.now(timezone.utc)
    if session.expires_at.replace(tzinfo=timezone.utc) < now:
        db.delete(session)
        db.commit()
        return None

    # Sliding window — perpanjang TTL setiap kali admin aktif
    session.expires_at = now + timedelta(minutes=settings.session_ttl_minutes)
    db.commit()
    return json.loads(session.user_data)


def delete_session(db: Session, token: str) -> None:
    """Hapus session saat logout."""
    from app.models.session import UserSession

    session = db.query(UserSession).filter(UserSession.token == token).first()
    if session:
        db.delete(session)
        db.commit()


def cleanup_expired_sessions(db: Session) -> int:
    """Hapus semua session yang sudah expired — jalankan berkala."""
    from app.models.session import UserSession

    deleted = db.query(UserSession).filter(
        UserSession.expires_at < datetime.now(timezone.utc)
    ).delete()
    db.commit()
    return deleted

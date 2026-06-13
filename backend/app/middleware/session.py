# Middleware / dependency — validasi session admin dari cookie SQLite
from fastapi import Cookie, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database  import get_db
from app.core.session_store import get_session
from app.core.config    import settings


def get_current_admin(
    session_token: str | None = Cookie(default=None, alias=settings.session_cookie_name),
    db: Session = Depends(get_db)
) -> dict:
    """
    Baca cookie → cari session di SQLite → cek expiry → sliding window TTL.
    Raise 401 jika tidak ada atau expired.
    """
    if not session_token:
        raise HTTPException(status_code=401, detail="Tidak terautentikasi")

    user_data = get_session(db, session_token)
    if not user_data:
        raise HTTPException(status_code=401, detail="Session expired atau tidak valid")

    return user_data

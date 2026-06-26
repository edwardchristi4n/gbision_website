# Router autentikasi admin — login, logout, cek session (me)
from fastapi import APIRouter, Depends, HTTPException, Response, Cookie
from sqlalchemy.orm import Session

from app.core.database      import get_db
from app.core.security      import verify_password
from app.core.session_store import create_session, delete_session
from app.core.config        import settings
from app.models.user        import User
from app.schemas.auth       import LoginRequest, LoginResponse, UserOut
from app.middleware.session import get_current_admin

router = APIRouter()


@router.post("/login", response_model=LoginResponse)
def login(body: LoginRequest, response: Response, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.password):
        raise HTTPException(status_code=401, detail="Email atau password salah")

    # Simpan session di SQLite
    user_data = {"id": user.id, "name": user.name, "email": user.email, "role": user.role}
    token     = create_session(db, user_data)

    # Set httpOnly cookie
    response.set_cookie(
        key      = settings.session_cookie_name,
        value    = token,
        httponly = True,
        secure   = settings.environment == "production",
        samesite = "lax",
        max_age  = settings.session_ttl_minutes * 60
    )
    return {"message": "Login berhasil", "user": UserOut.model_validate(user)}


@router.post("/logout")
def logout(
    response: Response,
    session_token: str | None = Cookie(default=None, alias=settings.session_cookie_name),
    db: Session = Depends(get_db)
):
    if session_token:
        delete_session(db, session_token)
    response.delete_cookie(settings.session_cookie_name)
    return {"message": "Logout berhasil"}


@router.get("/me", response_model=UserOut)
def me(current: dict = Depends(get_current_admin), db: Session = Depends(get_db)):
    """Cek session aktif — dipakai frontend saat app load untuk re-hydrate state."""
    user = db.query(User).filter(User.id == current["id"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User tidak ditemukan")
    return UserOut.model_validate(user)

# Router manajemen user admin — superadmin: semua role | admin: community roles saja
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database   import get_db
from app.core.security   import hash_password
from app.models.user     import User
from app.schemas.user    import UserCreate, UserUpdate, UserOut
from app.core.rbac       import require_user_manager, COMMUNITY_ROLES, FULL_ADMIN_ROLES, ALL_ROLES

router = APIRouter()


@router.get("/", response_model=List[UserOut])
def list_users(
    db: Session = Depends(get_db),
    current: dict = Depends(require_user_manager)
):
    role = current.get("role")
    q = db.query(User)
    if role == "admin":
        # Admin standar hanya bisa lihat akun komunitas
        q = q.filter(User.role.in_(COMMUNITY_ROLES))
    return q.order_by(User.created_at).all()


@router.post("/", response_model=UserOut)
def create_user(
    body: UserCreate,
    db: Session = Depends(get_db),
    current: dict = Depends(require_user_manager)
):
    role = current.get("role")

    # Validasi role yang boleh dibuat
    if body.role not in ALL_ROLES:
        raise HTTPException(400, f"Role tidak valid. Pilihan: {', '.join(ALL_ROLES)}")

    # Admin standar hanya bisa buat akun komunitas
    if role == "admin" and body.role not in COMMUNITY_ROLES:
        raise HTTPException(
            403,
            f"Admin hanya bisa membuat akun komunitas: {', '.join(COMMUNITY_ROLES)}"
        )

    if db.query(User).filter(User.email == body.email).first():
        raise HTTPException(400, "Email sudah terdaftar")

    user = User(
        name=body.name,
        email=body.email,
        password=hash_password(body.password),
        role=body.role
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.put("/{user_id}", response_model=UserOut)
def update_user(
    user_id: int,
    body: UserUpdate,
    db: Session = Depends(get_db),
    current: dict = Depends(require_user_manager)
):
    role = current.get("role")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404, "User tidak ditemukan")

    # Admin standar hanya bisa edit akun komunitas
    if role == "admin" and user.role not in COMMUNITY_ROLES:
        raise HTTPException(403, "Admin hanya bisa mengelola akun komunitas")

    # Validasi jika role diubah
    if body.role:
        if body.role not in ALL_ROLES:
            raise HTTPException(400, f"Role tidak valid: {body.role}")
        if role == "admin" and body.role not in COMMUNITY_ROLES:
            raise HTTPException(403, "Admin hanya bisa menetapkan role komunitas")

    if body.name:     user.name     = body.name
    if body.email:    user.email    = body.email
    if body.role:     user.role     = body.role
    if body.password: user.password = hash_password(body.password)
    db.commit()
    db.refresh(user)
    return user


@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current: dict = Depends(require_user_manager)
):
    role = current.get("role")
    current_id = current.get("id")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404, "User tidak ditemukan")

    if user.id == current_id:
        raise HTTPException(400, "Tidak bisa menghapus akun sendiri")

    # Admin standar hanya bisa hapus akun komunitas
    if role == "admin" and user.role not in COMMUNITY_ROLES:
        raise HTTPException(403, "Admin hanya bisa menghapus akun komunitas")

    db.delete(user)
    db.commit()
    return {"message": "User berhasil dihapus"}

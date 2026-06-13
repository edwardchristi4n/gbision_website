# Router manajemen user admin — superadmin only
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database  import get_db
from app.core.security  import hash_password
from app.models.user    import User
from app.schemas.user   import UserCreate, UserUpdate, UserOut
from app.middleware.session import get_current_admin

router = APIRouter()

def require_superadmin(current: dict = Depends(get_current_admin)):
    if current.get("role") != "superadmin":
        raise HTTPException(403, "Hanya superadmin yang bisa mengakses fitur ini")
    return current

@router.get("/", response_model=List[UserOut], dependencies=[Depends(require_superadmin)])
def list_users(db: Session = Depends(get_db)):
    return db.query(User).order_by(User.created_at).all()

@router.post("/", response_model=UserOut, dependencies=[Depends(require_superadmin)])
def create_user(body: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == body.email).first():
        raise HTTPException(400, "Email sudah terdaftar")
    user = User(name=body.name, email=body.email, password=hash_password(body.password), role=body.role)
    db.add(user); db.commit(); db.refresh(user); return user

@router.put("/{user_id}", response_model=UserOut, dependencies=[Depends(require_superadmin)])
def update_user(user_id: int, body: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user: raise HTTPException(404)
    if body.name:     user.name  = body.name
    if body.email:    user.email = body.email
    if body.role:     user.role  = body.role
    if body.password: user.password = hash_password(body.password)
    db.commit(); db.refresh(user); return user

@router.delete("/{user_id}", dependencies=[Depends(require_superadmin)])
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user: raise HTTPException(404)
    db.delete(user); db.commit()
    return {"message": "User berhasil dihapus"}

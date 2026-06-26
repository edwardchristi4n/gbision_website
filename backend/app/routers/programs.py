# Router program pelayanan — publik: GET list & detail | admin: CRUD dengan RBAC
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from app.core.database   import get_db
from app.models.program  import Program
from app.schemas.program import ProgramCreate, ProgramUpdate, ProgramOut
from app.middleware.session import get_current_admin
from app.core.rbac       import ROLE_COMMUNITY_MAP

router = APIRouter()


@router.get("/", response_model=list[ProgramOut])
def list_programs(
    active_only: bool = True,
    community: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    community=None   → semua program
    community=general → program umum (tanpa tag komunitas)
    community=remaja  → program komunitas remaja, dst.
    """
    q = db.query(Program)
    if active_only:
        q = q.filter(Program.is_active == True)
    if community == "general":
        q = q.filter(Program.community == None)
    elif community is not None:
        q = q.filter(Program.community == community)
    return q.order_by(Program.created_at.desc()).all()


@router.get("/{program_id}", response_model=ProgramOut)
def get_program(program_id: int, db: Session = Depends(get_db)):
    p = db.query(Program).filter(Program.id == program_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Program tidak ditemukan")
    return p


@router.post("/", response_model=ProgramOut)
def create_program(
    body: ProgramCreate,
    db: Session = Depends(get_db),
    current: dict = Depends(get_current_admin)
):
    role = current.get("role")
    community_code = ROLE_COMMUNITY_MAP.get(role)
    data = body.model_dump()

    if community_code:
        # Admin komunitas: paksa community sesuai role-nya
        data["community"] = community_code

    p = Program(**data)
    db.add(p)
    db.commit()
    db.refresh(p)
    return p


@router.put("/{program_id}", response_model=ProgramOut)
def update_program(
    program_id: int,
    body: ProgramUpdate,
    db: Session = Depends(get_db),
    current: dict = Depends(get_current_admin)
):
    role = current.get("role")
    community_code = ROLE_COMMUNITY_MAP.get(role)

    p = db.query(Program).filter(Program.id == program_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Program tidak ditemukan")

    # Admin komunitas hanya boleh edit program milik komunitasnya
    if community_code and p.community != community_code:
        raise HTTPException(403, "Anda hanya bisa mengelola program komunitas Anda sendiri")

    data = body.model_dump()
    if community_code:
        data["community"] = community_code  # cegah perubahan community

    for k, v in data.items():
        setattr(p, k, v)
    db.commit()
    db.refresh(p)
    return p


@router.delete("/{program_id}")
def delete_program(
    program_id: int,
    db: Session = Depends(get_db),
    current: dict = Depends(get_current_admin)
):
    role = current.get("role")
    community_code = ROLE_COMMUNITY_MAP.get(role)

    p = db.query(Program).filter(Program.id == program_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Program tidak ditemukan")

    # Admin komunitas hanya boleh hapus program milik komunitasnya
    if community_code and p.community != community_code:
        raise HTTPException(403, "Anda hanya bisa menghapus program komunitas Anda sendiri")

    db.delete(p)
    db.commit()
    return {"message": "Berhasil dihapus"}

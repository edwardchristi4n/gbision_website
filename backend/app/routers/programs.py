# Router program pelayanan — publik: GET list & detail | admin: CRUD
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database  import get_db
from app.models.program import Program
from app.schemas.program import ProgramCreate, ProgramUpdate, ProgramOut
from app.middleware.session import get_current_admin
from typing import List

router = APIRouter()

@router.get("/", response_model=list[ProgramOut])
def list_programs(active_only: bool = True, db: Session = Depends(get_db)):
    q = db.query(Program)
    if active_only: q = q.filter(Program.is_active == True)
    return q.order_by(Program.created_at.desc()).all()

@router.get("/{program_id}", response_model=ProgramOut)
def get_program(program_id: int, db: Session = Depends(get_db)):
    p = db.query(Program).filter(Program.id == program_id).first()
    if not p: raise HTTPException(status_code=404, detail="Program tidak ditemukan")
    return p

@router.post("/", response_model=ProgramOut, dependencies=[Depends(get_current_admin)])
def create_program(body: ProgramCreate, db: Session = Depends(get_db)):
    p = Program(**body.model_dump())
    db.add(p); db.commit(); db.refresh(p)
    return p

@router.put("/{program_id}", response_model=ProgramOut, dependencies=[Depends(get_current_admin)])
def update_program(program_id: int, body: ProgramUpdate, db: Session = Depends(get_db)):
    p = db.query(Program).filter(Program.id == program_id).first()
    if not p: raise HTTPException(status_code=404)
    for k, v in body.model_dump().items(): setattr(p, k, v)
    db.commit(); db.refresh(p); return p

@router.delete("/{program_id}", dependencies=[Depends(get_current_admin)])
def delete_program(program_id: int, db: Session = Depends(get_db)):
    p = db.query(Program).filter(Program.id == program_id).first()
    if not p: raise HTTPException(status_code=404)
    db.delete(p); db.commit()
    return {"message": "Berhasil dihapus"}

# Router pastors — publik: GET list & detail | admin: CRUD
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database    import get_db
from app.models.pastor    import Pastor
from app.schemas.pastor   import PastorCreate, PastorUpdate, PastorOut
from app.middleware.session import get_current_admin

router = APIRouter()

@router.get("/", response_model=List[PastorOut])
def list_pastors(db: Session = Depends(get_db)):
    return db.query(Pastor).order_by(Pastor.order).all()

@router.get("/{pastor_id}", response_model=PastorOut)
def get_pastor(pastor_id: int, db: Session = Depends(get_db)):
    p = db.query(Pastor).filter(Pastor.id == pastor_id).first()
    if not p: raise HTTPException(404, "Pendeta tidak ditemukan")
    return p

@router.post("/", response_model=PastorOut, dependencies=[Depends(get_current_admin)])
def create_pastor(body: PastorCreate, db: Session = Depends(get_db)):
    p = Pastor(**body.model_dump())
    db.add(p); db.commit(); db.refresh(p); return p

@router.put("/{pastor_id}", response_model=PastorOut, dependencies=[Depends(get_current_admin)])
def update_pastor(pastor_id: int, body: PastorUpdate, db: Session = Depends(get_db)):
    p = db.query(Pastor).filter(Pastor.id == pastor_id).first()
    if not p: raise HTTPException(404)
    for k, v in body.model_dump().items(): setattr(p, k, v)
    db.commit(); db.refresh(p); return p

@router.delete("/{pastor_id}", dependencies=[Depends(get_current_admin)])
def delete_pastor(pastor_id: int, db: Session = Depends(get_db)):
    p = db.query(Pastor).filter(Pastor.id == pastor_id).first()
    if not p: raise HTTPException(404)
    db.delete(p); db.commit()
    return {"message": "Berhasil dihapus"}

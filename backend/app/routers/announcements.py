# Router pengumuman — publik: GET list | admin: CRUD
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database        import get_db
from app.models.announcement  import Announcement
from app.schemas.announcement import AnnouncementCreate, AnnouncementUpdate, AnnouncementOut
from app.middleware.session   import get_current_admin

router = APIRouter()

@router.get("/", response_model=List[AnnouncementOut])
def list_announcements(db: Session = Depends(get_db)):
    return db.query(Announcement).order_by(Announcement.is_pinned.desc(), Announcement.created_at.desc()).all()

@router.post("/", response_model=AnnouncementOut, dependencies=[Depends(get_current_admin)])
def create(body: AnnouncementCreate, db: Session = Depends(get_db)):
    a = Announcement(**body.model_dump())
    db.add(a); db.commit(); db.refresh(a); return a

@router.put("/{ann_id}", response_model=AnnouncementOut, dependencies=[Depends(get_current_admin)])
def update(ann_id: int, body: AnnouncementUpdate, db: Session = Depends(get_db)):
    a = db.query(Announcement).filter(Announcement.id == ann_id).first()
    if not a: raise HTTPException(404)
    for k, v in body.model_dump().items(): setattr(a, k, v)
    db.commit(); db.refresh(a); return a

@router.delete("/{ann_id}", dependencies=[Depends(get_current_admin)])
def delete(ann_id: int, db: Session = Depends(get_db)):
    a = db.query(Announcement).filter(Announcement.id == ann_id).first()
    if not a: raise HTTPException(404)
    db.delete(a); db.commit()
    return {"message": "Berhasil dihapus"}

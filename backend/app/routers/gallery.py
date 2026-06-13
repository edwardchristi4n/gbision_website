# Router galeri — publik: GET list | admin: CRUD
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database  import get_db
from app.models.gallery import GalleryItem
from app.schemas.gallery import GalleryCreate, GalleryUpdate, GalleryOut
from app.middleware.session import get_current_admin

router = APIRouter()

@router.get("/", response_model=List[GalleryOut])
def list_gallery(album: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(GalleryItem)
    if album: q = q.filter(GalleryItem.album == album)
    return q.order_by(GalleryItem.created_at.desc()).all()

@router.post("/", response_model=GalleryOut, dependencies=[Depends(get_current_admin)])
def create(body: GalleryCreate, db: Session = Depends(get_db)):
    g = GalleryItem(**body.model_dump())
    db.add(g); db.commit(); db.refresh(g); return g

@router.delete("/{item_id}", dependencies=[Depends(get_current_admin)])
def delete(item_id: int, db: Session = Depends(get_db)):
    g = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not g: raise HTTPException(404)
    db.delete(g); db.commit()
    return {"message": "Berhasil dihapus"}

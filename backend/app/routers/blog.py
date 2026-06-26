# Router blog — publik: GET list & detail by slug | admin: CRUD
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timezone

from app.core.database    import get_db
from app.models.blog      import BlogPost
from app.schemas.blog     import BlogPostCreate, BlogPostUpdate, BlogPostOut
from app.middleware.session import get_current_admin
from app.utils.slug       import unique_slug

router = APIRouter()

@router.get("/", response_model=List[BlogPostOut])
def list_posts(
    published_only: bool = True,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    q = db.query(BlogPost)
    if published_only:
        q = q.filter(BlogPost.is_published == True)
    if category:
        q = q.filter(BlogPost.category == category)
    return q.order_by(BlogPost.published_at.desc(), BlogPost.created_at.desc()).all()

@router.get("/{slug}", response_model=BlogPostOut)
def get_post(slug: str, db: Session = Depends(get_db)):
    p = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not p: raise HTTPException(404, "Artikel tidak ditemukan")
    return p

@router.post("/", response_model=BlogPostOut, dependencies=[Depends(get_current_admin)])
def create_post(body: BlogPostCreate, db: Session = Depends(get_db), current: dict = Depends(get_current_admin)):
    slug = unique_slug(body.title, db)
    post = BlogPost(**body.model_dump(), slug=slug, author_id=current["id"])
    if body.is_published:
        post.published_at = datetime.now(timezone.utc)
    db.add(post); db.commit(); db.refresh(post); return post

@router.put("/{post_id}", response_model=BlogPostOut, dependencies=[Depends(get_current_admin)])
def update_post(post_id: int, body: BlogPostUpdate, db: Session = Depends(get_db)):
    p = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not p: raise HTTPException(404)
    was_published = p.is_published
    for k, v in body.model_dump().items():
        setattr(p, k, v)
    if body.is_published and not was_published:
        p.published_at = datetime.now(timezone.utc)
    db.commit(); db.refresh(p); return p

@router.delete("/{post_id}", dependencies=[Depends(get_current_admin)])
def delete_post(post_id: int, db: Session = Depends(get_db)):
    p = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not p: raise HTTPException(404)
    db.delete(p); db.commit()
    return {"message": "Berhasil dihapus"}

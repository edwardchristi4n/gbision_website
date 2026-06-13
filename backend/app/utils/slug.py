# Generate URL slug dari judul artikel blog
from slugify import slugify
from sqlalchemy.orm import Session
from app.models.blog import BlogPost

def unique_slug(title: str, db: Session, exclude_id: int | None = None) -> str:
    base = slugify(title, allow_unicode=False)
    slug, n = base, 1
    while True:
        q = db.query(BlogPost).filter(BlogPost.slug == slug)
        if exclude_id: q = q.filter(BlogPost.id != exclude_id)
        if not q.first(): return slug
        slug = f"{base}-{n}"; n += 1

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class BlogPostBase(BaseModel):
    title: str; content: Optional[str] = None; excerpt: Optional[str] = None
    cover_url: Optional[str] = None; is_published: bool = False

class BlogPostCreate(BlogPostBase): pass
class BlogPostUpdate(BlogPostBase): pass
class BlogPostOut(BlogPostBase):
    id: int; slug: str; author_id: int
    published_at: Optional[datetime]; created_at: datetime
    model_config = {"from_attributes": True}

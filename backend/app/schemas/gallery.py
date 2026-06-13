from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class GalleryBase(BaseModel):
    title: Optional[str] = None
    image_url: str
    album: Optional[str] = None

class GalleryCreate(GalleryBase): pass
class GalleryUpdate(GalleryBase): pass
class GalleryOut(GalleryBase):
    id: int
    created_at: datetime
    model_config = {"from_attributes": True}

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AnnouncementBase(BaseModel):
    title: str
    content: Optional[str] = None
    is_pinned: bool = False

class AnnouncementCreate(AnnouncementBase): pass
class AnnouncementUpdate(AnnouncementBase): pass
class AnnouncementOut(AnnouncementBase):
    id: int
    created_at: datetime
    model_config = {"from_attributes": True}

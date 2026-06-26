from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProgramBase(BaseModel):
    title: str
    description: Optional[str] = None
    schedule: Optional[str] = None
    location: Optional[str] = None
    image_url: Optional[str] = None
    is_active: bool = True
    community: Optional[str] = None  # null=umum, 'remaja','pemuda','kaum_pria','kaum_wanita',...

class ProgramCreate(ProgramBase): pass
class ProgramUpdate(ProgramBase): pass

class ProgramOut(ProgramBase):
    id: int
    created_at: datetime
    model_config = {"from_attributes": True}

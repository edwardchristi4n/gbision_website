from pydantic import BaseModel
from typing import Optional

class PastorBase(BaseModel):
    name: str; title: Optional[str] = None; bio: Optional[str] = None
    photo_url: Optional[str] = None; order: int = 0

class PastorCreate(PastorBase): pass
class PastorUpdate(PastorBase): pass
class PastorOut(PastorBase):
    id: int
    model_config = {"from_attributes": True}

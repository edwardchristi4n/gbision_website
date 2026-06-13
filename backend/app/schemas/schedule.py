from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ScheduleBase(BaseModel):
    name: str
    day_of_week: Optional[int] = None
    time_start: Optional[str] = None
    time_end: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None

class ScheduleCreate(ScheduleBase): pass
class ScheduleUpdate(ScheduleBase): pass
class ScheduleOut(ScheduleBase):
    id: int
    created_at: datetime
    model_config = {"from_attributes": True}

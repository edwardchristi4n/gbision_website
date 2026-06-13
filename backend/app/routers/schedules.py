# Router jadwal ibadah — publik: GET list | admin: CRUD
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.core.database   import get_db
from app.models.schedule import Schedule
from app.schemas.schedule import ScheduleCreate, ScheduleUpdate, ScheduleOut
from app.middleware.session import get_current_admin

router = APIRouter()

@router.get("/", response_model=List[ScheduleOut])
def list_schedules(db: Session = Depends(get_db)):
    return db.query(Schedule).order_by(Schedule.day_of_week, Schedule.time_start).all()

@router.post("/", response_model=ScheduleOut, dependencies=[Depends(get_current_admin)])
def create(body: ScheduleCreate, db: Session = Depends(get_db)):
    s = Schedule(**body.model_dump())
    db.add(s); db.commit(); db.refresh(s); return s

@router.put("/{sch_id}", response_model=ScheduleOut, dependencies=[Depends(get_current_admin)])
def update(sch_id: int, body: ScheduleUpdate, db: Session = Depends(get_db)):
    s = db.query(Schedule).filter(Schedule.id == sch_id).first()
    if not s: raise HTTPException(404)
    for k, v in body.model_dump().items(): setattr(s, k, v)
    db.commit(); db.refresh(s); return s

@router.delete("/{sch_id}", dependencies=[Depends(get_current_admin)])
def delete(sch_id: int, db: Session = Depends(get_db)):
    s = db.query(Schedule).filter(Schedule.id == sch_id).first()
    if not s: raise HTTPException(404)
    db.delete(s); db.commit()
    return {"message": "Berhasil dihapus"}

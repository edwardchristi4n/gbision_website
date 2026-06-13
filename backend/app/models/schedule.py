# Model tabel schedules — jadwal ibadah reguler & event khusus
from sqlalchemy import Column, Integer, String, Text, DateTime, func
from app.core.database import Base

class Schedule(Base):
    __tablename__ = "schedules"
    id           = Column(Integer, primary_key=True, index=True)
    name         = Column(String(200), nullable=False)  # "Ibadah Raya", "Ibadah Pemuda"
    day_of_week  = Column(Integer)                       # 0=Senin ... 6=Minggu
    time_start   = Column(String(10))                    # "08:00"
    time_end     = Column(String(10))                    # "10:00"
    location     = Column(String(200))
    description  = Column(Text)
    created_at   = Column(DateTime, server_default=func.now())

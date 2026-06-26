# Model tabel programs — program pelayanan gereja
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, func
from app.core.database import Base

class Program(Base):
    __tablename__ = "programs"
    id          = Column(Integer, primary_key=True, index=True)
    title       = Column(String(200), nullable=False)
    description = Column(Text)
    schedule    = Column(String(200))    # misal: "Setiap Minggu, 08.00 WIB"
    location    = Column(String(200))
    image_url   = Column(String(300))
    is_active   = Column(Boolean, default=True)
    # null = program umum gereja; 'remaja','pemuda','kaum_pria','kaum_wanita',... = komunitas
    community   = Column(String(50), nullable=True)
    created_at  = Column(DateTime, server_default=func.now())
    updated_at  = Column(DateTime, server_default=func.now(), onupdate=func.now())

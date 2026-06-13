# Model tabel pastors — profil hamba Tuhan
from sqlalchemy import Column, Integer, String, Text, DateTime, func
from app.core.database import Base

class Pastor(Base):
    __tablename__ = "pastors"
    id        = Column(Integer, primary_key=True, index=True)
    name      = Column(String(150), nullable=False)
    title     = Column(String(100))                    # "Pendeta", "Gembala Sidang", dll
    bio       = Column(Text)
    photo_url = Column(String(300))
    order     = Column(Integer, default=0)             # urutan tampil di halaman
    created_at= Column(DateTime, server_default=func.now())

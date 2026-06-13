# Model tabel gallery_items — foto dokumentasi kegiatan
from sqlalchemy import Column, Integer, String, DateTime, func
from app.core.database import Base

class GalleryItem(Base):
    __tablename__ = "gallery_items"
    id        = Column(Integer, primary_key=True, index=True)
    title     = Column(String(200))
    image_url = Column(String(300), nullable=False)
    album     = Column(String(100))          # "Ibadah Raya", "Natal 2024", dll
    taken_at  = Column(DateTime)
    created_at= Column(DateTime, server_default=func.now())

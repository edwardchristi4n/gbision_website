# Model tabel announcements — pengumuman dari hamba Tuhan
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, func
from app.core.database import Base

class Announcement(Base):
    __tablename__ = "announcements"
    id         = Column(Integer, primary_key=True, index=True)
    title      = Column(String(300), nullable=False)
    content    = Column(Text)
    is_pinned  = Column(Boolean, default=False)  # pin di atas list
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

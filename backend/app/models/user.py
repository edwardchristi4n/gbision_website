# Model tabel users — admin CMS (superadmin & admin)
from sqlalchemy import Column, Integer, String, DateTime, func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    id         = Column(Integer, primary_key=True, index=True)
    name       = Column(String(100), nullable=False)
    email      = Column(String(200), unique=True, index=True, nullable=False)
    password   = Column(String(200), nullable=False)      # bcrypt hash
    role       = Column(String(20), default="admin")      # 'superadmin' | 'admin'
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

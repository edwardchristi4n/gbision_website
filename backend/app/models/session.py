# Model tabel sessions — pengganti Redis, menyimpan session admin di SQLite
from sqlalchemy import Column, Integer, String, DateTime, Text, func
from app.core.database import Base

class UserSession(Base):
    __tablename__ = "sessions"

    id         = Column(Integer, primary_key=True, index=True)
    token      = Column(String(64), unique=True, index=True, nullable=False)
    user_data  = Column(Text, nullable=False)   # JSON: {id, name, email, role}
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

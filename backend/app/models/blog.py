# Model tabel blog_posts — artikel renungan & kotbah tertulis
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, func
from app.core.database import Base

class BlogPost(Base):
    __tablename__ = "blog_posts"
    id           = Column(Integer, primary_key=True, index=True)
    title        = Column(String(300), nullable=False)
    slug         = Column(String(300), unique=True, index=True)  # URL-friendly title
    content      = Column(Text)             # konten artikel
    excerpt      = Column(Text)             # ringkasan singkat
    cover_url    = Column(String(300))
    category     = Column(String(50))       # 'renungan' | 'kesaksian'
    author_id    = Column(Integer, ForeignKey("users.id"))
    is_published = Column(Boolean, default=False)
    published_at = Column(DateTime)
    created_at   = Column(DateTime, server_default=func.now())
    updated_at   = Column(DateTime, server_default=func.now(), onupdate=func.now())

# Jalankan sekali untuk membuat akun superadmin pertama
# Usage: python init_admin.py
from app.core.database import SessionLocal, init_db
from app.core.security import hash_password
from app.core.config   import settings
from app.models.user   import User

def main():
    init_db()
    db = SessionLocal()

    existing = db.query(User).filter(User.email == settings.init_admin_email).first()
    if existing:
        print(f"Admin sudah ada: {existing.email}")
        db.close()
        return

    admin = User(
        name     = "Administrator",
        email    = settings.init_admin_email,
        password = hash_password(settings.init_admin_password),
        role     = "superadmin"
    )
    db.add(admin)
    db.commit()
    print(f"Superadmin berhasil dibuat: {admin.email}")
    db.close()

if __name__ == "__main__":
    main()

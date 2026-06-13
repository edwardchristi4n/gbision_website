# Helper keamanan — hash password bcrypt, verifikasi, generate session token
import secrets
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(plain: str) -> str:
    return pwd_context.hash(plain)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def generate_session_token() -> str:
    """Token unik 64 karakter hex — disimpan di tabel sessions SQLite."""
    return secrets.token_hex(32)

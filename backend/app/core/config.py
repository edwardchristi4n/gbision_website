# Konfigurasi aplikasi dari environment variables (.env)
from pydantic_settings import BaseSettings
from pydantic import field_validator
from typing import List, Union

class Settings(BaseSettings):
    database_url: str = "sqlite:///./gbi_sion.db"

    secret_key: str          = "dev-secret-key-ganti-di-production"
    environment: str          = "development"
    session_cookie_name: str  = "gbi_session"
    session_ttl_minutes: int = 15

    # Terima string biasa atau JSON array dari .env
    allowed_origins: Union[List[str], str] = ["http://localhost:5173"]
    upload_dir: str       = "./uploads"
    max_file_size_mb: int = 5

    # Dipakai oleh init_admin.py
    init_admin_email: str    = "admin@gbision.org"
    init_admin_password: str = "AdminGbiSion123_.!"

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def parse_origins(cls, v):
        if isinstance(v, str):
            v = v.strip()
            if v.startswith("["):
                import json
                return json.loads(v)
            # Format string biasa: "http://a,http://b"
            return [i.strip() for i in v.split(",")]
        return v

    model_config = {"env_file": ".env"}

settings = Settings()
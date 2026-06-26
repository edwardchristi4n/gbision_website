# RBAC — definisi role, mapping komunitas, dan dependency FastAPI
from fastapi import Depends, HTTPException
from app.middleware.session import get_current_admin

COMMUNITY_ROLES = ["admin_remaja", "admin_pemuda", "admin_kaum_pria", "admin_kaum_wanita"]
FULL_ADMIN_ROLES = ["superadmin", "admin"]
ALL_ROLES = FULL_ADMIN_ROLES + COMMUNITY_ROLES

ROLE_COMMUNITY_MAP: dict[str, str] = {
    "admin_remaja":     "remaja",
    "admin_pemuda":     "pemuda",
    "admin_kaum_pria":  "kaum_pria",
    "admin_kaum_wanita":"kaum_wanita",
}

ROLE_LABELS: dict[str, str] = {
    "superadmin":       "Super Admin",
    "admin":            "Admin",
    "admin_remaja":     "Admin Remaja",
    "admin_pemuda":     "Admin Pemuda",
    "admin_kaum_pria":  "Admin Kaum Pria",
    "admin_kaum_wanita":"Admin Kaum Wanita",
}

COMMUNITY_LABELS: dict[str, str] = {
    "remaja":     "RBI SION (Remaja)",
    "pemuda":     "PBI SION (Pemuda)",
    "kaum_pria":  "Kaum Pria",
    "kaum_wanita":"Kaum Wanita",
    "pd_wilayah": "PD Wilayah",
    "ibadah_emas":"Ibadah Emas",
}


def require_full_admin(current: dict = Depends(get_current_admin)) -> dict:
    if current.get("role") not in FULL_ADMIN_ROLES:
        raise HTTPException(403, "Akses ditolak: hanya Admin atau Super Admin")
    return current


def require_any_admin(current: dict = Depends(get_current_admin)) -> dict:
    if current.get("role") not in ALL_ROLES:
        raise HTTPException(403, "Akses ditolak")
    return current


def require_user_manager(current: dict = Depends(get_current_admin)) -> dict:
    """Admin dan Super Admin dapat mengelola user."""
    if current.get("role") not in FULL_ADMIN_ROLES:
        raise HTTPException(403, "Akses ditolak: hanya Admin atau Super Admin yang bisa mengelola user")
    return current


def get_community_from_role(role: str) -> str | None:
    return ROLE_COMMUNITY_MAP.get(role)

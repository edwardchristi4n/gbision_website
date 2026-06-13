# Router upload file — gambar untuk galeri, pendeta, blog, program
# File disimpan di folder uploads/, URL dikembalikan ke frontend
import os, uuid, aiofiles
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.core.config import settings
from app.middleware.session import get_current_admin
from PIL import Image
import io

router = APIRouter()

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}

@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    folder: str = "misc",
    _=Depends(get_current_admin)
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, "Format file tidak didukung. Gunakan JPG, PNG, atau WebP.")

    content = await file.read()
    if len(content) > settings.max_file_size_mb * 1024 * 1024:
        raise HTTPException(400, f"Ukuran file maksimal {settings.max_file_size_mb}MB")

    # Optimasi gambar dengan Pillow
    img = Image.open(io.BytesIO(content))
    img.thumbnail((1920, 1920))  # resize jika terlalu besar

    ext      = "webp"
    filename = f"{uuid.uuid4().hex}.{ext}"
    dest_dir = os.path.join(settings.upload_dir, folder)
    os.makedirs(dest_dir, exist_ok=True)
    dest_path = os.path.join(dest_dir, filename)

    img.save(dest_path, "WEBP", quality=85)

    url = f"/uploads/{folder}/{filename}"
    return {"url": url, "filename": filename}

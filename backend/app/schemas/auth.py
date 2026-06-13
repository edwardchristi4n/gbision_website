# Schema untuk autentikasi
from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int; name: str; email: str; role: str
    model_config = {"from_attributes": True}

class LoginResponse(BaseModel):
    message: str
    user: UserOut

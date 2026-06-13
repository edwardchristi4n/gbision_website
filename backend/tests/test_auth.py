# Test autentikasi — login, logout, cek session
# Jalankan: pytest tests/ -v
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health():
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"

def test_login_wrong_credentials():
    res = client.post("/api/auth/login", json={"email": "wrong@test.com", "password": "wrong"})
    assert res.status_code == 401

def test_me_without_session():
    res = client.get("/api/auth/me")
    assert res.status_code == 401

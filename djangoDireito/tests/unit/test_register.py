import pytest
from rest_framework.test import APIClient

@pytest.mark.django_db
def test_register_user():
    client = APIClient()
    data = {
        "email": "novo@teste.com",
        "username": "usuario_teste",
        "password": "senha123"
    }
    response = client.post("/api/register/", data)
    assert response.status_code == 201

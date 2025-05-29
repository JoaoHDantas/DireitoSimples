import pytest
from rest_framework.test import APIClient
from direitoapp.models import CustomUser

@pytest.mark.django_db
def test_login_user():
    user = CustomUser.objects.create_user(email="teste@exemplo.com", username="teste", password="123456")
    client = APIClient()
    data = {
        "username": "teste",
        "password": "123456"
    }
    response = client.post("/api/login/", data)
    assert response.status_code == 200
    assert "access" in response.data

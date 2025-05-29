
import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from direitoapp.models import Question
from inicioapp.models import Simulado

User = get_user_model()

@pytest.mark.django_db
def test_criacao_simulado():
    user = User.objects.create_user(username="admin", email="admin@teste.com", password="admin123")
    client = APIClient()
    client.force_authenticate(user=user)
    question = Question.objects.create(
        question_text="Qual a capital do Brasil?",
        alternative_a="São Paulo",
        alternative_b="Brasília",
        alternative_c="Rio de Janeiro",
        alternative_d="Salvador",
        alternative_e="Curitiba",
        correct_answer="B"
    )
    payload = {
        "titulo": "Simulado de Geografia",
        "questoes": [question.id]
    }
    response = client.post("/api/simulados/", payload, format="json")

    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["titulo"] == "Simulado de Geografia"
    simulado = Simulado.objects.get(id=data["id"])
    assert simulado.titulo == "Simulado de Geografia"
    assert question in simulado.questoes.all()

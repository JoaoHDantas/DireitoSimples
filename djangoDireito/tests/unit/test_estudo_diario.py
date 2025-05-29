import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from direitoapp.models import Question

User = get_user_model()

@pytest.mark.django_db
def test_estudo_diario_fluxo_completo():
    user = User.objects.create_user(username="usuario1", email="teste@exemplo.com", password="123456")
    client = APIClient()
    client.force_authenticate(user=user)

    question = Question.objects.create(
        question_text="Qual a capital da França?",
        alternative_a="Berlim",
        alternative_b="Londres",
        alternative_c="Paris",
        alternative_d="Madrid",
        alternative_e="Roma",
        correct_answer="C"
    )

    iniciar_response = client.post("/api/estudo-diario/iniciar/")
    assert iniciar_response.status_code == 200
    estudo_id = iniciar_response.data["estudo_id"]
    questao_response = client.get("/api/estudo-diario/questao_random/")
    assert questao_response.status_code == 200
    questao_id = questao_response.data["questao_id"]
    resposta_payload = {
        "questao_id": questao_id,
        "resposta": "C"
    }
    resposta_response = client.post("/api/estudo-diario/responder/", resposta_payload, format="json")
    assert resposta_response.status_code == 200
    assert resposta_response.data["correta"] is True
    assert resposta_response.data["etapa_atual"] == 2
    progresso_response = client.get("/api/estudo-diario/progresso/")
    assert progresso_response.status_code == 200
    assert progresso_response.data["etapa_atual"] == 2
    assert progresso_response.data["finalizado"] is False

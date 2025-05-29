from behave import given, when, then
import requests
from django.contrib.auth import get_user_model

User = get_user_model()

@given(u'que não existe um usuário com email "teste@exemplo.com"')
def step_impl(context):
    User.objects.filter(email="teste@exemplo.com").delete()

@when(u'eu tento registrar com email "teste@exemplo.com", senha "123456" e username "teste"')
def step_impl(context):
    url = "http://localhost:8000/api/register/"
    data = {
        "email": "teste@exemplo.com",
        "password": "123456",
        "username": "teste123"
    }
    context.response = requests.post(url, json=data)

@then(u'o usuário deve ser criado com sucesso')
def step_impl(context):
    print("Status:", context.response.status_code)
    print("Response:", context.response.text)
    assert context.response.status_code == 201

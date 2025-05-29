from behave import given, when, then
import requests


@given(u'que o usuário "admin" está autenticado com senha "admin"')
def step_impl(context):
    url = "http://localhost:8000/api/login/"
    data = {"username": "admin", "password": "admin"}
    response = requests.post(url, json=data)
    assert response.status_code == 200
    context.token = response.json()["access"]

@when(u'ele acessa um simulado com ID 1')
def step_impl(context):
    url = "http://localhost:8000/api/simulados/12/"
    headers = {"Authorization": f"Bearer {context.token}"}
    context.response = requests.get(url, headers=headers)

@then(u'ele deve receber as questões do simulado')
def step_impl(context):
    print("Status:", context.response.status_code)
    print("Response:", context.response.text)
    assert context.response.status_code == 200
    assert "questoes" in context.response.json()

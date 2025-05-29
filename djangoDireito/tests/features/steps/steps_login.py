from behave import given, when, then

def get_client():
    from rest_framework.test import APIClient
    return APIClient()

def get_user_model():
    from django.contrib.auth import get_user_model
    return get_user_model()

@given('que um usuário "admin" com senha "admin" existe')
def step_impl(context):
    User = get_user_model()
    if not User.objects.filter(username="admin").exists():
        User.objects.create_user(username="admin", password="admin")

@when('ele tentar fazer login com essas credenciais')
def step_impl(context):
    client = get_client()
    context.response = client.post("/api/login/", {"username": "admin", "password": "admin"})

@then('ele deve receber um token de acesso')
def step_impl(context):
    assert context.response.status_code == 200
    assert "access" in context.response.data
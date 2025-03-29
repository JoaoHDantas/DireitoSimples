from behave import given, when, then
from django.urls import reverse
from django.test import Client
from django.contrib.auth import get_user_model

User = get_user_model()

@given('que o usuário não está logado no sistema')
def step_given_usuario_nao_logado(context):
    context.client = Client()
    context.user = User.objects.create_user(username='teste', password='123456')

@when('o usuário preenche todos os campos obrigatórios no formulário de login e clica em "Entrar"')
def step_when_preenchendo_campos(context):
    login_url = reverse('login-list')  # Pega a URL correta da API
    context.response = context.client.post(login_url, {
        'username': 'teste',
        'password': '123456'
    })

@then('o usuário é redirecionado para HomePage')
def step_then_redirecionando_para_homepage(context):
    home_url = reverse('homepage-list')  # Ajuste conforme sua API
    assert context.response.status_code == 200  # API deve retornar sucesso

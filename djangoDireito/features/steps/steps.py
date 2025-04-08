from behave import given, when, then
from direitoapp.models import CustomUser
from django.test import Client
from django.contrib import messages
from django.urls import reverse


@given('que o usuário não está logado no sistema')
def step_given_usuario_nao_logado(context):
    user = CustomUser.objects.create_user(username='usuario_teste', email='usuario@gmail.com', cpf='12345678912',password='senha123')
    context.user = user
    context.client = Client()



@when('o usuário preenche todos os campos obrigatórios no formulário de login e clica em "Entrar"')
def step_when_usuario_logando(context):

    dados_login = {
        'username': 'usuario_teste',
        'password': 'senha123'
    }

    context.response = context.client.post(reverse('login'), dados_login)

@then('o usuãrio é redirecionado para HomePage')
def step_then_usuario_redirecionado(context):

    assert context.response.status_code == 302  
    assert context.response.url == reverse('home')  




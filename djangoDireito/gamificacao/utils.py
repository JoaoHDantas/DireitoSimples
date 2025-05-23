from .models import Pontuacao, Conquista, ConquistaUsuario
from django.utils.timezone import now

def adicionar_pontos(usuario, pontos):
    pontuacao, _ = Pontuacao.objects.get_or_create(usuario=usuario)
    pontuacao.pontos += pontos
    pontuacao.save()
    verificar_conquistas(usuario)

def login_diario(usuario):
    hoje = now().date()
    pontuacao, _ = Pontuacao.objects.get_or_create(usuario=usuario)
    if pontuacao.ultimo_login_diario != hoje:
        pontuacao.ultimo_login_diario = hoje
        pontuacao.pontos += 5  # valor fixo diário
        pontuacao.save()
        verificar_conquistas(usuario)

def verificar_conquistas(usuario):
    pontuacao = Pontuacao.objects.get(usuario=usuario)
    conquistas = Conquista.objects.all()
    for conquista in conquistas:
        if pontuacao.pontos >= conquista.pontos_necessarios:
            ConquistaUsuario.objects.get_or_create(usuario=usuario, conquista=conquista)

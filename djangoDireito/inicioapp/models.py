from django.db import models
from django.conf import settings
from direitoapp.models import Question

class Simulado(models.Model):
    titulo = models.CharField(max_length=100)
    descricao = models.TextField(blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    questoes = models.ManyToManyField(Question, related_name='simulados')

    def __str__(self):
        return self.titulo

class SimuladoRespondido(models.Model):
    simulado = models.ForeignKey(Simulado, on_delete=models.CASCADE)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    iniciado_em = models.DateTimeField(auto_now_add=True)
    finalizado = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.usuario} - {self.simulado}"

class Resposta(models.Model):
    simulado_respondido = models.ForeignKey(SimuladoRespondido, related_name='respostas', on_delete=models.CASCADE)
    questao = models.ForeignKey(Question, on_delete=models.CASCADE)
    resposta_usuario = models.CharField(max_length=1, choices=[
        ('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')
    ])

    def __str__(self):
        return f"{self.questao} - {self.resposta_usuario}"


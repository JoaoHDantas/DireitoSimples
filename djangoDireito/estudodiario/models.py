from django.db import models
from django.conf import settings
from direitoapp.models import Question


class EstudoDiario(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    data = models.DateField(auto_now_add=True)
    etapa_atual = models.IntegerField(default=1)
    finalizado = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.usuario.username} - {self.data}"


class EstudoDiarioResposta(models.Model):
    estudo_diario = models.ForeignKey(EstudoDiario, on_delete=models.CASCADE, related_name='respostas')
    questao = models.ForeignKey(Question, on_delete=models.CASCADE)
    resposta_usuario = models.CharField(max_length=10)
    correta = models.BooleanField()

    def __str__(self):
        return f"{self.estudo_diario} - {self.questao.id}"

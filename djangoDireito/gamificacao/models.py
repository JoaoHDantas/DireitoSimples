from django.db import models
from django.conf import settings
from django.utils.timezone import now


class Pontuacao(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='pontuacao')
    pontos = models.IntegerField(default=0)
    ultimo_login_diario = models.DateField(default=now)


    def __str__(self):
        return f'{self.usuario.username} - {self.pontos} pontos'

class Conquista(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()
    pontos_necessarios = models.IntegerField()
    icone = models.ImageField(upload_to='icones_conquistas/', blank=True, null=True)

    def __str__(self):
        return self.nome

class ConquistaUsuario(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    conquista = models.ForeignKey(Conquista, on_delete=models.CASCADE)
    data_conquistada = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('usuario', 'conquista')

    def __str__(self):
        return f'{self.usuario.username} - {self.conquista.nome}'

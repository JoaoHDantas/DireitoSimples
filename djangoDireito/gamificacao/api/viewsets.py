from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Conquista, ConquistaUsuario, Pontuacao
from .serializers import ConquistaSerializer
from .permissions import IsAuthenticatedOrOptionsOnly



class ConquistasDoUsuarioView(APIView):
    permission_classes = [IsAuthenticatedOrOptionsOnly]

    def get(self, request):
        usuario = request.user
        pontuacao_obj = Pontuacao.objects.filter(usuario=usuario).first()
        pontos = pontuacao_obj.pontos if pontuacao_obj else 0

        conquistas = Conquista.objects.all()
        conquistas_usuario = ConquistaUsuario.objects.filter(usuario=usuario).values_list('conquista_id', flat=True)

        conquistas_serializadas = []
        for conquista in conquistas:
            conquista_data = ConquistaSerializer(conquista).data
            conquista_data['conquistada'] = conquista.id in conquistas_usuario
            conquistas_serializadas.append(conquista_data)

        return Response({
            "pontos": pontos,
            "conquistas": conquistas_serializadas
        })

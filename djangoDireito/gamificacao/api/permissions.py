from rest_framework.permissions import IsAuthenticated

class IsAuthenticatedOrOptionsOnly(IsAuthenticated):
    """
    Permite qualquer requisição OPTIONS sem autenticação.
    GET, POST, PUT, DELETE exigem token normalmente.
    """
    def has_permission(self, request, view):
        if request.method == 'OPTIONS':
            return True
        return super().has_permission(request, view)

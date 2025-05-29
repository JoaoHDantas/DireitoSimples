from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, FAQ, Artigo, Download

# Configuração personalizada do admin para o usuário
class CustomUserAdmin(UserAdmin):
    model = CustomUser

    list_display = ('id', 'email', 'username', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password', 'cpf', 'endereco', 'data_nascimento', 'bio')}),
        ('Permissões', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'cpf', 'endereco', 'data_nascimento', 'bio', 'is_staff', 'is_active')}
        ),
    )

    search_fields = ('email', 'username')
    ordering = ('email',)


# Registrando os modelos no admin
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Artigo)
admin.site.register(Download)
admin.site.register(FAQ)
from django.contrib import admin
from .models import *
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserChangeForm,CustomUserCreationForm
# Register your models here.
class myUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = AppUser
    list_display=('email','date_joined','last_login','is_admin','is_management')
    search_fields=('email',)
    readonly_fields=('date_joined','last_login')
    ordering=('email',)
    filter_horizontal=()
    list_filter=('email','is_staff','is_active','is_management',)
    fieldsets=(
        (None,{'fields':('email','password','is_management')}),
        ('Permission',{'fields':('is_staff','is_active')}),
    )
    add_fieldsets = (
        (None,{
            'classes':('wide',),
            'fields':('email','password1','password2','is_management','is_staff','is_active')
        }),
    )

admin.site.register(AppUser,myUserAdmin)
admin.site.register(StudentProfile)
admin.site.register(ManagementProfile)
admin.site.register(Application)
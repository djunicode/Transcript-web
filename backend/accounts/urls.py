
from django.urls import path,include
from .views import *

urlpatterns = [   
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/me/', UserInfoApi.as_view(),name='user_info'),
]
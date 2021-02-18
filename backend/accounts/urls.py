
from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

urlpatterns = [   
    path('auth/', include('djoser.urls.jwt')),
    path('auth/me/', UserInfoApi.as_view(),name='user_info'),
]

router = DefaultRouter()
router.register("auth/users", UserViewSet)

urlpatterns += router.urls
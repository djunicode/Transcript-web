from django.urls import path,include
from .views import *


urlpatterns = [
    path('studentdata/', StudentUpdateProfile.as_view(), name='studentprofile'),
    path('managementdata/', ManagementUpdateProfile.as_view(), name='managementprofile'),   
]
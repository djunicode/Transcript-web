from django.urls import path,include
from .views import *
from .views_management import ManagementApplication, AcceptedApplications

urlpatterns = [
    path('student/profile/', StudentUpdateProfile.as_view(), name='studentprofile'),
    path('management/profile/', ManagementUpdateProfile.as_view(), name='managementprofile'),
    #Management Dashboard:
    path('management/applications/', ManagementApplication.as_view()),  
    path('management/accepted/', AcceptedApplications.as_view()),

]
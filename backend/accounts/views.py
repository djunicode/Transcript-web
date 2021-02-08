from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
# Create your views here.
class UserInfoApi(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        user = request.user
        data = {
            'email': user.email,
            'is_management':user.is_management,
            'profile_created':user.profileCreated
        }
        return Response(data)
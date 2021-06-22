from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from .models import ManagementProfile, StudentProfile
from .serializers import ManagementProfileSerializer, StudentProfileSerializer
from djoser.views import UserViewSet
from djoser import signals
from djoser.compat import get_user_email
from djoser.conf import settings as DjoserSettings

# swagger
# from drf_yasg.utils import swagger_auto_schema
# from drf_yasg import openapi

# Create your views here.
class UserInfoApi(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        User Info

            ----------
            Sample Request

            Auth Header*

            -----------
            Sample Response

            {
                "email": "email@gmail.com",
                "is_management": false,
                "profile_created": true
            }
        """
        user = request.user
        data = {
            "email": user.email,
            "is_management": user.is_management,
            "profile_created": user.profileCreated,
        }
        return Response(data)


class UserViewSet(UserViewSet):
    # @swagger_auto_schema(method='post', request_body=openapi.Schema(
    # type=openapi.TYPE_OBJECT,
    # properties={
    #     'x': openapi.Schema(type=openapi.TYPE_STRING, description='string'),
    #     'y': openapi.Schema(type=openapi.TYPE_STRING, description='string'),
    # }))
    """
    Create User (/auth/users/)

        ----------
        Sample Request
        {
            "email": "email@gmail.com",
            "is_management": false,
            "password": "abcd@123",
            "profile": {
                "admission_year": "2017",
                "contact_no": "9839039821",
                "department": "EXTC",
                "name": "Jinay",
                "sap_id": "6900411346"
            },
            "re_password": "abcd@123"
        }
        ----------
        Sample Response(status 200 OK)
        {
            "is_management": false,
            "email": "email@gmail.com",
            "id": 11
        }
    """

    def perform_create(self, serializer):
        user = serializer.save()
        signals.user_registered.send(
            sender=self.__class__, user=user, request=self.request
        )
        if self.request.data.get("profile", False):
            self.request.data["profile"]["user"] = user.id
        if self.request.data.get("is_management", False):
            profile = ManagementProfileSerializer(
                data=self.request.data.get("profile", None)
            )
        else:
            profile = StudentProfileSerializer(
                data=self.request.data.get("profile", None)
            )
        if not profile.is_valid():
            user.delete()
            raise ValidationError(profile.errors)
        profile.save()
        # Calling super().perform_create(serializer) saves serializer again and messes up password

        # Send activation email -
        context = {"user": user}
        to = [get_user_email(user)]
        if DjoserSettings.SEND_ACTIVATION_EMAIL:
            DjoserSettings.EMAIL.activation(self.request, context).send(to)
        elif DjoserSettings.SEND_CONFIRMATION_EMAIL:
            DjoserSettings.EMAIL.confirmation(self.request, context).send(to)


class PermLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        """
        Login
            ----------
            Sample Request
            {
                "email":"email@gmail.com",
                "password":"abcd@123"
            }
            ----------
            Sample Response (status= 200 OK)
            {
                "token": "6d25849bc96b10d3e24fdf8ff995362a6a4fb649"
            }
        """
        user = authenticate(
            username=request.data["email"], password=request.data["password"]
        )
        if user is not None:
            return Response(
                {"token": Token.objects.get(user=user).key}, status=status.HTTP_200_OK
            )
        return Response({"token": None}, status=status.HTTP_200_OK)


"""
For Registration
auth/users/

{
    "email": "jinayself1@gmail.com",
    "is_management": false,
    "password": "abcd@123",
    "profile": {
        "admission_year": "2017",
        "contact_no": "9839039821",
        "department": "EXTC",
        "name": "Jinay",
        "sap_id": "6000419046"
    },
    "re_password": "abcd@123"
}

"""
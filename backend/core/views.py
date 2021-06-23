from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from accounts.serializers import (
    ManagementProfileSerializer,
    StudentProfileSerializer,
    UpdateManagementProfileSerializer,
    UpdateStudentProfileSerializer,
)
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

# student profile section
class StudentUpdateProfile(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        """
        Update student profile

            ----------
            Sample Request
            Authorization Header*
            {
                "name": "jinay",
                "contact_no": "123456789",
                "department": "IT",
                "admission_year": "2017"
            }

            ------------
            Sample Response (200 OK)
            {
                "email": "email@gmail.com",
                "profile": {
                    "user": 5,
                    "sap_id": "6909411346",
                    "name": "jinay",
                    "contact_no": "123456789",
                    "department": "IT",
                    "admission_year": "2017"
                }
            }
        """
        user = request.user
        users_data = StudentProfile.objects.get(user=user)
        user_serializer = UpdateStudentProfileSerializer(users_data, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(
                {
                    "email": user.email,
                    "profile": StudentProfileSerializer(users_data).data,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request):
        """
        User Student details

            ----------
            Sample Request
            Authorization Header*

            ----------
            Sample Response
            {
                "email": {
                    "email": "email@gmail.com"
                },
                "profile": {
                    "user": 5,
                    "sap_id": "6909411346",
                    "name": "Jinay",
                    "contact_no": "9839039821",
                    "department": "EXTC",
                    "admission_year": "2017"
                }
            }
        """
        user = request.user
        # objects
        users_data = StudentProfile.objects.get(user=user)
        user_email_obj = users_data.user
        user_serializer = UserSerializer(user_email_obj)
        user_profile_serializer = StudentProfileSerializer(users_data)
        return Response(
            {"email": user_serializer.data, "profile": user_profile_serializer.data},
            status=status.HTTP_200_OK,
        )


class ManagementUpdateProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Management Profile

            ----------
            Sample Request
            Authorization header*

            ----------
            Sample Response (200 OK)
            {
                "email": {
                    "email": "staff@mail.com"
                },
                "profile": {
                    "user": 6,
                    "staff_id": "6909411346",
                    "name": "Jinay",
                    "contact_no": "9839039821",
                    "accepted": 0,
                    "rejected": 0
                }
            }
        """
        user = request.user
        # objects
        users_data = ManagementProfile.objects.get(user=user)
        user_email_obj = users_data.user
        user_serializer = UserSerializer(user_email_obj)
        user_profile_serializer = ManagementProfileSerializer(users_data)
        return Response(
            {"email": user_serializer.data, "profile": user_profile_serializer.data},
            status=status.HTTP_200_OK,
        )

    def put(self, request):
        """
        Update Managment Profile

            ----------
            Sample Request
            Authorization Header*

            {
                "name": "changed_name",
                "contact_no": "999999"
            }
            ----------

            Sample Response (Status= 200 OK)

            {
                "email": "staff@mail.com",
                "profile": {
                    "user": 6,
                    "staff_id": "6909411346",
                    "name": "changed_name",
                    "contact_no": "999999",
                    "accepted": 0,
                    "rejected": 0
                }
            }
        """
        user = request.user
        users_data = ManagementProfile.objects.get(user=user)
        user_serializer = UpdateManagementProfileSerializer(
            users_data, data=request.data
        )
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(
                {
                    "email": user.email,
                    "profile": ManagementProfileSerializer(users_data).data,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

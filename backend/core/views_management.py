from django.shortcuts import render
from django.db.models import Q
from django.utils import timezone
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from datetime import timedelta
from .serializers import ApplicationSerializer, AcceptedSerializer
from .models import Application

class ManagementApplication(APIView):
    permisison_classes = [IsAuthenticated]
    def get(self, request):
        '''
        Get next application to review from queue
        '''
        if not request.user.is_management:
            return Response(status=status.HTTP_403_FORBIDDEN)
        last_hour = timezone.now() - timedelta(hours=1) #Tested properly with seconds=10
        query = Q(in_review=None) | Q(in_review=True, review_time__lt=last_hour)
        obj = Application.objects.filter(query).order_by('created_at').first()
        if obj is None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        obj.in_review = True
        obj.review_time = timezone.now()
        obj.save()
        ser = ApplicationSerializer(obj)
        return Response(ser.data, status=status.HTTP_200_OK)
    def get_object(self, pk):
        try:
            return Application.objects.get(pk=pk)
        except:
            raise Http404
    def put(self, request):
        '''
        Update existing application - accept or reject with comment
        '''
        if not request.user.is_management:
            return Response(status=status.HTTP_403_FORBIDDEN)
        application = self.get_object(request.data.get('pk', None))
        request.data['in_review'] = False
        request.data['faculty'] = request.user.managementprofile.staff_id
        serializer = ApplicationSerializer(application, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class AcceptedApplications(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        '''
        Get list of accepted applications to verify
        '''
        if not request.user.is_management:
            return Response(status=status.HTTP_403_FORBIDDEN)
        qs = Application.objects.filter(accepted=True)
        ser = AcceptedSerializer(qs, many=True)
        return Response(ser.data, status=status.HTTP_200_OK)

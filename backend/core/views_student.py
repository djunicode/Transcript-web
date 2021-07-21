from accounts.models import *
from .models import *
from rest_framework.views import APIView
from rest_framework.status import *
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import (
    FormParser,
    MultiPartParser,
    JSONParser,
    FileUploadParser,
)
from .serializers import *
import tabula
import json
from .ocr import getresult
import os
from .serializers import ApplicationSerializer


class ApplicationDetail(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        if not request.user.is_management:
            student = StudentProfile.objects.get(user=request.user)
            app = Application.objects.filter(pk=pk, student=student)
        else:
            app = Application.objects.filter(pk=pk)
        if app.exists():
            ser = ApplicationSerializer(app.first())
            return Response(ser.data, status=HTTP_200_OK)
        else:
            return Response(
                {"message": "No matching application found"}, status=HTTP_404_NOT_FOUND
            ) 
class StudentApplication(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.is_management == False:
            if StudentProfile.objects.all().filter(user=user).exists():
                student = StudentProfile.objects.get(user=user)
                if Application.objects.all().filter(student=student).exists():
                    Old_application = Application.objects.all().filter(student=student)
                    d = {"application": []}
                    for app in Old_application:
                        data = {}
                        if app.in_review == False:
                            data = {
                                "id": app.id,
                                "Student Name": student.name,
                                "Faculty": app.faculty.name,
                                "created_at": app.created_at,
                                "review_time": app.review_time,
                                "comment": app.comment,
                                "accepted": app.accepted,
                            }
                        else:
                            data = {
                                "id": app.id,
                                "Student Name": student.name,
                                "created_at": app.created_at,
                            }
                        d["application"].append(data)
                    return Response({"application": d}, status=HTTP_200_OK)
                else:
                    return Response(
                        {"message": "Applications Not Created"},
                        status=HTTP_404_NOT_FOUND,
                    )
            else:
                return Response(
                    {"message": "Profile not created"}, status=HTTP_400_BAD_REQUEST
                )
        else:
            return Response(
                {"message": "You are not a student"}, status=HTTP_400_BAD_REQUEST
            )

    def post(self, request):
        user = request.user
        if user.is_management == False:
            if StudentProfile.objects.all().filter(user=user).exists():
                new_application = None
                student = StudentProfile.objects.get(user=user)
                if Application.objects.all().filter(student=student).exists():
                    old_application = Application.objects.all().filter(student=student)
                    last = len(old_application) - 1
                    application = old_application[last]
                    if application.in_review == False:
                        new_application = Application.objects.create(student=student, marks_copy=student.marksheet)

                    else:
                        return Response(
                            {
                                "message": "Your Apllication is in Queue . You can't create 2 applications at time "
                            },
                            status=HTTP_208_ALREADY_REPORTED,
                        )
                else:
                    new_application = Application.objects.create(student=student, marks_copy=student.marksheet)
                data = {
                    "Student Name": student.name,
                    "created_at": new_application.created_at,
                }
                return Response(
                    {"message": "Application created", "Application": data},
                    status=HTTP_201_CREATED,
                )
            else:
                return Response(
                    {"message": "Profile not created"}, status=HTTP_400_BAD_REQUEST
                )
        else:
            return Response(
                {"message": "You are not a student"}, status=HTTP_400_BAD_REQUEST
            )


class EnterMarks(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]
    serializer_class = EnterResultSerializer

    def post(self, request):
        user = request.user
        if StudentProfile.objects.all().filter(user=user).exists():
            student = StudentProfile.objects.get(user=user)
            old_marksheet = student.marksheet
            new_marksheet = {}
            serializer = self.serializer_class(data=request.data)
            sem_no = str(request.data.get("sem", None))
            if serializer.is_valid():
                marks = serializer.data.get("marksheet")
                if len(old_marksheet) > 0:
                    if len(old_marksheet) == 8 and sem_no not in old_marksheet.keys():
                        #Update after 8 sems is also possible
                        return Response(
                            {"message": "Marksheet Must contain atmost 8 semester"},
                            status=HTTP_400_BAD_REQUEST,
                        )
                    new_marksheet = old_marksheet.copy()  
                    new_marksheet[sem_no] = marks
                    new_marksheet = sort_dict(new_marksheet)
                else:
                    new_marksheet[sem_no] = marks
                student.marksheet = new_marksheet
                student.save()
                return Response({"result": new_marksheet}, status=HTTP_200_OK)
            else:
                return Response(
                    {"message": serializer.error_messages}, status=HTTP_400_BAD_REQUEST
                )
        else:
            return Response(
                {"message": "Profile not created"}, status=HTTP_400_BAD_REQUEST
            )

    def get(self, request):
        user = request.user
        if StudentProfile.objects.all().filter(user=user).exists():
            student = StudentProfile.objects.get(user=user)
            old_marksheet = student.marksheet
            return Response(old_marksheet, status=HTTP_200_OK)
        else:
            return Response(
                {"message": "Profile not created"}, status=HTTP_400_BAD_REQUEST
            )


class ScanMarksheet(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UploadMarksheetSerializer
    parser_classes = [MultiPartParser, JSONParser]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                user_obj = StudentProfile.objects.get(user=request.user)
            except StudentProfile.DoesNotExist:
                return Response(
                    {"error": "No such student profile exists"},
                    status=HTTP_404_NOT_FOUND,
                )
            result_data, file = getresult(
                serializer.data(), marksheet=user_obj.marksheet
            )
            print(result_data)
            os.remove(file)
            # if result_data == "wrong file":
            #     return Response(
            #         {"error": "Please upload a valid marksheet"},
            #         status=HTTP_400_BAD_REQUEST,
            #     )
            user_obj.marksheet = result_data
            user_obj.save()
            return Response(result_data, status=HTTP_202_ACCEPTED)
        else:
            return Response({"message": "File Missing"}, status=HTTP_406_NOT_ACCEPTABLE)


class MarksheetStatus(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = StudentProfile.objects.get(user=request.user)
        except StudentProfile.DoesNotExist:
            return Response(
                {"error": "No such student exists"}, status=HTTP_404_NOT_FOUND
            )
        keys = user.marksheet.keys()
        return Response({"marksheets": keys}, status=HTTP_200_OK)


def sort_dict(dic):
    s_dic = sorted(dic.items(), key=lambda x: x[0].lower())
    new_dic = {}
    for item in s_dic:
        new_dic[item[0]] = item[1]
    return new_dic
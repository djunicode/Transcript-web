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
import os


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
                                "Student Name": student.name,
                                "Faculty": app.faculty.name,
                                "created_at": app.created_at,
                                "review_time": app.review_time,
                                "comment": app.comment,
                                "accepted": app.accepted,
                            }
                        else:
                            data = {
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
                        new_application = Application.objects.create(student=student)

                    else:
                        return Response(
                            {
                                "message": "Your Apllication is in Queue . You can't create 2 applications at time "
                            },
                            status=HTTP_208_ALREADY_REPORTED,
                        )
                else:
                    new_application = Application.objects.create(student=student)
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
            if serializer.is_valid():
                marks = serializer.data.get("marksheet")

                if len(old_marksheet) > 0:
                    if len(old_marksheet) == 8:
                        return Response(
                            {"message": "Marksheet Must contain atmost 8 semester"},
                            status=HTTP_400_BAD_REQUEST,
                        )
                    new_marksheet = old_marksheet.copy()
                    sem_no = str(marks["sem"])
                    new_marksheet[sem_no] = marks
                    new_marksheet = sort_dict(new_marksheet)
                else:
                    sem_no = marks["sem"]
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
            print(serializer.data())
            result_data, file = fetchResult(serializer.data())
            os.remove(file)
            return Response(result_data, status=HTTP_202_ACCEPTED)
        else:
            return Response({"message": "File Missing"}, status=HTTP_406_NOT_ACCEPTABLE)


def sort_dict(dic):
    s_dic = sorted(dic.items(), key=lambda x: x[0].lower())
    new_dic = {}
    for item in s_dic:
        new_dic[item[0]] = item[1]
    return new_dic


def fetchResult(data):
    file = data["file"]
    sem = data["sem"]
    json_file = "Images/marks/" + str(file) + ".json"
    new = tabula.io.convert_into(file, json_file, output_format="json")
    f = open(json_file)
    data_obj = json.load(f)
    new_lis = data_obj[0]["data"][2:]
    final_keys = [
        "0 cc",
        "1 subj",
        "10 grade",
        "11 credits",
        "12 grade points",
        "13 credits*grade",
    ]
    dele = [14, 9, 8, 7, 6, 5, 4, 3, 2]
    for i in new_lis:
        for j in dele:
            i.pop(j)
        for j, k in zip(i, final_keys):
            j.pop("top")
            j.pop("left")
            j.pop("width")
            j.pop("height")
            j[k] = j.pop("text")

    semester = {}
    semester[sem] = new_lis[:-1]
    return semester, json_file
    # new


"""
Json formate
result_Json ={
    sem_number:{
            "sem":"",
            "credits_earned":"",
            "cgpa":"",
            "courses":[
                {
                    "couse_code":"",
                    "course_name":"",
                    "marks":"",
                    "pointer":"",
                    "credits_earned":"",
                    "grade":"",
                }
            ]

        },
        ...
}
"""
"""
{
    "1": [
        [
            {
                "0 cc": "DJ19FEC101"
            },
            {
                "1 subj": "Engineering Mathematics- I"
            },
            {
                "10 grade": "O"
            },
            {
                "11 credits": "4"
            },
            {
                "12 grade points": "10"
            },
            {
                "13 credits*grade": "40"
            }
        ],
        [
            {
                "0 cc": "DJ19FET101"
            },
            {
                "1 subj": "Engineering Mathematics- I Tutorial"
            },
            {
                "10 grade": "O"
            },
            {
                "11 credits": "1"
            },
            {
                "12 grade points": "10"
            },
            {
                "13 credits*grade": "10"
            }
        ],
        [
            {
                "0 cc": "DJ19FEC102"
            },
            {
                "1 subj": "Engineering Physics- I"
            },
            {
                "10 grade": "A+"
            },
            {
                "11 credits": "2"
            },
            {
                "12 grade points": "9"
            },
            {
                "13 credits*grade": "18"
            }
        ],
        [
            {
                "0 cc": "DJ19FEL102"
            },
            {
                "1 subj": "Engineering Physics- I Laboratory & Tutorial"
            },
            {
                "10 grade": "O"
            },
            {
                "11 credits": "1.5"
            },
            {
                "12 grade points": "10"
            },
            {
                "13 credits*grade": "15"
            }
        ],
        [
            {
                "0 cc": "DJ19FEC103"
            },
            {
                "1 subj": "Engineering Chemistry- I"
            },
            {
                "10 grade": "A+"
            },
            {
                "11 credits": "2"
            },
            {
                "12 grade points": "9"
            },
            {
                "13 credits*grade": "18"
            }
        ],
        [
            {
                "0 cc": "DJ19FEL103"
            },
            {
                "1 subj": "Engineering Chemistry- I Laboratory & Tutorial"
            },
            {
                "10 grade": "A+"
            },
            {
                "11 credits": "1.5"
            },
            {
                "12 grade points": "9"
            },
            {
                "13 credits*grade": "13.5"
            }
        ],
        [
            {
                "0 cc": "DJ19FEC104"
            },
            {
                "1 subj": "Engineering Mechanics"
            },
            {
                "10 grade": "A"
            },
            {
                "11 credits": "3"
            },
            {
                "12 grade points": "8"
            },
            {
                "13 credits*grade": "24"
            }
        ],
        [
            {
                "0 cc": "DJ19FEL104"
            },
            {
                "1 subj": "Engineering Mechanics Laboratory"
            },
            {
                "10 grade": "A+"
            },
            {
                "11 credits": "1"
            },
            {
                "12 grade points": "9"
            },
            {
                "13 credits*grade": "9"
            }
        ],
        [
            {
                "0 cc": "DJ19FEC105"
            },
            {
                "1 subj": "Basic Electrical & Electronics Engineering"
            },
            {
                "10 grade": "A+"
            },
            {
                "11 credits": "3"
            },
            {
                "12 grade points": "9"
            },
            {
                "13 credits*grade": "27"
            }
        ],
        [
            {
                "0 cc": "DJ19FEL105"
            },
            {
                "1 subj": "Basic Electrical & Electronics Engineering\rLaboratory"
            },
            {
                "10 grade": "A+"
            },
            {
                "11 credits": "1"
            },
            {
                "12 grade points": "9"
            },
            {
                "13 credits*grade": "9"
            }
        ],
        [
            {
                "0 cc": "Total"
            },
            {
                "1 subj": ""
            },
            {
                "10 grade": "20"
            },
            {
                "11 credits": ""
            },
            {
                "12 grade points": "183.5"
            },
            {
                "13 credits*grade": ""
            }
        ],
        [
            {
                "0 cc": "Remark : SuccessfulCredits Earned :20SGPA :9.18"
            },
            {
                "1 subj": ""
            },
            {
                "10 grade": ""
            },
            {
                "11 credits": ""
            },
            {
                "12 grade points": ""
            },
            {
                "13 credits*grade": ""
            }
        ]
    ]
}

"""

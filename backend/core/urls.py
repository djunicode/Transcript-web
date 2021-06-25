from django.urls import path, include
from .views import *
from .views_student import *
from .views_management import ManagementApplication, AcceptedApplications

urlpatterns = [
    path("student/profile/", StudentUpdateProfile.as_view(), name="studentprofile"),
    path(
        "management/profile/",
        ManagementUpdateProfile.as_view(),
        name="managementprofile",
    ),
    # Management Dashboard:
    path("management/applications/", ManagementApplication.as_view()),
    path("management/accepted/", AcceptedApplications.as_view()),
    # Student Dashboard :
    path("student/applications/", StudentApplication.as_view()),
    path("student/scan_marksheet/", ScanMarksheet.as_view(), name="scan_marksheer"),
    path("student/marks/", EnterMarks.as_view(), name="Enter marks"),
    path("marksheet/status/", MarksheetStatus.as_view(), name="marksheet_status"),
]
from rest_framework import serializers
from accounts.models import StudentProfile, ManagementProfile, AppUser
from .models import Application, Marksheet

# delete this serializer if everthing works fine
# class UpdateStudentProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = StudentProfile
#         fields = ('sap_id', "name", "contact_no", "department", 'admission_year')

# class UpdateManagementProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ManagementProfile
#         fields= ('staff_id', 'name','contact_no')

# donot delete this serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ("email",)


class ApplicationSerializer(serializers.ModelSerializer):
    marksheet = serializers.SerializerMethodField("get_marks")

    def get_marks(self, obj):
        return obj.student.marksheet

    class Meta:
        model = Application
        fields = (
            "id",
            "student",
            "faculty",
            "in_review",
            "created_at",
            "accepted",
            "comment",
            "marksheet",
        )


class AcceptedSerializer(serializers.ModelSerializer):
    """
    Since we are sending a list of many accepted applications, there may potentially be
    redundant data sent over network if we use ApplicationSerializer for it
    """

    class Meta:
        model = Application
        fields = ("id", "student", "faculty")


class EnterResultSerializer(serializers.Serializer):
    marksheet = serializers.JSONField()


class UploadMarksheetSerializer(serializers.Serializer):
    file = serializers.FileField()
    semester = serializers.CharField()

    def data(self):
        return {
            "file": self._validated_data["file"],
            "sem": self._validated_data["semester"],
        }

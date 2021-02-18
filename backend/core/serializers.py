from rest_framework import serializers
from accounts.models import StudentProfile, ManagementProfile, AppUser

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
        fields = ('email',)

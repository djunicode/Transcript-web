from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import jsonfield


# Create your models here.
#                    User Starts                    #
class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if email is None:
            raise TypeError("Email is required")
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if password is None:
            raise TypeError('Password should not be none')
        user = self.create_user(email, password)
        user.is_active = True
        user.is_superuser = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class AppUser(AbstractBaseUser):
    email = models.EmailField()  # check if @djsce.in for faculty
    is_management = models.BooleanField(default=False)  # boolean fields
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = AppUserManager()

    def __str__(self):
        return self.email


class StudentProfile(models.Model):
    departments = (
        ('CS', 'COMPUTERS'),
        ('IT', 'INFORMATION TECHNOLOGY'),
        ('EXTC', 'ELECTRONICS AND TELECOMMUNICATION'),
        ('ELEX', 'ELECTRONICS'),
        ('MECH', 'MECHANICAL'),
        ('CHEM', 'CHEMICAL'),
        ('BIOMED', 'BIOMED'),
        ('PROD', 'PRODUCTION'),
        ('OTHERS', 'OTHERS'),
    )
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE)
    # other details
    sap_id = models.CharField(max_lenght=15, primary_key=True)
    name = models.CharField(max_length=100)
    contact_no = models.CharField(max_length=13)
    department = models.CharField(max_length=40, choices=departments)
    # can also take date as the input (change it to datefield)
    admission_year = models.CharField(max_lenght=5)
    marksheet = jsonfield.JSONField()

    def __str__(self):
        return self.name


class ManagementProfile(models.Model):
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE)
    staff_id = models.CharField(primary_key=True)
    name = models.CharField(max_length=100)
    contact_no = models.CharField(max_length=13)
    accepted = models.IntegerField(default=0)
    rejected = models.IntegerField(default=0)

    def __str__(self):
        return self.name


#                USER ENDED               #

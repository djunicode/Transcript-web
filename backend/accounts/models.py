from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import jsonfield


# Create your models here.
#                    User Starts                    #
class AppUserManager(BaseUserManager):
    def create_user(self, email,is_management, password=None, **extra_fields):
        if email is None:
            raise TypeError("Email is required")
        user = self.model(
            email=self.normalize_email(email),
            is_management=is_management,
        )
                            
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email,is_management, password=None, **extra_fields):
        if password is None:
            raise TypeError('Password should not be none')
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            is_management=is_management,
        )
        user.is_active = True
        user.is_superuser = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class AppUser(AbstractBaseUser):
    email          = models.EmailField(verbose_name="email",max_length=255,unique=True)
    date_joined    = models.DateTimeField(verbose_name="date join",auto_now_add=True)
    last_login     = models.DateTimeField(verbose_name="last login",auto_now=True)
    is_admin       = models.BooleanField(default=False) 
    is_active      = models.BooleanField(default=True) 
    is_staff       = models.BooleanField(default=False) 
    is_superuser   = models.BooleanField(default=False)
    is_management  = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = AppUserManager()
    REQUIRED_FIELDS  = ['is_management']

    @property
    def profileCreated(self):
        user = self
        if user.is_management :
            return ManagementProfile.objects.filter(user=user).exists()
        else :
            return StudentProfile.objects.filter(user=user).exists()
    def __str__(self):
        return self.email

    def has_perm(self,perm,obj=None):
        return self.is_admin

    def has_module_perms(self,app_label):
        return True


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
    sap_id = models.CharField(max_length=15, primary_key=True)
    name = models.CharField(max_length=100)
    contact_no = models.CharField(max_length=13)
    department = models.CharField(max_length=40, choices=departments)
    # can also take date as the input (change it to datefield)
    admission_year = models.CharField(max_length=5)
    marksheet = jsonfield.JSONField()

    def __str__(self):
        return self.name


class ManagementProfile(models.Model):
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE)
    staff_id = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=100)
    contact_no = models.CharField(max_length=13)
    accepted = models.IntegerField(default=0)
    rejected = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Application(models.Model):
    Status = (
        ('In Queue', 'In Queue'),
        ('In Review', 'In Review'),
        ('Rejected', 'Rejected'),
        ('Accepted', 'Accepted'),
    )
    student = models.ForeignKey(StudentProfile,on_delete=models.CASCADE)
    faculty = models.ForeignKey(ManagementProfile,on_delete=models.CASCADE,null=True,blank=True)
    application_number = models.AutoField(primary_key=True)
    date_of_application = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=40, choices=Status)
    comment = models.TextField(null=True,blank=True)
    in_review = models.BooleanField(default=False)
    application_file = models.FileField()
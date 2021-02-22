from django.db import models
from django.db.models.signals import post_save

from accounts.models import StudentProfile, ManagementProfile

class Application(models.Model):
    #ID will be application number
    student = models.ForeignKey(StudentProfile, null=True, blank=True, on_delete=models.SET_NULL, default=None)         #Student applies
    faculty = models.ForeignKey(ManagementProfile,null=True, blank=True, on_delete=models.SET_NULL, default=None)   #Faculty checks
    created_at = models.DateTimeField(auto_now_add=True)
    review_time = models.DateTimeField(null=True, blank=True, default=None)     #To track when something went in review
    comment = models.TextField(blank=True, null=True)
    in_review = models.BooleanField(null=True, default=None)
    accepted = models.BooleanField(default=False)
    
    # in_review None => Created but hasn't been sent for review
    # in_review True => Sent for (and in) review
    # in_review False => Finished Reviewing

def save_application(instance, created, **kwargs):
    if (not created) and (instance.in_review is False): #instance.in_review is None has a different meaning so can't use not instance.in_review
        if instance.accepted:
            instance.faculty.accepted+=1
        else:
            instance.faculty.rejected+=1
        instance.faculty.save()
post_save.connect(save_application, sender=Application)
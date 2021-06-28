from django.db import models
from accounts.models import StudentProfile, ManagementProfile

from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
import jsonfield


class Marksheet(models.Model):
    file = models.FileField(upload_to="marks")
    semester = models.SmallIntegerField()


@receiver(post_delete, sender=Marksheet)
def submission_delete(sender, instance, **kwargs):
    instance.file.delete(False)


class Application(models.Model):
    # ID will be application number
    student = models.ForeignKey(
        StudentProfile, null=True, blank=True, on_delete=models.SET_NULL, default=None
    )  # Student applies
    faculty = models.ForeignKey(
        ManagementProfile,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        default=None,
    )  # Faculty checks
    created_at = models.DateTimeField(auto_now_add=True)
    # To track when something went in review
    review_time = models.DateTimeField(null=True, blank=True, default=None)
    comment = models.TextField(blank=True, null=True)
    in_review = models.BooleanField(null=True, default=None)
    accepted = models.BooleanField(default=False)
    marks_copy = models.JSONField()
    # in_review None => Created but hasn't been sent for review
    # in_review True => Sent for (and in) review
    # in_review False => Finished Reviewing


def save_application(instance, created, **kwargs):
    # instance.in_review is None has a different meaning so can't use not instance.in_review
    if (not created) and (instance.in_review is False):
        if instance.accepted:
            instance.faculty.accepted += 1
        else:
            instance.faculty.rejected += 1
        instance.faculty.save()


post_save.connect(save_application, sender=Application)

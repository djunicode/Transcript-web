from django.db import models
 
from django.db.models.signals import post_delete
from django.dispatch import receiver
 

# Create your models here.
class Marksheet(models.Model):
    file = models.ImageField( upload_to='images' ,null=True,blank=True)
    



@receiver(post_delete, sender=Marksheet)
def submission_delete(sender, instance, **kwargs):
    instance.file.delete(False) 
from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
   phone = models.CharField(max_length=100, blank=True, null=True)
   confirmed= models.BooleanField(default=False)
  


class OTP(models.Model):
   user = models.ForeignKey("User",on_delete=models.DO_NOTHING,related_name="otp")
   code = models.CharField(max_length=20)

   def serialize(self):
        return {
                "user": self.user,
                "code": self.code,
        }


class Candidate(models.Model):
   name = models.CharField(max_length=100)
   position = models.CharField(max_length=100)
   picture =  models.ImageField(null=True,blank=True,upload_to="images/candidates/")
   # image = models.URLField(blank=True, verbose_name="Image URL", null=True)

   votes = models.ManyToManyField("User",related_name="candidates",blank=True,null=True)

   def serialize(self):
        return {

            "id":self.id,
            "name": self.name,
            "position": self.position,
            "picture":self.picture.url,
            "votes": [voter.username for voter in self.votes.all()],
        }

class Unregistered(models.Model):
        user = models.ForeignKey("User", on_delete=models.CASCADE,related_name="unregistered",unique=True)
        code = models.PositiveIntegerField()
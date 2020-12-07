import uuid
from django.db import models

# Create your models here.
class Answers(models.Model):
    rid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uuid = models.UUIDField()
    question = models.TextField()
    answer = models.TextField()
    datetime = models.DateTimeField(auto_now=True)

class ChoiceImages(models.Model):
    rid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uuid = models.UUIDField()
    puid = models.UUIDField()

class UploadedImages(models.Model):
    rid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uuid = models.UUIDField()
    puid = models.UUIDField()
    image = models.FileField(default=None)
    datetime = models.DateTimeField(auto_now=True)

class EmotionLog(models.Model):
    rid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uuid = models.UUIDField()
    emotion = models.TextField()
    datetime = models.DateTimeField(auto_now=True)
    
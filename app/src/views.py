import json
import uuid
from django.shortcuts import render
from django.http import JsonResponse
from django.core.serializers import serialize
from django.core.files.storage import FileSystemStorage
from src.models import Answers, ChoiceImages, UploadedImages, EmotionLog

# Create your views here.

def index(request):
    return render(request, 'index.html')

def analysis(request):
    return render(request, 'analysis.html')

def answers(request):
    data = {
        'result': 'success',
        'details': ''
    }

    if request.method == 'POST':
        jsonBody = json.loads(request.body.decode('utf-8'))
        try:
            Answers.objects.create(
                uuid = jsonBody['uuid'],
                question = jsonBody['question'],
                answer = jsonBody['answer']
            )
        except Exception as ex:
            data['result'] = 'error'
            data['details'] = str(ex)
    elif request.method == 'GET':
        data['details'] = serialize('json', Answers.objects.all())
    
    return JsonResponse(data)

def emotionLog(request):
    data = {
        'result': 'success',
        'details': ''
    }

    if request.method == 'POST':
        jsonBody = json.loads(request.body.decode('utf-8'))
        try:
            EmotionLog.objects.create(
                uuid = jsonBody['uuid'],
                emotion = jsonBody['emotion'],
            )
        except Exception as ex:
            data['result'] = 'error'
            data['details'] = str(ex)
    elif request.method == 'GET':
        data['details'] = serialize('json', EmotionLog.objects.order_by('datetime'))
    
    return JsonResponse(data)

def uploadImage(request):
    data = {
        'result': 'success',
        'details': ''
    }

    if request.method == 'POST':
        userID = request.POST['userID']
        image_file = request.FILES['image']
        postID = uuid.uuid4()
        try:
            upload = UploadedImages(
                uuid=userID,
                image=image_file,
                puid=postID
            )
            image_name = upload.image.name
            upload.image.name = str(uuid.uuid4()) + image_name
            upload.save()
        except Exception as ex:
            data['result'] = 'error'
            data['details'] = str(ex)
    elif request.method == 'GET':
        data['details'] = serialize('json', UploadedImages.objects.all())

    return JsonResponse(data)

def databaseCount(request):
    data = {
        'result': 'success',
        'details': {
            'emojis': EmotionLog.objects.count(),
            'answers': Answers.objects.count(),
            'photos': UploadedImages.objects.count()
        }
    }

    return JsonResponse(data)

from django.urls import path

from . import views

# Page urls

urlpatterns = [
    path('', views.index, name='main'),
    path('analysis', views.analysis, name='analysis'),
    path('api/answers', views.answers, name='answers'),
    path('api/emotionLog', views.emotionLog, name='emotionLog'),
    path('api/uploadImage', views.uploadImage, name='uploadImage'),
    path('api/databaseCount', views.databaseCount, name='databaseCount')
]
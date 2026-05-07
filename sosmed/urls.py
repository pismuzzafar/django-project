from django.urls import path
from . import views

app_name = 'sosmed'

urlpatterns = [
    path('create/', views.create, name='create'),
    path('', views.list, name='list'),
]
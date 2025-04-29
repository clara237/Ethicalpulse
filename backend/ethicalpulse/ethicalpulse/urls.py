from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to EthicalPulse API", status=200)

urlpatterns = [
    path('', home),  # Ajoute une route racine
    path('clararoot/', admin.site.urls),
    path('api/', include('api.urls')),
]
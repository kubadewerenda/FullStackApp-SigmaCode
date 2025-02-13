from django.shortcuts import render
from django.http import HttpResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters, status
from .models import Advertisement
from .serializers import AdvertisementSerializer
from .filters import AdvertisementFilter
from rest_framework.response import Response
from rest_framework.views import exception_handler
# Create your views here.
def test_view(request):
    return HttpResponse("Działa!")

def home_view(request):
    return HttpResponse("<h1>Witaj w AdBoard API!</h1><p>Przejdź do <a href='/api/advertisements/'>listy ogłoszeń</a>.</p>")

class AdvertisementViewSet(viewsets.ModelViewSet):
    serializer_class = AdvertisementSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]  

    filterset_class = AdvertisementFilter
    search_fields = ['title', 'content', 'author']
    ordering_fields = ['date_added']
    ordering = ['-date_added'] 

    def get_queryset(self):
        queryset = Advertisement.objects.all()
        ordering = self.request.query_params.get("ordering", "-date_added")

        if ordering in ["date_added", "-date_added"]:
            queryset = queryset.order_by(ordering)
        
        return queryset

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    
    if response is not None:
        error_messages = []
        if isinstance(response.data, dict):
            for field, errors in response.data.items():
                if isinstance(errors, list):
                    error_messages.extend(errors)

        response.data['error_message'] = error_messages[0] if error_messages else "Wystąpił bład."
    
    return response
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdvertisementViewSet

# Router generuje endpointy API
router = DefaultRouter()
router.register(r'advertisements', AdvertisementViewSet, basename='advertisement')

urlpatterns = [
    path('', include(router.urls)),
    path('test/', views.test_view, name='test_view'),
]


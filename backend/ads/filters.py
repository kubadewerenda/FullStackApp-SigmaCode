import django_filters
from .models import Advertisement

class AdvertisementFilter(django_filters.FilterSet):

    class Meta:
        model = Advertisement
        fields = ['category', 'status']

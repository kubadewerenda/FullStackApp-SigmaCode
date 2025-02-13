from rest_framework import serializers
from .models import Advertisement

class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = '__all__'

    def validate_title(self, value):
        if len(value) < 5:
            raise serializers.ValidationError("Tytuł ogłoszenia przynajmniej 5 znaków!")
        return value
    
    def validate_content(self, value):
        if len(value) < 10:
            raise serializers.ValidationError("Treść ogłoszenia przynajmniej 10 znaków!")
        return value
    
    def validate(self, data):
        if data.get('status') == 'active':
            active_ads_c = Advertisement.objects.filter(author=data.get('author'), status='active').count()
            if active_ads_c >= 5:
                raise serializers.ValidationError("Możesz mieć maksymalnie 5 aktywnych ogłoszeń!")
        return data
from rest_framework import serializers
from .models import Flower

class FlowerSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Flower
        fields = ['id', 'name', 'description', 'price', 'image', 'image_url', 'is_available', 'created_at']
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None

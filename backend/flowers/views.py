from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from .models import Flower
from .serializers import FlowerSerializer

class FlowerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Flower.objects.filter(is_available=True)
    serializer_class = FlowerSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']
    ordering = ['-created_at']

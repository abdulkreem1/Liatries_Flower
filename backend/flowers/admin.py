from django.contrib import admin
from django.utils.html import format_html
from .models import Flower

@admin.register(Flower)
class FlowerAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'is_available', 'image_preview', 'created_at']
    list_filter = ['is_available', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['is_available']
    readonly_fields = ['image_preview', 'created_at', 'updated_at']
    
    fieldsets = (
        ('معلومات الوردة', {
            'fields': ('name', 'description', 'price', 'is_available')
        }),
        ('الصورة', {
            'fields': ('image', 'image_preview')
        }),
        ('معلومات إضافية', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 200px; max-width: 200px; border-radius: 8px;" />',
                obj.image.url
            )
        return "لا توجد صورة"
    
    image_preview.short_description = "معاينة الصورة"

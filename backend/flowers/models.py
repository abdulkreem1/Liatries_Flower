from django.db import models
from django.core.validators import MinValueValidator

class Flower(models.Model):
    name = models.CharField(max_length=200, verbose_name="اسم الوردة")
    description = models.TextField(blank=True, verbose_name="الوصف")
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(0)],
        verbose_name="السعر"
    )
    image = models.ImageField(upload_to='flowers/', verbose_name="صورة الوردة")
    is_available = models.BooleanField(default=True, verbose_name="متوفر")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الإضافة")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="تاريخ التحديث")

    class Meta:
        verbose_name = "وردة"
        verbose_name_plural = "الورود"
        ordering = ['-created_at']

    def __str__(self):
        return self.name

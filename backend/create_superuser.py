#!/usr/bin/env python
"""
سكريبت لإنشاء superuser تلقائياً
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'liatries.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# معلومات Superuser (غيرها حسب رغبتك)
username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@gmail.com')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'admin12345678')

# تحقق إذا المستخدم موجود
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(
        username=username,
        email=email,
        password=password
    )
    print(f'✅ Superuser "{username}" created successfully!')
    print(f'   Email: {email}')
    print(f'   Password: {password}')
else:
    print(f'⚠️  Superuser "{username}" already exists.')

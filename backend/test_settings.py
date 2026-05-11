#!/usr/bin/env python
"""
سكريبت لاختبار إعدادات Django قبل النشر
"""
import os
import sys
from pathlib import Path

# إضافة المسار
sys.path.insert(0, str(Path(__file__).resolve().parent))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'liatries.settings')

import django
django.setup()

from django.conf import settings
from django.core.management import call_command

def test_settings():
    """اختبار الإعدادات الأساسية"""
    print("🔍 اختبار إعدادات Django...\n")
    
    # 1. DEBUG
    print(f"✓ DEBUG: {settings.DEBUG}")
    if settings.DEBUG:
        print("  ⚠️  تحذير: DEBUG=True (يجب أن يكون False في الإنتاج)")
    
    # 2. SECRET_KEY
    print(f"✓ SECRET_KEY: {'*' * 20} (مخفي)")
    if 'insecure' in settings.SECRET_KEY:
        print("  ⚠️  تحذير: استخدم SECRET_KEY آمن في الإنتاج")
    
    # 3. ALLOWED_HOSTS
    print(f"✓ ALLOWED_HOSTS: {settings.ALLOWED_HOSTS}")
    if not settings.ALLOWED_HOSTS or settings.ALLOWED_HOSTS == ['*']:
        print("  ⚠️  تحذير: حدد ALLOWED_HOSTS بشكل صحيح")
    
    # 4. Database
    db_engine = settings.DATABASES['default']['ENGINE']
    print(f"✓ Database Engine: {db_engine}")
    if 'postgresql' in db_engine:
        print("  ✅ PostgreSQL مُعد بشكل صحيح")
    elif 'sqlite' in db_engine:
        print("  ⚠️  تحذير: SQLite للتطوير فقط")
    
    # 5. Static Files
    print(f"✓ STATIC_ROOT: {settings.STATIC_ROOT}")
    print(f"✓ STATIC_URL: {settings.STATIC_URL}")
    print(f"✓ STATICFILES_STORAGE: {settings.STATICFILES_STORAGE}")
    
    # 6. Media Files
    print(f"✓ MEDIA_ROOT: {settings.MEDIA_ROOT}")
    print(f"✓ MEDIA_URL: {settings.MEDIA_URL}")
    
    # 7. CORS
    print(f"✓ CORS_ALLOWED_ORIGINS: {settings.CORS_ALLOWED_ORIGINS}")
    
    # 8. Middleware
    if 'whitenoise.middleware.WhiteNoiseMiddleware' in settings.MIDDLEWARE:
        print("✓ WhiteNoise Middleware: ✅ مُفعّل")
    else:
        print("✗ WhiteNoise Middleware: ❌ غير مُفعّل")
    
    # 9. Security Settings
    if not settings.DEBUG:
        print("\n🔒 إعدادات الأمان (Production):")
        security_settings = [
            'SECURE_SSL_REDIRECT',
            'SESSION_COOKIE_SECURE',
            'CSRF_COOKIE_SECURE',
            'SECURE_BROWSER_XSS_FILTER',
            'SECURE_CONTENT_TYPE_NOSNIFF',
        ]
        for setting in security_settings:
            value = getattr(settings, setting, False)
            status = "✅" if value else "❌"
            print(f"  {status} {setting}: {value}")
    
    print("\n✅ اختبار الإعدادات اكتمل!")
    print("\n💡 نصيحة: قبل النشر، تأكد من:")
    print("  1. DEBUG=False")
    print("  2. SECRET_KEY آمن")
    print("  3. ALLOWED_HOSTS صحيح")
    print("  4. DATABASE_URL صحيح")
    print("  5. CORS_ALLOWED_ORIGINS يحتوي على Frontend URL")

def test_database():
    """اختبار الاتصال بقاعدة البيانات"""
    print("\n🔍 اختبار الاتصال بقاعدة البيانات...")
    try:
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        print("✅ الاتصال بقاعدة البيانات ناجح!")
    except Exception as e:
        print(f"❌ خطأ في الاتصال بقاعدة البيانات: {e}")

def test_migrations():
    """اختبار Migrations"""
    print("\n🔍 اختبار Migrations...")
    try:
        call_command('showmigrations', '--list')
        print("✅ Migrations جاهزة!")
    except Exception as e:
        print(f"❌ خطأ في Migrations: {e}")

if __name__ == '__main__':
    try:
        test_settings()
        test_database()
        test_migrations()
    except Exception as e:
        print(f"\n❌ خطأ: {e}")
        sys.exit(1)
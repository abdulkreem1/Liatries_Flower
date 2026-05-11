# دليل التشغيل السريع

## التشغيل المحلي (Local Development)

### 1. إعداد البيئة

```bash
cd backend

# إنشاء virtual environment
python -m venv venv

# تفعيل virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# تثبيت المكتبات
pip install -r requirements.txt
```

### 2. إعداد قاعدة البيانات

#### خيار 1: SQLite (للتطوير السريع)
```bash
# في settings.py، استخدم:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

#### خيار 2: PostgreSQL مع Docker
```bash
# من المجلد الرئيسي
docker-compose up -d db

# انتظر 10 ثواني ثم
cd backend
```

#### خيار 3: PostgreSQL محلي
```bash
# ثبت PostgreSQL ثم
createdb liatries_db
```

### 3. إعداد ملف .env

```bash
# انسخ الملف النموذجي
cp .env.example .env

# عدل القيم حسب الحاجة
```

### 4. تشغيل Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. إنشاء Superuser

```bash
python manage.py createsuperuser
```

### 6. تشغيل السيرفر

```bash
# Development server
python manage.py runserver

# أو مع Gunicorn
gunicorn liatries.wsgi:application
```

### 7. اختبار API

- API: http://localhost:8000/api/flowers/
- Admin: http://localhost:8000/admin/

## التشغيل مع Docker

```bash
# من المجلد الرئيسي
docker-compose up --build

# في terminal آخر، إنشاء superuser
docker-compose exec web python manage.py createsuperuser
```

## اختبار قبل الرفع على Render

### 1. اختبار مع DEBUG=False

```bash
# في .env
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1

# جمع static files
python manage.py collectstatic --no-input

# تشغيل مع Gunicorn
gunicorn liatries.wsgi:application
```

### 2. اختبار Build Script

```bash
# Windows (Git Bash):
bash build.sh

# Mac/Linux:
chmod +x build.sh
./build.sh
```

### 3. التأكد من Environment Variables

```python
# في Django shell
python manage.py shell

from django.conf import settings
print(settings.DEBUG)
print(settings.DATABASES)
print(settings.ALLOWED_HOSTS)
```

## استكشاف الأخطاء

### خطأ: No module named 'xxx'
```bash
pip install -r requirements.txt
```

### خطأ: Database connection
```bash
# تأكد من PostgreSQL يعمل
docker-compose ps
# أو
pg_isready
```

### خطأ: Static files not found
```bash
python manage.py collectstatic --no-input
```

### خطأ: CORS
```bash
# تأكد من CORS_ALLOWED_ORIGINS في settings.py
# وأن Frontend URL موجود
```
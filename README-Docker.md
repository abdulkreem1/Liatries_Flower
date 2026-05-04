# تشغيل المشروع مع PostgreSQL و Docker

## المتطلبات
- Docker
- Docker Compose

## خطوات التشغيل

### 1. بناء وتشغيل الحاويات
```bash
docker-compose up --build
```

### 2. تشغيل الحاويات في الخلفية
```bash
docker-compose up -d
```

### 3. إيقاف الحاويات
```bash
docker-compose down
```

### 4. إيقاف الحاويات مع حذف البيانات
```bash
docker-compose down -v
```

## الوصول للتطبيق
- Backend API: http://localhost:8000
- PostgreSQL Database: localhost:5432

## أوامر مفيدة

### تشغيل أوامر Django داخل الحاوية
```bash
# إنشاء migrations جديدة
docker-compose exec web python manage.py makemigrations

# تطبيق migrations
docker-compose exec web python manage.py migrate

# إنشاء superuser
docker-compose exec web python manage.py createsuperuser

# جمع الملفات الثابتة
docker-compose exec web python manage.py collectstatic
```

### الوصول لقاعدة البيانات
```bash
docker-compose exec db psql -U liatries_user -d liatries_db
```

### عرض logs
```bash
# عرض logs لجميع الخدمات
docker-compose logs

# عرض logs لخدمة معينة
docker-compose logs web
docker-compose logs db
```

## إعدادات قاعدة البيانات
- Database: liatries_db
- Username: liatries_user
- Password: liatries_password
- Host: localhost (أو db داخل Docker)
- Port: 5432
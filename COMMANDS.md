# أوامر مفيدة للمشروع

## التطوير المحلي

### Backend

```bash
# تفعيل virtual environment
cd backend
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# تثبيت المكتبات
pip install -r requirements.txt

# إنشاء migrations
python manage.py makemigrations

# تطبيق migrations
python manage.py migrate

# إنشاء superuser
python manage.py createsuperuser

# تشغيل development server
python manage.py runserver

# تشغيل مع Gunicorn
gunicorn liatries.wsgi:application

# جمع static files
python manage.py collectstatic --no-input

# فتح Django shell
python manage.py shell

# اختبار الإعدادات
python test_settings.py
```

### Frontend

```bash
cd frontend

# تثبيت المكتبات
npm install

# تشغيل development server
npm start

# بناء للإنتاج
npm run build

# اختبار البناء
npm run test
```

## Docker

```bash
# بناء وتشغيل جميع الخدمات
docker-compose up --build

# تشغيل في الخلفية
docker-compose up -d

# إيقاف الخدمات
docker-compose down

# إيقاف مع حذف البيانات
docker-compose down -v

# عرض logs
docker-compose logs -f
docker-compose logs -f web
docker-compose logs -f db

# تنفيذ أوامر داخل الحاوية
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py createsuperuser
docker-compose exec web python manage.py shell

# الوصول لقاعدة البيانات
docker-compose exec db psql -U liatries_user -d liatries_db

# إعادة بناء حاوية معينة
docker-compose up --build --force-recreate web

# عرض الحاويات النشطة
docker-compose ps
```

## Git

```bash
# التحقق من الحالة
git status

# إضافة الملفات
git add .

# Commit
git commit -m "رسالة التعديل"

# Push
git push origin main

# Pull آخر التحديثات
git pull origin main

# إنشاء branch جديد
git checkout -b feature-name

# العودة لـ main
git checkout main

# دمج branch
git merge feature-name

# عرض التاريخ
git log --oneline
```

## قاعدة البيانات

### PostgreSQL محلي

```bash
# إنشاء database
createdb liatries_db

# حذف database
dropdb liatries_db

# الاتصال بـ database
psql -d liatries_db

# عمل backup
pg_dump liatries_db > backup.sql

# استعادة backup
psql liatries_db < backup.sql
```

### PostgreSQL في Docker

```bash
# الاتصال
docker-compose exec db psql -U liatries_user -d liatries_db

# عمل backup
docker-compose exec db pg_dump -U liatries_user liatries_db > backup.sql

# استعادة backup
docker-compose exec -T db psql -U liatries_user liatries_db < backup.sql

# عرض الجداول
docker-compose exec db psql -U liatries_user -d liatries_db -c "\dt"
```

## Render.com

### من Shell في Render

```bash
# إنشاء superuser
python manage.py createsuperuser

# تطبيق migrations
python manage.py migrate

# جمع static files
python manage.py collectstatic --no-input

# فتح Django shell
python manage.py shell

# عرض migrations
python manage.py showmigrations

# إنشاء migrations جديدة
python manage.py makemigrations
```

### من Terminal المحلي

```bash
# تثبيت Render CLI (اختياري)
npm install -g @render/cli

# تسجيل الدخول
render login

# عرض الخدمات
render services list

# عرض logs
render logs <service-id>
```

## اختبار

### اختبار Backend

```bash
cd backend

# اختبار الإعدادات
python test_settings.py

# اختبار مع DEBUG=False
# في .env: DEBUG=False
python manage.py runserver

# اختبار build script
bash build.sh

# اختبار Gunicorn
gunicorn liatries.wsgi:application --bind 0.0.0.0:8000

# اختبار API
curl http://localhost:8000/api/flowers/
```

### اختبار Frontend

```bash
cd frontend

# اختبار البناء
npm run build

# تشغيل البناء محلياً
npx serve -s build
```

## تنظيف

```bash
# حذف __pycache__
find . -type d -name "__pycache__" -exec rm -r {} +

# حذف .pyc files
find . -type f -name "*.pyc" -delete

# حذف node_modules
rm -rf frontend/node_modules

# حذف venv
rm -rf backend/venv

# حذف staticfiles
rm -rf backend/staticfiles

# حذف migrations (احذر!)
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc" -delete
```

## مراقبة

```bash
# عرض استخدام الذاكرة
docker stats

# عرض حجم الحاويات
docker system df

# تنظيف Docker
docker system prune -a

# عرض logs مع timestamp
docker-compose logs -f --timestamps

# عرض آخر 100 سطر من logs
docker-compose logs --tail=100
```

## Environment Variables

```bash
# عرض المتغيرات (Linux/Mac)
printenv | grep DB_

# عرض المتغيرات (Windows)
set | findstr DB_

# تحميل .env في shell
export $(cat .env | xargs)

# اختبار متغير معين
echo $DATABASE_URL
```

## نصائح

```bash
# تشغيل سريع للتطوير
docker-compose up -d db  # فقط قاعدة البيانات
cd backend && python manage.py runserver

# إعادة تشغيل سريعة
docker-compose restart web

# عرض IP الحاوية
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_name

# نسخ ملف من/إلى الحاوية
docker cp file.txt container_name:/app/
docker cp container_name:/app/file.txt ./
```
# ✅ Checklist قبل الرفع على Render

## الملفات المطلوبة
- [x] `backend/requirements.txt` - جميع المكتبات
- [x] `backend/runtime.txt` - إصدار Python
- [x] `backend/build.sh` - سكريبت البناء
- [x] `backend/render.yaml` - إعدادات Render (اختياري)
- [x] `backend/.env.example` - نموذج متغيرات البيئة
- [x] `.gitignore` - استبعاد الملفات الحساسة
- [x] `.gitattributes` - صلاحيات الملفات

## إعدادات Django

### settings.py
- [x] استيراد `dj_database_url`
- [x] استخدام `config()` من `python-decouple`
- [x] `DEBUG = config('DEBUG', default=False, cast=bool)`
- [x] `ALLOWED_HOSTS` من environment variable
- [x] `RENDER_EXTERNAL_HOSTNAME` support
- [x] `DATABASE_URL` support
- [x] `CORS_ALLOWED_ORIGINS` من environment variable
- [x] Security settings للإنتاج
- [x] WhiteNoise في MIDDLEWARE
- [x] `STATICFILES_STORAGE` للـ WhiteNoise

### requirements.txt
- [x] Django
- [x] djangorestframework
- [x] psycopg2-binary
- [x] dj-database-url
- [x] gunicorn
- [x] whitenoise
- [x] django-cors-headers
- [x] python-decouple
- [x] Pillow

## اختبار محلي

### قبل الرفع، اختبر:
```bash
# 1. تثبيت المكتبات
cd backend
pip install -r requirements.txt

# 2. اختبار build script
bash build.sh

# 3. اختبار مع DEBUG=False
# في .env: DEBUG=False
python manage.py runserver

# 4. اختبار Gunicorn
gunicorn liatries.wsgi:application

# 5. التأكد من Static Files
python manage.py collectstatic --no-input
```

## Git

### قبل Push:
```bash
# 1. تأكد من .gitignore
git status
# يجب ألا ترى: .env, venv/, __pycache__/, db.sqlite3

# 2. Add & Commit
git add .
git commit -m "Prepare for Render deployment"

# 3. Push
git push origin main
```

## Render Setup

### 1. PostgreSQL Database
- [ ] إنشاء PostgreSQL Database
- [ ] نسخ Internal Database URL
- [ ] انتظار حتى يصبح "Available"

### 2. Web Service
- [ ] ربط GitHub Repository
- [ ] Root Directory: `backend`
- [ ] Build Command: `./build.sh`
- [ ] Start Command: `gunicorn liatries.wsgi:application`
- [ ] Python Version: 3.11.0

### 3. Environment Variables
```
SECRET_KEY=<Generate>
DEBUG=False
DATABASE_URL=<من PostgreSQL Database>
ALLOWED_HOSTS=<your-app>.onrender.com
CORS_ALLOWED_ORIGINS=https://<your-frontend>.com
PYTHON_VERSION=3.11.0
```

### 4. بعد Deploy
- [ ] انتظار انتهاء Build (5-10 دقائق)
- [ ] فتح Shell وإنشاء superuser
- [ ] اختبار API: `https://<your-app>.onrender.com/api/flowers/`
- [ ] اختبار Admin: `https://<your-app>.onrender.com/admin/`

## مشاكل شائعة وحلولها

### ❌ Build Failed
```bash
# تأكد من:
- build.sh له صلاحيات التنفيذ
- requirements.txt صحيح
- Python version صحيح في runtime.txt
```

### ❌ Database Connection Error
```bash
# تأكد من:
- DATABASE_URL صحيح
- PostgreSQL Database جاهز
- Internal Database URL (ليس External)
```

### ❌ Static Files 404
```bash
# تأكد من:
- WhiteNoise في MIDDLEWARE
- STATICFILES_STORAGE صحيح
- collectstatic في build.sh
```

### ❌ CORS Error
```bash
# تأكد من:
- CORS_ALLOWED_ORIGINS يحتوي على Frontend URL
- https:// في الـ URL (ليس http://)
```

### ❌ 502 Bad Gateway
```bash
# تأكد من:
- gunicorn يعمل بشكل صحيح
- ALLOWED_HOSTS يحتوي على Render URL
- لا توجد أخطاء في Logs
```

## بعد النشر الناجح

### تحديث Frontend
```javascript
// في Frontend، غير API URL إلى:
const API_URL = 'https://your-app.onrender.com/api';
```

### مراقبة التطبيق
- [ ] فحص Logs بانتظام
- [ ] مراقبة استخدام Database
- [ ] اختبار API endpoints

### Backup
- [ ] عمل backup لقاعدة البيانات بانتظام
- [ ] حفظ Environment Variables في مكان آمن

## ملاحظات

⚠️ **Free Plan Limitations:**
- التطبيق ينام بعد 15 دقيقة
- 750 ساعة مجانية شهرياً
- الملفات المرفوعة لا تُحفظ (استخدم Cloudinary)

✅ **نصائح:**
- استخدم Render Disk أو Cloudinary للملفات
- راقب استخدام Database (1GB حد أقصى)
- فعّل Auto-Deploy من GitHub
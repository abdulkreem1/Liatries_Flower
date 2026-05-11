# دليل رفع المشروع على Render

## الخطوات

### 1. إنشاء حساب على Render
- اذهب إلى [render.com](https://render.com)
- سجل دخول باستخدام GitHub

### 2. رفع الكود على GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 3. إنشاء PostgreSQL Database

1. من لوحة تحكم Render، اضغط **New +**
2. اختر **PostgreSQL**
3. املأ المعلومات:
   - **Name**: `liatries-db`
   - **Database**: `liatries_db`
   - **User**: `liatries_user`
   - **Region**: اختر الأقرب لك
   - **Plan**: Free
4. اضغط **Create Database**
5. انتظر حتى يصبح جاهزاً وانسخ **Internal Database URL**

### 4. إنشاء Web Service

1. من لوحة تحكم Render، اضغط **New +**
2. اختر **Web Service**
3. اربط مع GitHub repository
4. املأ المعلومات:
   - **Name**: `liatries-backend`
   - **Region**: نفس region قاعدة البيانات
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn liatries.wsgi:application`
   - **Plan**: Free

### 5. إضافة Environment Variables

في صفحة Web Service، اذهب إلى **Environment** وأضف:

```
SECRET_KEY=<اضغط Generate لإنشاء مفتاح عشوائي>
DEBUG=False
DATABASE_URL=<الصق Internal Database URL من الخطوة 3>
ALLOWED_HOSTS=<your-app-name>.onrender.com
CORS_ALLOWED_ORIGINS=https://<your-frontend-url>.com
PYTHON_VERSION=3.11.0
```

### 6. Deploy

1. اضغط **Create Web Service**
2. انتظر حتى ينتهي البناء والنشر (5-10 دقائق)
3. سيظهر لك رابط التطبيق: `https://your-app-name.onrender.com`

### 7. إنشاء Superuser

بعد نجاح النشر، افتح Shell من لوحة التحكم:

```bash
python manage.py createsuperuser
```

### 8. اختبار التطبيق

- API: `https://your-app-name.onrender.com/api/flowers/`
- Admin: `https://your-app-name.onrender.com/admin/`

## ملاحظات مهمة

### Free Plan Limitations
- التطبيق ينام بعد 15 دقيقة من عدم الاستخدام
- أول طلب بعد النوم يأخذ 30-60 ثانية
- 750 ساعة مجانية شهرياً

### تحديث التطبيق
عند عمل push جديد على GitHub، Render سيقوم بإعادة النشر تلقائياً.

### الملفات الثابتة (Static Files)
WhiteNoise يتولى خدمة الملفات الثابتة تلقائياً.

### الملفات المرفوعة (Media Files)
⚠️ **مهم**: Render Free Plan لا يحفظ الملفات المرفوعة بشكل دائم.

**الحلول:**
1. استخدام Cloudinary (مجاني):
   ```bash
   pip install django-cloudinary-storage
   ```

2. استخدام AWS S3

3. استخدام Render Disk (مدفوع)

### Logs
لعرض logs التطبيق:
```bash
# من لوحة التحكم > Logs
# أو من Shell
tail -f /var/log/render.log
```

## استكشاف الأخطاء

### خطأ في Build
- تأكد من `build.sh` له صلاحيات التنفيذ
- تأكد من `requirements.txt` صحيح

### خطأ في Database
- تأكد من `DATABASE_URL` صحيح
- تأكد من Database جاهز قبل Web Service

### خطأ CORS
- أضف رابط Frontend إلى `CORS_ALLOWED_ORIGINS`
- تأكد من `ALLOWED_HOSTS` يحتوي على رابط Render

### Static Files لا تعمل
```bash
python manage.py collectstatic --no-input
```

## أوامر مفيدة من Shell

```bash
# فتح Django Shell
python manage.py shell

# عرض Migrations
python manage.py showmigrations

# إنشاء Migrations
python manage.py makemigrations

# تطبيق Migrations
python manage.py migrate

# جمع Static Files
python manage.py collectstatic --no-input
```

## روابط مفيدة

- [Render Docs](https://render.com/docs)
- [Django on Render](https://render.com/docs/deploy-django)
- [PostgreSQL on Render](https://render.com/docs/databases)
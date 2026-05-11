# الأسئلة الشائعة (FAQ)

## عام

### ما هي تكلفة استضافة المشروع؟
- **Render Free Plan**: مجاني تماماً
  - PostgreSQL: 1GB مجاني
  - Web Service: 750 ساعة شهرياً
  - التطبيق ينام بعد 15 دقيقة من عدم الاستخدام

### هل يمكن استخدام قاعدة بيانات أخرى؟
نعم، Django يدعم:
- PostgreSQL (موصى به للإنتاج)
- MySQL/MariaDB
- SQLite (للتطوير فقط)
- Oracle

### كيف أحفظ الصور المرفوعة؟
Render Free Plan لا يحفظ الملفات بشكل دائم. الحلول:
1. **Cloudinary** (موصى به) - 10GB مجاني
2. **AWS S3** - مدفوع
3. **Render Disk** - $0.25/GB شهرياً

راجع `backend/CLOUDINARY-SETUP.md` للتفاصيل.

## التطوير

### كيف أشغل المشروع محلياً؟
```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend
cd frontend
npm install
npm start
```

### كيف أستخدم Docker؟
```bash
docker-compose up --build
```

### خطأ: ModuleNotFoundError
```bash
# تأكد من تفعيل virtual environment
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# ثبت المكتبات
pip install -r requirements.txt
```

### خطأ: Database connection failed
```bash
# تأكد من PostgreSQL يعمل
docker-compose up -d db

# أو تأكد من إعدادات .env صحيحة
```

## النشر على Render

### كم يستغرق النشر؟
- أول نشر: 5-10 دقائق
- التحديثات: 3-5 دقائق

### التطبيق بطيء جداً!
هذا طبيعي في Free Plan:
- التطبيق ينام بعد 15 دقيقة
- أول طلب بعد النوم يأخذ 30-60 ثانية

**الحلول:**
1. استخدام Paid Plan ($7/شهر)
2. استخدام Cron Job لإبقاء التطبيق مستيقظاً
3. إضافة loading screen في Frontend

### خطأ: Build Failed
**الأسباب الشائعة:**
1. `build.sh` ليس له صلاحيات تنفيذ
   - الحل: تأكد من `.gitattributes` موجود
2. خطأ في `requirements.txt`
   - الحل: اختبر محلياً أولاً
3. Python version خاطئ
   - الحل: تأكد من `runtime.txt`

### خطأ: Database connection
1. تأكد من استخدام **Internal Database URL** (ليس External)
2. تأكد من Database جاهز قبل Web Service
3. تأكد من `DATABASE_URL` في Environment Variables

### خطأ: Static files 404
```bash
# تأكد من:
1. WhiteNoise في MIDDLEWARE
2. STATICFILES_STORAGE صحيح
3. collectstatic في build.sh
```

### خطأ: CORS
```bash
# في Render Environment Variables:
CORS_ALLOWED_ORIGINS=https://your-frontend.com

# تأكد من استخدام https:// (ليس http://)
```

### كيف أحدث التطبيق؟
```bash
git add .
git commit -m "تحديث"
git push origin main
```
Render سيقوم بإعادة النشر تلقائياً.

### كيف أعمل backup لقاعدة البيانات؟
من Render Dashboard:
1. اذهب إلى PostgreSQL Database
2. اضغط "Backups"
3. اضغط "Create Backup"

أو من Shell:
```bash
pg_dump $DATABASE_URL > backup.sql
```

### كيف أرى logs التطبيق؟
من Render Dashboard:
1. اذهب إلى Web Service
2. اضغط "Logs"

أو من Shell:
```bash
tail -f /var/log/render.log
```

## الأمان

### هل SECRET_KEY آمن؟
في Render، استخدم "Generate" لإنشاء مفتاح عشوائي آمن.

### هل يجب تغيير DEBUG؟
نعم! في الإنتاج:
```
DEBUG=False
```

### ما هي إعدادات الأمان الموصى بها؟
المشروع يحتوي على إعدادات أمان تلقائية عند `DEBUG=False`:
- HTTPS redirect
- Secure cookies
- XSS protection
- HSTS

## الأداء

### كيف أحسن الأداء؟
1. استخدام Paid Plan
2. تفعيل caching
3. تحسين queries
4. استخدام CDN للملفات الثابتة

### كيف أضيف caching؟
```python
# في settings.py
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}
```

### كيف أراقب استخدام Database؟
من Render Dashboard:
1. اذهب إلى PostgreSQL Database
2. شاهد "Metrics"

## Frontend

### كيف أربط Frontend مع Backend؟
```javascript
// في Frontend
const API_URL = 'https://your-app.onrender.com/api';

fetch(`${API_URL}/flowers/`)
  .then(res => res.json())
  .then(data => console.log(data));
```

### أين أنشر Frontend؟
خيارات مجانية:
1. **Vercel** (موصى به)
2. **Netlify**
3. **GitHub Pages**
4. **Render Static Site**

### خطأ CORS في Frontend
تأكد من:
1. `CORS_ALLOWED_ORIGINS` يحتوي على Frontend URL
2. استخدام `https://` في الإنتاج
3. `CORS_ALLOW_CREDENTIALS = True` إذا كنت تستخدم cookies

## استكشاف الأخطاء

### التطبيق لا يعمل بعد النشر
1. افحص Logs في Render
2. تأكد من Environment Variables صحيحة
3. تأكد من Database جاهز
4. جرب إعادة Deploy

### الصور لا تظهر
1. تأكد من استخدام Cloudinary
2. تأكد من `MEDIA_URL` صحيح
3. تأكد من CORS يسمح بالصور

### Admin Panel لا يعمل
```bash
# من Render Shell
python manage.py createsuperuser
```

### نسيت كلمة مرور Admin
```bash
# من Render Shell
python manage.py changepassword username
```

## الدعم

### أين أجد المساعدة؟
1. راجع الوثائق في المشروع
2. [Render Docs](https://render.com/docs)
3. [Django Docs](https://docs.djangoproject.com/)
4. [Stack Overflow](https://stackoverflow.com/)

### كيف أبلغ عن مشكلة؟
افتح Issue في GitHub Repository.

### هل يوجد دعم فني؟
- Render Free Plan: Community Support فقط
- Render Paid Plans: Email Support
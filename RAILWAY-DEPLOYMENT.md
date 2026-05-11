# دليل النشر على Railway 🚂

## المميزات
- ✅ $5 رصيد مجاني شهرياً
- ✅ Deploy تلقائي من GitHub
- ✅ Environment Variables سهلة
- ✅ Shell مدمج
- ✅ Logs واضحة

---

## الخطوات

### 1. إنشاء حساب Railway

1. اذهب إلى [railway.app](https://railway.app)
2. سجل دخول باستخدام GitHub
3. اضغط **New Project**

---

### 2. إعداد Supabase Database

راجع [SUPABASE-SETUP.md](SUPABASE-SETUP.md) للحصول على Connection String

---

### 3. إنشاء Project على Railway

#### الطريقة 1: من GitHub (موصى به)

1. اضغط **Deploy from GitHub repo**
2. اختر repository تبعك
3. اختر branch (main)
4. Railway سيكتشف Django تلقائياً

#### الطريقة 2: من CLI

```bash
# تثبيت Railway CLI
npm i -g @railway/cli

# تسجيل الدخول
railway login

# ربط المشروع
railway link

# Deploy
railway up
```

---

### 4. إضافة Environment Variables

في Railway Dashboard:

1. اختر الـ Service
2. اذهب إلى **Variables**
3. أضف:

```env
# Required
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:6543/postgres
SECRET_KEY=your-secret-key-here-make-it-long-and-random
DEBUG=False
ALLOWED_HOSTS=your-app.up.railway.app
PYTHON_VERSION=3.11.0

# Optional
CORS_ALLOWED_ORIGINS=https://your-frontend.com

# Superuser (للإنشاء التلقائي)
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@liatries.com
DJANGO_SUPERUSER_PASSWORD=YourStrongPassword123!
```

⚠️ **مهم**: غير `DJANGO_SUPERUSER_PASSWORD` لكلمة مرور قوية!

---

### 5. إعداد Build Command

Railway يكتشف Django تلقائياً، لكن تأكد من:

**Settings → Deploy:**
- **Build Command**: `cd backend && bash build.sh`
- **Start Command**: `cd backend && gunicorn liatries.wsgi:application`
- **Root Directory**: `/` (أو اتركه فاضي)

---

### 6. Deploy

1. اضغط **Deploy**
2. انتظر 3-5 دقائق
3. افحص Logs للتأكد من نجاح Deploy

---

### 7. التحقق من Superuser

#### الطريقة 1: تلقائياً (من build.sh)

السكريبت `create_superuser.py` سيعمل superuser تلقائياً عند Deploy!

**المعلومات:**
- Username: من `DJANGO_SUPERUSER_USERNAME`
- Email: من `DJANGO_SUPERUSER_EMAIL`
- Password: من `DJANGO_SUPERUSER_PASSWORD`

#### الطريقة 2: يدوياً (من Shell)

إذا ما اشتغل تلقائياً:

1. في Railway Dashboard، اختر Service
2. اضغط **Shell** (أيقونة Terminal)
3. شغل:

```bash
cd backend
python manage.py createsuperuser
```

4. أدخل المعلومات

---

### 8. اختبار التطبيق

```
API: https://your-app.up.railway.app/api/flowers/
Admin: https://your-app.up.railway.app/admin/
```

---

## إعدادات إضافية

### Custom Domain

1. في Railway Dashboard → Settings
2. اضغط **Generate Domain** أو **Custom Domain**
3. أضف Domain في `ALLOWED_HOSTS`

### Cloudinary للصور

راجع [CLOUDINARY-SETUP.md](backend/CLOUDINARY-SETUP.md)

---

## استكشاف الأخطاء

### خطأ: Build Failed

**الأسباب:**
1. `build.sh` ليس له صلاحيات تنفيذ
2. خطأ في `requirements.txt`
3. Python version خاطئ

**الحل:**
```bash
# تأكد من .gitattributes موجود
# افحص Logs في Railway
```

### خطأ: Database Connection

**الأسباب:**
1. `DATABASE_URL` خاطئ
2. Password خاطئ
3. Port خاطئ (استخدم 6543 ليس 5432)

**الحل:**
```bash
# تأكد من Connection String من Supabase
# استخدم Port 6543 (Connection Pooling)
```

### خطأ: Superuser لم يُنشأ

**الحل 1: من Shell**
```bash
cd backend
python manage.py createsuperuser
```

**الحل 2: شغل السكريبت يدوياً**
```bash
cd backend
python create_superuser.py
```

**الحل 3: من Django Shell**
```bash
cd backend
python manage.py shell

# في Shell:
from django.contrib.auth import get_user_model
User = get_user_model()
User.objects.create_superuser('admin', 'admin@example.com', 'password123')
exit()
```

### خطأ: Static Files 404

**الحل:**
```bash
# من Railway Shell
cd backend
python manage.py collectstatic --no-input
```

### خطأ: CORS

**الحل:**
```env
# في Railway Variables
CORS_ALLOWED_ORIGINS=https://your-frontend.com
# استخدم https:// (ليس http://)
```

---

## الأوامر المفيدة

### من Railway Shell

```bash
# الدخول للمجلد
cd backend

# Migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# أو استخدم السكريبت
python create_superuser.py

# Collect static files
python manage.py collectstatic --no-input

# Django shell
python manage.py shell

# Database shell
python manage.py dbshell

# عرض logs
railway logs
```

---

## Monitoring

### Logs

في Railway Dashboard:
1. اختر Service
2. اضغط **Deployments**
3. اختر Deployment
4. شاهد Logs

### Metrics

في Railway Dashboard:
1. اختر Service
2. اضغط **Metrics**
3. شاهد:
   - CPU Usage
   - Memory Usage
   - Network

---

## التكلفة

### Free Plan
- $5 رصيد مجاني شهرياً
- يكفي لـ ~500 ساعة تشغيل
- بعد انتهاء الرصيد، التطبيق يتوقف

### Pricing
- **Hobby Plan**: $5/شهر (500 ساعة)
- **Pro Plan**: $20/شهر (غير محدود)

**حساب التكلفة:**
- 1 Service × 24 ساعة × 30 يوم = 720 ساعة
- التكلفة: ~$7-10/شهر

---

## مقارنة: Railway vs Render

| الميزة | Railway | Render |
|--------|---------|--------|
| Free Plan | $5 رصيد | 750 ساعة |
| Sleep | لا ينام | ينام بعد 15 دقيقة |
| Deploy Speed | سريع جداً | متوسط |
| Dashboard | ممتاز | جيد |
| Shell | ✅ مدمج | ✅ مدمج |
| Logs | ممتاز | جيد |
| Custom Domain | ✅ مجاني | ✅ مجاني |

---

## نصائح

1. **استخدم Supabase** للداتابيس (أفضل من Railway PostgreSQL)
2. **راقب الرصيد** في Railway Dashboard
3. **استخدم Cloudinary** للصور
4. **فعّل Auto-Deploy** من GitHub
5. **احفظ Environment Variables** في مكان آمن

---

## الخطوات الكاملة (ملخص)

1. ✅ إنشاء مشروع في Supabase
2. ✅ نسخ Connection String (Port 6543)
3. ✅ Push الكود إلى GitHub
4. ✅ إنشاء Project في Railway
5. ✅ Deploy from GitHub
6. ✅ إضافة Environment Variables
7. ✅ Deploy
8. ✅ التحقق من Superuser (تلقائي أو يدوي)
9. ✅ اختبار التطبيق

---

## الدعم

### الأدلة
- 📚 [DOCS-INDEX.md](DOCS-INDEX.md)
- 🗄️ [SUPABASE-SETUP.md](SUPABASE-SETUP.md)
- ☁️ [CLOUDINARY-SETUP.md](backend/CLOUDINARY-SETUP.md)
- ❓ [FAQ.md](FAQ.md)

### Railway Docs
- [Railway Docs](https://docs.railway.app/)
- [Django on Railway](https://docs.railway.app/guides/django)

---

**جاهز للنشر على Railway! 🚂**

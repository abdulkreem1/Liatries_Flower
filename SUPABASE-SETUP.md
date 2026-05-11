# إعداد Supabase كقاعدة بيانات 🗄️

## لماذا Supabase؟
- ✅ PostgreSQL مجاني (500MB)
- ✅ لا ينام أبداً (على عكس Render Free)
- ✅ Backups تلقائية
- ✅ واجهة إدارة ممتازة
- ✅ API جاهز

## الخطوات

### 1. إنشاء حساب Supabase

1. اذهب إلى [supabase.com](https://supabase.com)
2. سجل دخول باستخدام GitHub
3. اضغط **New Project**

### 2. إعداد المشروع

املأ المعلومات:
- **Name**: `liatries-db` (أو أي اسم)
- **Database Password**: اختر كلمة مرور قوية (احفظها!)
- **Region**: اختر الأقرب لك
- **Pricing Plan**: Free

اضغط **Create new project** وانتظر 2-3 دقائق

### 3. الحصول على Connection String

1. من لوحة تحكم Supabase، اذهب إلى **Settings** (⚙️)
2. اضغط **Database**
3. انزل لـ **Connection string**
4. اختر **URI** (ليس Session mode)
5. انسخ الـ Connection String

سيكون بهذا الشكل:
```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

⚠️ **مهم**: استبدل `[YOUR-PASSWORD]` بكلمة المرور الحقيقية!

### 4. إضافة Connection String في Render

في Render Web Service:
1. اذهب إلى **Environment**
2. أضف متغير جديد:
   ```
   Key: DATABASE_URL
   Value: postgresql://postgres:your-password@db.xxxxx.supabase.co:5432/postgres
   ```
3. احفظ التغييرات

### 5. إعدادات إضافية في Supabase

#### تفعيل Connection Pooling (موصى به)

1. في Supabase، اذهب إلى **Database** → **Connection Pooling**
2. فعّل **Connection Pooling**
3. انسخ الـ **Connection string** الجديد (Port 6543)
4. استخدمه في Render بدلاً من الـ Direct connection

```
postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:6543/postgres
```

**الفرق:**
- **Port 5432**: Direct connection (محدود بـ 60 connection)
- **Port 6543**: Pooled connection (يدعم آلاف الـ connections)

### 6. تطبيق Migrations

بعد Deploy على Render:

1. افتح **Shell** في Render
2. شغل:
```bash
python manage.py migrate
python manage.py createsuperuser
```

### 7. التحقق من الاتصال

في Render Shell:
```bash
python manage.py dbshell
```

يجب أن تدخل على PostgreSQL shell.

## إعدادات Django (لا تحتاج تغيير)

الإعدادات الحالية في `settings.py` تدعم Supabase تلقائياً:

```python
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL'),
        conn_max_age=600,  # Connection pooling
        conn_health_checks=True,
    )
}
```

## مراقبة قاعدة البيانات

### من Supabase Dashboard

1. **Table Editor**: عرض وتعديل البيانات
2. **SQL Editor**: تشغيل queries مباشرة
3. **Database**: مراقبة الحجم والأداء
4. **Logs**: عرض logs قاعدة البيانات

### أوامر مفيدة

```sql
-- عرض جميع الجداول
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public';

-- عرض حجم قاعدة البيانات
SELECT pg_size_pretty(pg_database_size('postgres'));

-- عرض حجم كل جدول
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- عدد الصفوف في كل جدول
SELECT 
    schemaname,
    tablename,
    n_live_tup as row_count
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;
```

## Backup

### Automatic Backups (Free Plan)
- Supabase يعمل backup تلقائي يومياً
- يحفظ آخر 7 أيام

### Manual Backup

#### من Supabase Dashboard
1. اذهب إلى **Database** → **Backups**
2. اضغط **Download backup**

#### من Command Line
```bash
# تثبيت Supabase CLI
npm install -g supabase

# تسجيل الدخول
supabase login

# عمل backup
supabase db dump -f backup.sql
```

#### من Render Shell
```bash
# الاتصال وعمل dump
pg_dump $DATABASE_URL > backup.sql

# تحميل الملف (صعب من Render، استخدم Supabase Dashboard)
```

## استعادة Backup

```bash
# من Render Shell
psql $DATABASE_URL < backup.sql
```

## الحدود المجانية (Free Plan)

- **Database Size**: 500MB
- **Bandwidth**: 2GB/شهر
- **API Requests**: 50,000/شهر
- **Storage**: 1GB
- **Connections**: 60 direct / آلاف pooled

## Upgrade (إذا احتجت)

**Pro Plan ($25/شهر)**:
- 8GB Database
- 50GB Bandwidth
- 500,000 API Requests
- 100GB Storage

## مقارنة: Supabase vs Render PostgreSQL

| الميزة | Supabase Free | Render Free |
|--------|---------------|-------------|
| Database Size | 500MB | 1GB |
| Sleep | لا ينام أبداً | لا ينام |
| Backups | تلقائي يومياً | يدوي |
| Dashboard | ممتاز | بسيط |
| Connection Pooling | ✅ مدمج | ❌ |
| API | ✅ جاهز | ❌ |

## استكشاف الأخطاء

### خطأ: connection refused
```bash
# تأكد من:
1. Connection string صحيح
2. Password صحيح
3. استخدمت Port الصحيح (5432 أو 6543)
```

### خطأ: too many connections
```bash
# الحل: استخدم Connection Pooling (Port 6543)
DATABASE_URL=postgresql://postgres:pass@db.xxx.supabase.co:6543/postgres
```

### خطأ: SSL required
```bash
# أضف ?sslmode=require في نهاية URL
DATABASE_URL=postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres?sslmode=require
```

### بطء في الاتصال
```bash
# استخدم Connection Pooling
# وتأكد من conn_max_age في settings.py
```

## نصائح

1. **استخدم Connection Pooling** (Port 6543) دائماً
2. **فعّل conn_max_age** في Django (موجود في settings.py)
3. **راقب استخدام Database** من Supabase Dashboard
4. **عمل backup يدوي** قبل أي تغيير كبير
5. **استخدم Indexes** للجداول الكبيرة

## Environment Variables النهائية

في Render، أضف:

```env
# Supabase Database (مع Connection Pooling)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:6543/postgres

# Django Settings
SECRET_KEY=<Generate in Render>
DEBUG=False
ALLOWED_HOSTS=your-app.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend.com
PYTHON_VERSION=3.11.0
```

## الخطوات الكاملة (ملخص)

1. ✅ إنشاء مشروع في Supabase
2. ✅ نسخ Connection String (Port 6543)
3. ✅ إضافة DATABASE_URL في Render
4. ✅ Deploy على Render
5. ✅ تشغيل migrations من Render Shell
6. ✅ إنشاء superuser
7. ✅ اختبار التطبيق

---

**الآن جاهز للنشر مع Supabase! 🚀**

راجع [RENDER-DEPLOYMENT.md](RENDER-DEPLOYMENT.md) للخطوات الكاملة.
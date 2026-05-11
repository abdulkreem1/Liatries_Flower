# دليل النشر السريع ⚡

## الخطوات (10 دقائق)

### 1️⃣ إعداد Supabase (2 دقيقة)

```
1. اذهب إلى supabase.com
2. سجل دخول بـ GitHub
3. New Project
4. اختر اسم وكلمة مرور
5. انسخ Connection String (Port 6543)
```

📖 التفاصيل: [SUPABASE-SETUP.md](SUPABASE-SETUP.md)

---

### 2️⃣ Push إلى GitHub (1 دقيقة)

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

### 3️⃣ إنشاء Web Service على Render (3 دقائق)

```
1. اذهب إلى render.com
2. New + → Web Service
3. Connect GitHub Repository
4. Settings:
   - Name: liatries-backend
   - Root Directory: backend
   - Build Command: ./build.sh
   - Start Command: gunicorn liatries.wsgi:application
   - Plan: Free
```

---

### 4️⃣ إضافة Environment Variables (2 دقيقة)

```
SECRET_KEY=<Generate>
DEBUG=False
DATABASE_URL=<من Supabase>
ALLOWED_HOSTS=your-app.onrender.com
CORS_ALLOWED_ORIGINS=https://your-frontend.com
PYTHON_VERSION=3.11.0
```

---

### 5️⃣ Deploy (5-10 دقائق)

```
1. اضغط Create Web Service
2. انتظر Build
3. افتح Shell
4. python manage.py createsuperuser
```

---

### 6️⃣ اختبار ✅

```
API: https://your-app.onrender.com/api/flowers/
Admin: https://your-app.onrender.com/admin/
```

---

## الملفات المطلوبة (كلها جاهزة ✅)

- ✅ backend/requirements.txt
- ✅ backend/runtime.txt
- ✅ backend/build.sh
- ✅ backend/.env.example
- ✅ .gitignore
- ✅ .gitattributes

---

## Environment Variables الكاملة

```env
# Required
SECRET_KEY=<Generate in Render>
DEBUG=False
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:6543/postgres
ALLOWED_HOSTS=your-app.onrender.com
PYTHON_VERSION=3.11.0

# Optional
CORS_ALLOWED_ORIGINS=https://your-frontend.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## استكشاف الأخطاء السريع

### Build Failed
```bash
# تأكد من:
- build.sh موجود
- requirements.txt صحيح
- runtime.txt صحيح
```

### Database Connection Error
```bash
# تأكد من:
- DATABASE_URL صحيح
- Password صحيح
- Port 6543 (ليس 5432)
```

### Static Files 404
```bash
# في Render Shell:
python manage.py collectstatic --no-input
```

### CORS Error
```bash
# تأكد من:
CORS_ALLOWED_ORIGINS=https://your-frontend.com
# استخدم https:// (ليس http://)
```

---

## الأوامر المفيدة

### في Render Shell

```bash
# Migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --no-input

# Django shell
python manage.py shell

# Database shell
python manage.py dbshell
```

---

## الخطوات التالية

### 1. نشر Frontend
- Vercel (موصى به)
- Netlify
- Render Static Site

### 2. إعداد Cloudinary للصور
راجع [CLOUDINARY-SETUP.md](backend/CLOUDINARY-SETUP.md)

### 3. إضافة Domain مخصص
في Render Settings → Custom Domain

---

## الأدلة الكاملة

- 📚 [DOCS-INDEX.md](DOCS-INDEX.md) - جميع الأدلة
- 🗄️ [SUPABASE-SETUP.md](SUPABASE-SETUP.md) - Supabase تفصيلي
- 🚀 [RENDER-DEPLOYMENT.md](RENDER-DEPLOYMENT.md) - Render تفصيلي
- ⚖️ [SUPABASE-VS-RENDER.md](SUPABASE-VS-RENDER.md) - مقارنة
- ✅ [RENDER-CHECKLIST.md](RENDER-CHECKLIST.md) - قائمة تحقق
- ❓ [FAQ.md](FAQ.md) - أسئلة شائعة

---

## الدعم

واجهت مشكلة؟
1. راجع [FAQ.md](FAQ.md)
2. افحص Logs في Render
3. راجع [SUPABASE-SETUP.md](SUPABASE-SETUP.md)

---

**جاهز للنشر في 10 دقائق! 🚀**
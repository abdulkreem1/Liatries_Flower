# LIATRIES Flower Shop 🌹

موقع احترافي لمحل الورد LIATRIES مبني باستخدام Django و React

## المميزات
- لوحة تحكم للـ superuser لإضافة الورود مع الصور والأسعار
- واجهة عرض احترافية للمستخدمين
- تصميم عصري يناسب محل الورد
- API متكامل مع Django REST Framework
- دعم PostgreSQL مع Docker
- جاهز للنشر على Render.com

## التقنيات المستخدمة
- **Backend**: Django 4.2, Django REST Framework, Gunicorn
- **Frontend**: React
- **Database**: PostgreSQL (SQLite للتطوير)
- **Deployment**: Docker, Render.com
- **Storage**: WhiteNoise (Static Files), Cloudinary (Media Files)

## التثبيت والتشغيل

### خيار 1: التشغيل المحلي السريع

#### Backend (Django)
```bash
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

#### Frontend (React)
```bash
cd frontend
npm install
npm start
```

### خيار 2: التشغيل مع Docker

```bash
# تشغيل PostgreSQL و Django
docker-compose up --build

# في terminal آخر، إنشاء superuser
docker-compose exec web python manage.py createsuperuser
```

## الوصول
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/flowers/
- **Admin Panel**: http://localhost:8000/admin
- **PostgreSQL**: localhost:5432

## النشر على Render

### الملفات الجاهزة للنشر:
- ✅ `backend/requirements.txt` - المكتبات المطلوبة
- ✅ `backend/runtime.txt` - إصدار Python
- ✅ `backend/build.sh` - سكريبت البناء
- ✅ `backend/render.yaml` - إعدادات Render
- ✅ `backend/.env.example` - نموذج المتغيرات

### خطوات النشر:
1. راجع `RENDER-CHECKLIST.md` للتأكد من الجاهزية
2. اتبع التعليمات في `RENDER-DEPLOYMENT.md`
3. للملفات المرفوعة، راجع `backend/CLOUDINARY-SETUP.md`

## الوثائق

📚 **[دليل الوثائق الكامل](DOCS-INDEX.md)** - ابدأ هنا للوصول لجميع الأدلة  
📊 **[حالة المشروع](PROJECT-STATUS.md)** - ملخص الجاهزية والميزات

### أدلة سريعة
- 📖 [دليل التشغيل السريع](backend/QUICK-START.md) - للتطوير المحلي
- 🚀 [دليل النشر على Render](RENDER-DEPLOYMENT.md) - خطوة بخطوة
- ✅ [Checklist قبل النشر](RENDER-CHECKLIST.md) - تحقق من الجاهزية
- 🐳 [دليل Docker](README-Docker.md) - استخدام Docker
- ☁️ [إعداد Cloudinary](backend/CLOUDINARY-SETUP.md) - حفظ الصور
- 💻 [أوامر مفيدة](COMMANDS.md) - مرجع الأوامر
- ⚡ [نصائح الأداء](PERFORMANCE-TIPS.md) - تحسين السرعة
- ❓ [أسئلة شائعة](FAQ.md) - حلول للمشاكل

### قبل النشر
```bash
# Windows
PRE-DEPLOY-CHECK.bat

# Linux/Mac
bash PRE-DEPLOY-CHECK.sh
```

## البنية

```
liatries/
├── backend/
│   ├── flowers/          # تطبيق الورود
│   ├── liatries/         # إعدادات المشروع
│   ├── media/            # الملفات المرفوعة
│   ├── staticfiles/      # الملفات الثابتة
│   ├── requirements.txt  # المكتبات
│   ├── build.sh          # سكريبت البناء
│   ├── gunicorn.conf.py  # إعدادات Gunicorn
│   └── .env.example      # نموذج المتغيرات
├── frontend/
│   ├── src/
│   │   ├── components/   # مكونات React
│   │   └── App.js
│   └── package.json
└── docker-compose.yml    # إعدادات Docker
```

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# Django
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com
CORS_ALLOWED_ORIGINS=https://your-frontend.com

# Cloudinary (اختياري)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## المساهمة
مرحباً بالمساهمات! يرجى فتح Issue أو Pull Request.

## الترخيص
MIT License

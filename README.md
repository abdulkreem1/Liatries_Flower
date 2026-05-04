# LIATRIES Flower Shop 🌹

موقع احترافي لمحل الورد LIATRIES مبني باستخدام Django و React

## المميزات
- لوحة تحكم للـ superuser لإضافة الورود مع الصور والأسعار
- واجهة عرض احترافية للمستخدمين
- تصميم عصري يناسب محل الورد
- API متكامل مع Django REST Framework

## التقنيات المستخدمة
- **Backend**: Django, Django REST Framework
- **Frontend**: React, Tailwind CSS
- **Database**: SQLite (يمكن تغييره لـ PostgreSQL)

## التثبيت والتشغيل

### Backend (Django)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

## الوصول
- Admin Panel: http://localhost:8000/admin
- API: http://localhost:8000/api/
- Frontend: http://localhost:3000

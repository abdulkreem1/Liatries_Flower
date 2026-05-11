# إعداد Cloudinary للملفات المرفوعة

⚠️ **مهم**: Render Free Plan لا يحفظ الملفات المرفوعة بشكل دائم. استخدم Cloudinary لحفظ الصور.

## الخطوات

### 1. إنشاء حساب Cloudinary
- اذهب إلى [cloudinary.com](https://cloudinary.com)
- سجل حساب مجاني (10GB تخزين مجاني)

### 2. تثبيت المكتبات
أضف إلى `requirements.txt`:
```
cloudinary==1.36.0
django-cloudinary-storage==0.3.0
```

### 3. تحديث settings.py

أضف إلى `INSTALLED_APPS`:
```python
INSTALLED_APPS = [
    # ...
    'cloudinary_storage',
    'cloudinary',
    # ...
]
```

أضف في نهاية الملف:
```python
# Cloudinary Configuration
import cloudinary
import cloudinary.uploader
import cloudinary.api

CLOUDINARY_STORAGE = {
    'CLOUD_NAME': config('CLOUDINARY_CLOUD_NAME', default=''),
    'API_KEY': config('CLOUDINARY_API_KEY', default=''),
    'API_SECRET': config('CLOUDINARY_API_SECRET', default=''),
}

# استخدام Cloudinary للملفات المرفوعة
if CLOUDINARY_STORAGE['CLOUD_NAME']:
    DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
```

### 4. إضافة Environment Variables في Render

```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

احصل على هذه القيم من Cloudinary Dashboard.

### 5. اختبار

```python
# في Django shell
from cloudinary.uploader import upload
result = upload("path/to/image.jpg")
print(result['url'])
```

## البدائل الأخرى

### AWS S3
```bash
pip install django-storages boto3
```

### Backblaze B2
```bash
pip install django-storages b2sdk
```

### Render Disk (مدفوع)
- $0.25/GB شهرياً
- يحفظ الملفات بشكل دائم
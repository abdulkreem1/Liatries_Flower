# نصائح تحسين الأداء 🚀

## للتطوير المحلي

### 1. استخدام SQLite للتطوير السريع
```python
# في settings.py للتطوير فقط
if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
```

### 2. تعطيل Debug Toolbar في Production
```python
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
```

### 3. استخدام Django Extensions
```bash
pip install django-extensions
python manage.py show_urls  # عرض جميع URLs
python manage.py shell_plus  # Shell محسن
```

## للإنتاج على Render

### 1. تحسين Gunicorn Workers

```python
# في gunicorn.conf.py
import multiprocessing

# عدد Workers = (2 × CPU cores) + 1
workers = multiprocessing.cpu_count() * 2 + 1

# استخدام threads للـ I/O bound apps
threads = 2
worker_class = "gthread"

# Timeout مناسب
timeout = 120
keepalive = 5
```

### 2. تفعيل Gzip Compression

```python
# في settings.py
MIDDLEWARE = [
    'django.middleware.gzip.GZipMiddleware',  # أضف في البداية
    # ... باقي middleware
]
```

### 3. تحسين Static Files مع WhiteNoise

```python
# في settings.py
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# WhiteNoise settings
WHITENOISE_AUTOREFRESH = not DEBUG
WHITENOISE_USE_FINDERS = DEBUG
WHITENOISE_MAX_AGE = 31536000 if not DEBUG else 0
```

### 4. Database Connection Pooling

```python
# في settings.py
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL'),
        conn_max_age=600,  # 10 دقائق
        conn_health_checks=True,
    )
}
```

### 5. تحسين Queries

```python
# استخدام select_related للـ ForeignKey
flowers = Flower.objects.select_related('category').all()

# استخدام prefetch_related للـ ManyToMany
flowers = Flower.objects.prefetch_related('tags').all()

# استخدام only() لتحديد الحقول
flowers = Flower.objects.only('name', 'price').all()

# استخدام defer() لاستبعاد حقول
flowers = Flower.objects.defer('description').all()
```

### 6. Caching

#### Django Cache Framework
```python
# في settings.py
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake',
    }
}

# في views.py
from django.views.decorators.cache import cache_page

@cache_page(60 * 15)  # 15 دقيقة
def flower_list(request):
    # ...
```

#### Redis Cache (للإنتاج)
```python
# تثبيت
pip install redis django-redis

# في settings.py
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': config('REDIS_URL', default='redis://127.0.0.1:6379/1'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}
```

### 7. Pagination

```python
# في settings.py
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 12,  # عدد مناسب
}
```

### 8. Image Optimization

```python
# في models.py
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile

def save(self, *args, **kwargs):
    if self.image:
        img = Image.open(self.image)
        
        # تحسين الحجم
        if img.height > 1000 or img.width > 1000:
            output_size = (1000, 1000)
            img.thumbnail(output_size, Image.LANCZOS)
        
        # حفظ بجودة محسنة
        output = BytesIO()
        img.save(output, format='JPEG', quality=85, optimize=True)
        output.seek(0)
        
        self.image = InMemoryUploadedFile(
            output, 'ImageField',
            f"{self.image.name.split('.')[0]}.jpg",
            'image/jpeg',
            output.getbuffer().nbytes,
            None
        )
    
    super().save(*args, **kwargs)
```

### 9. Lazy Loading للصور في Frontend

```javascript
// في React
<img 
  src={flower.image} 
  alt={flower.name}
  loading="lazy"  // Lazy loading
/>
```

### 10. CDN للملفات الثابتة

```python
# استخدام Cloudinary CDN
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': config('CLOUDINARY_CLOUD_NAME'),
    'API_KEY': config('CLOUDINARY_API_KEY'),
    'API_SECRET': config('CLOUDINARY_API_SECRET'),
}

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
```

## Database Optimization

### 1. Indexes

```python
# في models.py
class Flower(models.Model):
    name = models.CharField(max_length=100, db_index=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['name', 'price']),
            models.Index(fields=['-created_at']),
        ]
```

### 2. Database Vacuum (PostgreSQL)

```sql
-- من PostgreSQL shell
VACUUM ANALYZE;
```

### 3. Query Optimization

```python
# استخدام exists() بدلاً من count()
if Flower.objects.filter(name='Rose').exists():
    # ...

# استخدام iterator() للـ large querysets
for flower in Flower.objects.iterator():
    # ...

# استخدام bulk_create للإدراج الجماعي
flowers = [
    Flower(name='Rose', price=10),
    Flower(name='Lily', price=15),
]
Flower.objects.bulk_create(flowers)
```

## Frontend Optimization

### 1. Code Splitting

```javascript
// في React
import React, { lazy, Suspense } from 'react';

const FlowerGallery = lazy(() => import('./components/FlowerGallery'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlowerGallery />
    </Suspense>
  );
}
```

### 2. Memoization

```javascript
import React, { memo, useMemo } from 'react';

const FlowerCard = memo(({ flower }) => {
  return <div>{flower.name}</div>;
});

function FlowerList({ flowers }) {
  const sortedFlowers = useMemo(
    () => flowers.sort((a, b) => a.price - b.price),
    [flowers]
  );
  
  return sortedFlowers.map(flower => (
    <FlowerCard key={flower.id} flower={flower} />
  ));
}
```

### 3. Debouncing للبحث

```javascript
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// الاستخدام
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      // API call
    }
  }, [debouncedSearchTerm]);
}
```

## Monitoring

### 1. Django Debug Toolbar (للتطوير)

```bash
pip install django-debug-toolbar

# في settings.py
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
    INTERNAL_IPS = ['127.0.0.1']
```

### 2. Logging

```python
# في settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG' if DEBUG else 'INFO',
            'propagate': False,
        },
    },
}
```

### 3. Performance Monitoring

```python
# في views.py
import time
import logging

logger = logging.getLogger(__name__)

def flower_list(request):
    start_time = time.time()
    
    # ... your code
    
    duration = time.time() - start_time
    logger.info(f"flower_list took {duration:.2f} seconds")
```

## Render Specific

### 1. Keep App Awake (Free Plan)

استخدام Cron Job خارجي:
- [UptimeRobot](https://uptimerobot.com/) - مجاني
- [Cron-job.org](https://cron-job.org/) - مجاني

### 2. Upgrade to Paid Plan

```
Free Plan:
- ينام بعد 15 دقيقة
- 750 ساعة/شهر
- 512MB RAM

Starter Plan ($7/month):
- لا ينام
- غير محدود
- 512MB RAM
```

### 3. Database Optimization

```bash
# من Render Shell
python manage.py dbshell

# تشغيل VACUUM
VACUUM ANALYZE;

# فحص حجم الجداول
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## Checklist للأداء

- [ ] Gunicorn workers محسن
- [ ] Database connection pooling مفعل
- [ ] Static files compression مفعل
- [ ] Images محسنة
- [ ] Caching مفعل
- [ ] Pagination مفعل
- [ ] Database indexes موجودة
- [ ] Queries محسنة (select_related, prefetch_related)
- [ ] Frontend code splitting
- [ ] Lazy loading للصور
- [ ] CDN للملفات (Cloudinary)
- [ ] Logging مفعل
- [ ] Monitoring مفعل

## قياس الأداء

### Backend
```bash
# استخدام Django Debug Toolbar
# أو
pip install django-silk

# قياس API response time
curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:8000/api/flowers/"
```

### Frontend
```javascript
// استخدام Chrome DevTools
// Performance tab
// Lighthouse audit
```

### Database
```sql
-- عرض slow queries
SELECT * FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 10;
```

---

**تطبيق هذه النصائح سيحسن الأداء بشكل ملحوظ! 🚀**
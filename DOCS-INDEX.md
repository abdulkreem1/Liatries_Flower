# 📚 دليل الوثائق

## 🚀 البدء السريع

### للمطورين الجدد
1. **[README.md](README.md)** - ابدأ هنا! نظرة عامة على المشروع
2. **[QUICK-START.md](backend/QUICK-START.md)** - دليل التشغيل السريع للتطوير المحلي
3. **[COMMANDS.md](COMMANDS.md)** - أوامر مفيدة للتطوير اليومي

### للنشر على Render
1. **[DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md)** - ملخص الجاهزية والتغييرات
2. **[RENDER-CHECKLIST.md](RENDER-CHECKLIST.md)** - قائمة تحقق قبل النشر
3. **[RENDER-DEPLOYMENT.md](RENDER-DEPLOYMENT.md)** - دليل النشر الكامل خطوة بخطوة

### للتطوير مع Docker
1. **[README-Docker.md](README-Docker.md)** - دليل استخدام Docker Compose
2. **[docker-compose.yml](docker-compose.yml)** - ملف الإعدادات

## 📖 الأدلة التفصيلية

### الإعداد والتكوين

| الملف | الوصف | متى تستخدمه |
|------|-------|-------------|
| [README.md](README.md) | نظرة عامة على المشروع | أول شيء تقرأه |
| [QUICK-START.md](backend/QUICK-START.md) | دليل البدء السريع | عند بدء التطوير المحلي |
| [backend/.env.example](backend/.env.example) | نموذج متغيرات البيئة | عند إعداد البيئة المحلية |

### النشر والإنتاج

| الملف | الوصف | متى تستخدمه |
|------|-------|-------------|
| [DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md) | ملخص شامل للجاهزية | قبل البدء بالنشر |
| [RENDER-CHECKLIST.md](RENDER-CHECKLIST.md) | قائمة تحقق | قبل النشر مباشرة |
| [RENDER-DEPLOYMENT.md](RENDER-DEPLOYMENT.md) | دليل النشر الكامل | أثناء النشر |
| [PRE-DEPLOY-CHECK.sh](PRE-DEPLOY-CHECK.sh) | سكريبت فحص (Linux/Mac) | قبل Push إلى Git |
| [PRE-DEPLOY-CHECK.bat](PRE-DEPLOY-CHECK.bat) | سكريبت فحص (Windows) | قبل Push إلى Git |

### Docker

| الملف | الوصف | متى تستخدمه |
|------|-------|-------------|
| [README-Docker.md](README-Docker.md) | دليل Docker | عند استخدام Docker |
| [docker-compose.yml](docker-compose.yml) | إعدادات Docker Compose | للتشغيل مع Docker |
| [backend/Dockerfile](backend/Dockerfile) | صورة Docker للـ Backend | للبناء والنشر |

### الملفات المرفوعة والتخزين

| الملف | الوصف | متى تستخدمه |
|------|-------|-------------|
| [SUPABASE-SETUP.md](SUPABASE-SETUP.md) | إعداد Supabase Database | للحصول على قاعدة بيانات مجانية |
| [CLOUDINARY-SETUP.md](backend/CLOUDINARY-SETUP.md) | إعداد Cloudinary | عند الحاجة لحفظ الصور |

### المرجع والأدوات

| الملف | الوصف | متى تستخدمه |
|------|-------|-------------|
| [COMMANDS.md](COMMANDS.md) | أوامر مفيدة | عند الحاجة لأمر معين |
| [FAQ.md](FAQ.md) | أسئلة شائعة | عند مواجهة مشكلة |
| [PERFORMANCE-TIPS.md](PERFORMANCE-TIPS.md) | نصائح تحسين الأداء | لتحسين سرعة التطبيق |
| [backend/test_settings.py](backend/test_settings.py) | اختبار الإعدادات | للتحقق من الإعدادات |

## 🎯 سيناريوهات الاستخدام

### "أريد تشغيل المشروع محلياً"
1. اقرأ [README.md](README.md) - القسم "التثبيت والتشغيل"
2. اتبع [QUICK-START.md](backend/QUICK-START.md)
3. راجع [COMMANDS.md](COMMANDS.md) للأوامر المفيدة

### "أريد استخدام Docker"
1. اقرأ [README-Docker.md](README-Docker.md)
2. شغل `docker-compose up --build`
3. راجع [COMMANDS.md](COMMANDS.md) - قسم Docker

### "أريد نشر المشروع على Render"
1. اقرأ [DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md) - للفهم الشامل
2. أنشئ قاعدة بيانات:
   - **Supabase** (موصى به): اتبع [SUPABASE-SETUP.md](SUPABASE-SETUP.md)
   - **Render PostgreSQL**: اتبع [RENDER-DEPLOYMENT.md](RENDER-DEPLOYMENT.md)
3. راجع [RENDER-CHECKLIST.md](RENDER-CHECKLIST.md) - للتحقق من الجاهزية
4. شغل `PRE-DEPLOY-CHECK.bat` (Windows) أو `bash PRE-DEPLOY-CHECK.sh` (Linux/Mac)
5. اتبع [RENDER-DEPLOYMENT.md](RENDER-DEPLOYMENT.md) خطوة بخطوة

### "أريد إعداد Cloudinary للصور"
1. اقرأ [CLOUDINARY-SETUP.md](backend/CLOUDINARY-SETUP.md)
2. سجل في Cloudinary
3. أضف المتغيرات في Render

### "واجهت مشكلة"
1. راجع [FAQ.md](FAQ.md) - قد تجد الحل
2. افحص Logs (راجع [COMMANDS.md](COMMANDS.md))
3. راجع [RENDER-DEPLOYMENT.md](RENDER-DEPLOYMENT.md) - قسم "استكشاف الأخطاء"

### "أريد أمر معين"
1. افتح [COMMANDS.md](COMMANDS.md)
2. ابحث عن القسم المناسب:
   - التطوير المحلي
   - Docker
   - Git
   - قاعدة البيانات
   - Render
   - إلخ...

## 📂 ملفات الإعداد

### Backend
- `backend/requirements.txt` - المكتبات المطلوبة
- `backend/runtime.txt` - إصدار Python
- `backend/build.sh` - سكريبت البناء لـ Render
- `backend/gunicorn.conf.py` - إعدادات Gunicorn
- `backend/liatries/settings.py` - إعدادات Django
- `backend/.env` - متغيرات البيئة (لا يُرفع إلى Git)
- `backend/.env.example` - نموذج متغيرات البيئة

### Docker
- `docker-compose.yml` - إعدادات Docker Compose
- `backend/Dockerfile` - صورة Docker
- `.dockerignore` - ملفات مستبعدة من Docker

### Git
- `.gitignore` - ملفات مستبعدة من Git
- `.gitattributes` - صلاحيات الملفات

### Render
- `backend/render.yaml` - إعدادات Render (اختياري)

## 🔍 البحث السريع

### أريد معرفة...

**كيف أشغل المشروع؟**
→ [QUICK-START.md](backend/QUICK-START.md)

**كيف أنشر على Render؟**
→ [RENDER-DEPLOYMENT.md](RENDER-DEPLOYMENT.md)

**ما هي المكتبات المثبتة؟**
→ [backend/requirements.txt](backend/requirements.txt) أو [DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md)

**كيف أستخدم Docker؟**
→ [README-Docker.md](README-Docker.md)

**كيف أحفظ الصور؟**
→ [CLOUDINARY-SETUP.md](backend/CLOUDINARY-SETUP.md)

**ما هي Environment Variables المطلوبة؟**
→ [backend/.env.example](backend/.env.example) أو [DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md)

**واجهت خطأ معين؟**
→ [FAQ.md](FAQ.md)

**أريد أمر Git/Docker/Django؟**
→ [COMMANDS.md](COMMANDS.md)

**هل المشروع جاهز للنشر؟**
→ شغل [PRE-DEPLOY-CHECK.bat](PRE-DEPLOY-CHECK.bat) أو [PRE-DEPLOY-CHECK.sh](PRE-DEPLOY-CHECK.sh)

## 💡 نصائح للقراءة

1. **للمبتدئين**: ابدأ بـ [README.md](README.md) ثم [QUICK-START.md](backend/QUICK-START.md)
2. **للنشر**: اقرأ [DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md) أولاً للفهم الشامل
3. **للمشاكل**: [FAQ.md](FAQ.md) يحتوي على حلول للمشاكل الشائعة
4. **للمرجع**: احتفظ بـ [COMMANDS.md](COMMANDS.md) مفتوحاً أثناء العمل

## 📞 الدعم

إذا لم تجد ما تبحث عنه:
1. راجع [FAQ.md](FAQ.md)
2. افحص [COMMANDS.md](COMMANDS.md)
3. راجع [Render Docs](https://render.com/docs)
4. راجع [Django Docs](https://docs.djangoproject.com/)

---

**جميع الوثائق محدثة وجاهزة! 📚✨**
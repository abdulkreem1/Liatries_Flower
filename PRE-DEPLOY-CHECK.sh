#!/bin/bash

# Pre-deployment check script
# يفحص جاهزية المشروع للنشر على Render

echo "🔍 فحص جاهزية المشروع للنشر على Render..."
echo "================================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 موجود"
        return 0
    else
        echo -e "${RED}✗${NC} $1 غير موجود"
        ((ERRORS++))
        return 1
    fi
}

# Function to check content in file
check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $1 يحتوي على $2"
        return 0
    else
        echo -e "${YELLOW}⚠${NC} $1 لا يحتوي على $2"
        ((WARNINGS++))
        return 1
    fi
}

echo ""
echo "📁 فحص الملفات المطلوبة..."
echo "----------------------------"

# Check required files
check_file "backend/requirements.txt"
check_file "backend/runtime.txt"
check_file "backend/build.sh"
check_file "backend/.env.example"
check_file ".gitignore"
check_file ".gitattributes"

echo ""
echo "📦 فحص requirements.txt..."
echo "----------------------------"

# Check required packages
check_content "backend/requirements.txt" "Django"
check_content "backend/requirements.txt" "gunicorn"
check_content "backend/requirements.txt" "psycopg2-binary"
check_content "backend/requirements.txt" "dj-database-url"
check_content "backend/requirements.txt" "whitenoise"
check_content "backend/requirements.txt" "python-decouple"

echo ""
echo "⚙️  فحص settings.py..."
echo "----------------------------"

# Check settings.py
check_content "backend/liatries/settings.py" "dj_database_url"
check_content "backend/liatries/settings.py" "config"
check_content "backend/liatries/settings.py" "RENDER_EXTERNAL_HOSTNAME"
check_content "backend/liatries/settings.py" "WhiteNoiseMiddleware"
check_content "backend/liatries/settings.py" "STATICFILES_STORAGE"

echo ""
echo "🔒 فحص الأمان..."
echo "----------------------------"

# Check security settings
if grep -q "DEBUG = True" "backend/liatries/settings.py" 2>/dev/null; then
    echo -e "${YELLOW}⚠${NC} DEBUG=True في settings.py (تأكد من استخدام environment variable)"
    ((WARNINGS++))
else
    echo -e "${GREEN}✓${NC} DEBUG يستخدم environment variable"
fi

if grep -q "SECRET_KEY = 'django-insecure" "backend/liatries/settings.py" 2>/dev/null; then
    echo -e "${YELLOW}⚠${NC} SECRET_KEY غير آمن (تأكد من استخدام environment variable)"
    ((WARNINGS++))
else
    echo -e "${GREEN}✓${NC} SECRET_KEY يستخدم environment variable"
fi

# Check .gitignore
check_content ".gitignore" ".env"
check_content ".gitignore" "venv/"
check_content ".gitignore" "__pycache__"

echo ""
echo "🐳 فحص Docker..."
echo "----------------------------"

check_file "docker-compose.yml"
check_file "backend/Dockerfile"

echo ""
echo "📚 فحص الوثائق..."
echo "----------------------------"

check_file "README.md"
check_file "RENDER-DEPLOYMENT.md"
check_file "RENDER-CHECKLIST.md"

echo ""
echo "================================================"
echo "📊 ملخص الفحص:"
echo "================================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ المشروع جاهز للنشر!${NC}"
    echo ""
    echo "الخطوات التالية:"
    echo "1. راجع RENDER-CHECKLIST.md"
    echo "2. اتبع التعليمات في RENDER-DEPLOYMENT.md"
    echo "3. git add . && git commit -m 'Ready for deployment'"
    echo "4. git push origin main"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  المشروع جاهز مع بعض التحذيرات (${WARNINGS} تحذير)${NC}"
    echo ""
    echo "راجع التحذيرات أعلاه قبل النشر"
    exit 0
else
    echo -e "${RED}❌ المشروع غير جاهز للنشر (${ERRORS} خطأ، ${WARNINGS} تحذير)${NC}"
    echo ""
    echo "يرجى إصلاح الأخطاء أعلاه قبل النشر"
    exit 1
fi
@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🔍 فحص جاهزية المشروع للنشر على Render...
echo ================================================
echo.

set ERRORS=0
set WARNINGS=0

echo 📁 فحص الملفات المطلوبة...
echo ----------------------------

call :check_file "backend\requirements.txt"
call :check_file "backend\runtime.txt"
call :check_file "backend\build.sh"
call :check_file "backend\.env.example"
call :check_file ".gitignore"
call :check_file ".gitattributes"

echo.
echo 📦 فحص requirements.txt...
echo ----------------------------

call :check_content "backend\requirements.txt" "Django"
call :check_content "backend\requirements.txt" "gunicorn"
call :check_content "backend\requirements.txt" "psycopg2-binary"
call :check_content "backend\requirements.txt" "dj-database-url"
call :check_content "backend\requirements.txt" "whitenoise"
call :check_content "backend\requirements.txt" "python-decouple"

echo.
echo ⚙️  فحص settings.py...
echo ----------------------------

call :check_content "backend\liatries\settings.py" "dj_database_url"
call :check_content "backend\liatries\settings.py" "config"
call :check_content "backend\liatries\settings.py" "RENDER_EXTERNAL_HOSTNAME"
call :check_content "backend\liatries\settings.py" "WhiteNoiseMiddleware"

echo.
echo 🔒 فحص الأمان...
echo ----------------------------

call :check_content ".gitignore" ".env"
call :check_content ".gitignore" "venv/"
call :check_content ".gitignore" "__pycache__"

echo.
echo 🐳 فحص Docker...
echo ----------------------------

call :check_file "docker-compose.yml"
call :check_file "backend\Dockerfile"

echo.
echo 📚 فحص الوثائق...
echo ----------------------------

call :check_file "README.md"
call :check_file "RENDER-DEPLOYMENT.md"
call :check_file "RENDER-CHECKLIST.md"

echo.
echo ================================================
echo 📊 ملخص الفحص:
echo ================================================
echo.

if !ERRORS! EQU 0 if !WARNINGS! EQU 0 (
    echo ✅ المشروع جاهز للنشر!
    echo.
    echo الخطوات التالية:
    echo 1. راجع RENDER-CHECKLIST.md
    echo 2. اتبع التعليمات في RENDER-DEPLOYMENT.md
    echo 3. git add . ^&^& git commit -m "Ready for deployment"
    echo 4. git push origin main
    exit /b 0
) else if !ERRORS! EQU 0 (
    echo ⚠️  المشروع جاهز مع بعض التحذيرات ^(!WARNINGS! تحذير^)
    echo.
    echo راجع التحذيرات أعلاه قبل النشر
    exit /b 0
) else (
    echo ❌ المشروع غير جاهز للنشر ^(!ERRORS! خطأ، !WARNINGS! تحذير^)
    echo.
    echo يرجى إصلاح الأخطاء أعلاه قبل النشر
    exit /b 1
)

:check_file
if exist "%~1" (
    echo ✓ %~1 موجود
    exit /b 0
) else (
    echo ✗ %~1 غير موجود
    set /a ERRORS+=1
    exit /b 1
)

:check_content
findstr /C:"%~2" "%~1" >nul 2>&1
if !errorlevel! EQU 0 (
    echo ✓ %~1 يحتوي على %~2
    exit /b 0
) else (
    echo ⚠ %~1 لا يحتوي على %~2
    set /a WARNINGS+=1
    exit /b 1
)
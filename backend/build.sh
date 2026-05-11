#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# إنشاء superuser تلقائياً (إذا لم يكن موجود)
python create_superuser.py
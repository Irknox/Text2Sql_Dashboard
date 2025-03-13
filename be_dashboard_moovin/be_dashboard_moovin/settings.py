from pathlib import Path
import environ
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Inicializar django-environ
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# Cargar variables de entorno desde el archivo .env
DB_NAME = env('Db_NAME')
DB_HOST = env('Db_HOST')
DB_USER = env('Db_USER')
DB_PASSWORD = env('Db_PASSWORD')
DB_PORT = env('Db_PORT')
SECRET_KEY = env('DJANGO_SECRET_KEY')
AI_API = env('AI_API')
SUPERSET_URL = env('SUPERSET_URL')
SUPERSET_USER = env('SUPERSET_USER')
SUPERSET_PASSWORD = env('SUPERSET_PASSWORD')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'Superset_dashboards',  
    'Text2SQL',
    'Campaing_dashboard',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
# Configuración de CORS
CORS_ALLOW_CREDENTIALS = True  # Permitir credenciales (cookies y autenticación)
CORS_ALLOWED_ORIGINS = ["http://localhost:3000"]  # Permitir solo localhost:3000
CSRF_TRUSTED_ORIGINS = ["http://localhost:3000"]  # Confianza en localhost:3000

# Configuración de CSRF
CSRF_COOKIE_SECURE = False  # Solo en desarrollo, en producción debe ser True
CSRF_COOKIE_HTTPONLY = False  # Permitir acceso desde JavaScript
CSRF_COOKIE_SAMESITE = "Lax"  # O puedes probar con "None" si sigues teniendo problemas
SESSION_COOKIE_SAMESITE = "Lax"

# Todos los Origenes 
# CORS_ALLOW_ALL_ORIGINS = True

ROOT_URLCONF = 'be_dashboard_moovin.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'be_dashboard_moovin.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': DB_NAME,
        'USER': DB_USER,
        'PASSWORD': DB_PASSWORD,
        'HOST': DB_HOST,    
        'PORT': DB_PORT,       
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
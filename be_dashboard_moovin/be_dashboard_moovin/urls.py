from django.contrib import admin
from django.urls import path
from Text2SQL.views import text_to_sql

urlpatterns = [
    path('admin/', admin.site.urls),
    path('text-to-sql/', text_to_sql, name='text_to_sql'),
]
from django.contrib import admin
from django.urls import path
from Text2SQL.views import text_to_sql
from Superset_dashboards.views import get_pie_chart_view
urlpatterns = [
    path('admin/', admin.site.urls),
    path('text-to-sql/', text_to_sql, name='text_to_sql'),
    path("get-pie-chart/", get_pie_chart_view, name="get_pie_chart"),
]
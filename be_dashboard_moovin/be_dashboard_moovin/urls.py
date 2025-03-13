from django.contrib import admin
from django.urls import path
from Text2SQL.views import text_to_sql
from Superset_dashboards import views as superset_views
from Campaing_dashboard import views as campaing_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('text-to-sql/', text_to_sql, name='text_to_sql'),
    path("get-province-distribution/", superset_views.get_province_distribution_view, name="get_pie_chart"),
    path('generate-chart/', superset_views.generate_chart, name='generate_chart'),
    path('data_usage_os_version/', campaing_views.data_usage_by_version_view, name='data_usage_os_version'),
]
from django.contrib import admin
from django.urls import path
from Text2SQL.views import text_to_sql
from Superset_dashboards import views as superset_views
from Campaing_dashboard import views as campaing_views
from PDV_dashboard import views as pdv_views
from VTR_dashboard import views as vtr_views
from AC_dashboard import views as ac_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('text-to-sql/', text_to_sql, name='text_to_sql'),
    path("get-province-distribution/", superset_views.get_province_distribution_view, name="get_pie_chart"),
    path('generate-chart/', superset_views.generate_chart, name='generate_chart'),
    path('data_usage_os_version/', campaing_views.data_usage_by_version_view, name='data_usage_os_version'),
    path('balance_available/', pdv_views.balance_available_view, name='balance_available'),
    path('current_sales/', pdv_views.sales_current_month, name='sales_current_month'),
    path('sales_variation/', pdv_views.sales_variaton_porcentage, name='sales_variation'),
    path('sales_per_week/', pdv_views.sales_per_week, name='sales_per_day'),
    path('sales_data/', pdv_views.sales_last_six_months, name='sales_data'),
    path('VTR_card_data/', vtr_views.VTR_cards_data, name='VTR_cards_data'),
    path('VTR_province_sales/', vtr_views.VTR_province_sales, name='VTR_province_sales'),
    path('VTR_province_sims_data/', vtr_views.VTR_province_sims_data, name='VTR_province_sims_data'),
    path('VTR_prevision_recargas/', vtr_views.VTR_prevision_recargas, name='VTR_prevision_recargas'),
    path('VTR_prevision_SIMS/', vtr_views.VTR_prevision_SIMS, name='VTR_prevision_SIMS'),
    path('VTR_sales_by_hour/', vtr_views.VTR_sales_by_hour, name='VTR_sales_by_hour'),
    path('VTR_recarga_by_hour/', vtr_views.VTR_recarga_by_hour, name='VTR_recarga_by_hour'),
    path('VTR_sims_by_hour/', vtr_views.VTR_sims_by_hour, name='VTR_sims_by_hour'),
    path('AC_prepay_active_24h/', ac_views.AC_prepay_active_users_24h, name='AC_prepay_active_24h'),
    path('AC_postpay_active_24h/', ac_views.AC_postpay_active_users_24h, name='AC_postpay_active_users_24h'),
    path('AC_postpay_active_weekly/', ac_views.AC_postpay_active_users_weekly, name='AC_postpay_active_users_weekly'),
    path('AC_prepay_active_weekly/', ac_views.AC_prepay_active_users_weekly, name='AC_prepay_active_users_weekly'),
    path('AC_province_prepay_active_weekly/', ac_views.AC_province_prepay_active_users_weekly, name='AC_province_prepay_active_users_weekly'),
    path('AC_province_postpay_active_weekly/', ac_views.AC_province_postpay_active_users_weekly, name='AC_province_postpay_active_users_weekly'),
]


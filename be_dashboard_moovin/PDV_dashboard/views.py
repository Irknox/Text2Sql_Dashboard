from django.shortcuts import render
from django.http import JsonResponse
from .services.PDV_services import get_balance_available,get_current_sales,get_sales_same_date_last_month,format_sales_for_chart,get_sales_by_week

def balance_available_view(request):
    if request.method == 'GET':
        try:
            data = get_balance_available(112)
            return JsonResponse(data, safe=False)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
    
def sales_current_month(request):
    if request.method=='GET':
        try:
            data = get_current_sales(112)
            return JsonResponse(data, safe=False)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
    
def sales_variaton_porcentage(request):
    if request.method=="GET":
        try:
            current_sales = get_current_sales(112)
            sales_last_month=get_sales_same_date_last_month(112)
            if sales_last_month and sales_last_month != 0:
                variation_percentage = ((current_sales - sales_last_month) / sales_last_month) * 100
            else:
                variation_percentage = 0  # Si no hay ventas el mes pasado, asumimos 0% de cambio
            
            return JsonResponse(variation_percentage, safe=False)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
def sales_per_day(request):
    if request.method=="GET":
        try:
            sales_by_day=get_sales_by_week(112)
            data_formatted = format_sales_for_chart(sales_by_day)
            return JsonResponse(data_formatted, safe=False)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
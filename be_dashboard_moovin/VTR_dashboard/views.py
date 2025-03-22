import json
from django.http import JsonResponse
from .services.VTR_services import get_category,get_sales_current_month,get_sales_last_month,get_sales_per_hour

def VTR_cards_data(request):
    if request.method == 'GET':
        try:
            recargas_hoy = get_category("recargas_por_producto_dia")
            sims_activadas_vendidas = get_category("sims_activadas_y_vendidas")

            response = {
                "recargas_por_producto_dia": json.loads(recargas_hoy.content)["recargas_por_producto_dia"],
                "sims_activadas_y_vendidas": json.loads(sims_activadas_vendidas.content)["sims_activadas_y_vendidas"]
            }

            return JsonResponse(response) 
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

def VTR_province_sales(request):
    if request.method == 'GET':
        try:
            response = get_category("ventas_por_provincia")
            return response
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
def VTR_province_sims_data(request):
    if request.method == 'GET':
        try:
            response = get_category("ventas_sims_provincia")
            return response
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

def VTR_prevision_recargas(request):
    if request.method == 'GET':
        try:
            response = get_category("prevision_recargas")
            return response

           ## response_current_month = get_sales_current_month()
           ## sales_last_month = get_sales_last_month()

           ## current_month_sales = next(item for item in response_current_month if item["Mes"] == 1)  # Este mes
           ## last_month_sales = next(item for item in response_current_month if item["Mes"] == 12)  # Mes pasado

            # Calcular la variación de ventas
           ## if last_month_sales['Monto'] != 0:  
           ##     sales_variation_percentage = ((current_month_sales['Monto'] - last_month_sales['Monto']) / last_month_sales['Monto']) * 100
           ##     sales_variation_percentage = round(sales_variation_percentage, 2)  
           ## else:
           ##     sales_variation_percentage = None  # Si el monto del mes pasado es 0, la variación no es válida

           ## result = {
           ##     "monto_mes_pasado": last_month_sales['Monto'],
           ##     "monto_mes_actual": current_month_sales['Monto'],
           ##     "variacion": sales_variation_percentage
           ## }
            
           ## return JsonResponse(result, safe=False) 
            response= get_category("prevision_recargas");
            return response
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405) 



def VTR_prevision_SIMS(request):
    if request.method == 'GET':
        try:
            response = get_category("prevision_sims")
            return response
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
def VTR_sales_by_hour(request):
    if request.method == 'GET':
        try:
            response = get_sales_per_hour()
            return JsonResponse(response, safe=False)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
def VTR_recarga_by_hour(request):
    if request.method == 'GET':
        try:
            response = get_category("ventas_recargas_por_hora")
            return response
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
    
def VTR_sims_by_hour(request):
    if request.method == 'GET':
        try:
            response = get_category("ventas_sims_por_hora")
            return response
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
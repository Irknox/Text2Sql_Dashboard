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
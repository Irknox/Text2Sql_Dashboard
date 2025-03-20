import json
from django.http import JsonResponse
from .services.VTR_services import get_category

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

import json
from django.http import JsonResponse
from .services.AC_services import get_category


def AC_prepay_active_users_24h(request):
    if request.method == 'GET':
        try:
            response = get_category("activos_prepago")
            return response
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
    
def AC_postpay_active_users_24h(request):
    if request.method == 'GET':
        try:
            response = get_category("activos_postpago")
            return response
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
def AC_postpay_active_users_weekly(request):
    if request.method == 'GET':
        try:
            response = get_category("postpago_activos_por_semana")
            return response
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
def AC_prepay_active_users_weekly(request):
    if request.method == 'GET':
        try:
            response = get_category("prepago_activos_por_semana")
            return response
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
def AC_province_postpay_active_users_weekly(request):
    if request.method == 'GET':
        try:
            response = get_category("postpago_activos_semanal_provincia")
            return response
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)


def AC_province_prepay_active_users_weekly(request):
    if request.method == 'GET':
        try:
            response = get_category("prepago_activos_semanal_provincia")
            return response
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
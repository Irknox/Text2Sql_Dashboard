import json
from django.http import JsonResponse

def get_category(recargas_por_producto):
    with open("db.json", "r", encoding="utf-8") as file:
        data = json.load(file)

    if recargas_por_producto in data:
        return JsonResponse({recargas_por_producto: data[recargas_por_producto]})
    else:
        return JsonResponse({"error": "Categoría no encontrada"}, status=404)

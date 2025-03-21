import json
from django.conf import settings
from django.http import JsonResponse
import mysql.connector

def get_category(endpoint):
    with open("db.json", "r", encoding="utf-8") as file:
        data = json.load(file)

    if endpoint in data:
        return JsonResponse({endpoint: data[endpoint]})
    else:
        return JsonResponse({"error": "Categoría no encontrada"}, status=404)
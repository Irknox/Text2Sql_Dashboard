from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.conf import settings
from .services.superset_service import  make_superset_request
from .services.superset_service import get_province_distribution_chart

import logging
logger = logging.getLogger(__name__)



@csrf_exempt
@require_POST
def get_province_distribution_view(request):
    try:
        data = json.loads(request.body)
        dataset_id = data.get("dataset_id", 25) 
        logger.info(f"📩 Recibiendo petición para gráfico de distribución de provincias con dataset_id: {dataset_id}")
        
        chart_data = get_province_distribution_chart(dataset_id)
        
        response = JsonResponse(chart_data, safe=False)
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"  # Permitir frontend
        response["Access-Control-Allow-Credentials"] = "true"  # Permitir cookies
        return response

    except Exception as e:
        logger.error(f"❌ Error en get_province_distribution_view: {str(e)}", exc_info=True)
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
@require_POST
def generate_chart(request):
    try:
        data = json.loads(request.body)  
        
        logger.info(f"📩 Datos recibidos en generate_chart: {data}")

        api_data = {
            "viz_type": data.get("chart_type", "pie"),  # Tipo de gráfico por defecto: Pie Chart
            "datasource": {"id": data.get("dataset_id", 25), "type": "dataset"},
            "adhoc_filters": [
                {"col": "age", "op": "GT", "value": 20} if data.get("age_filter") == ">20"
                else {"col": "age", "op": "LT", "value": 20},
            ],
            "groupby": [data.get("x_axis", "provincia")],  # Agrupar por provincia por defecto
            "metrics": ["count"],  # Métrica de conteo
        }

        logger.info(f"📊 Enviando datos a Superset: {api_data}")

        chart_data = make_superset_request(f"{settings.SUPERSET_URL}/api/v1/chart/data/", data=api_data, method="POST")

        logger.info("✅ Respuesta de Superset recibida")

        response = JsonResponse(chart_data)
        response["Access-Control-Allow-Origin"] = "http://localhost:3000"  # Permitir frontend
        response["Access-Control-Allow-Credentials"] = "true"  # Permitir cookies
        return response

    except json.JSONDecodeError:
        error_msg = "❌ Error: JSON mal formado en la petición"
        logger.error(error_msg, exc_info=True)
        return JsonResponse({"error": error_msg}, status=400)

    except KeyError as e:
        error_msg = f"❌ Falta un campo obligatorio en el JSON: {str(e)}"
        logger.error(error_msg, exc_info=True)
        return JsonResponse({"error": error_msg}, status=400)

    except Exception as e:
        logger.error(f"❌ Error en generate_chart: {str(e)}", exc_info=True)
        return JsonResponse({"error": str(e)}, status=500)

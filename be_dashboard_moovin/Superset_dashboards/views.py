from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .services.superset_service import get_superset_pie_chart

@csrf_exempt
def get_pie_chart_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            dataset_id = data.get("dataset_id", 25)  # Ajusta según tu dataset
            
            chart_data = get_superset_pie_chart(dataset_id)
            return JsonResponse(chart_data, safe=False)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)

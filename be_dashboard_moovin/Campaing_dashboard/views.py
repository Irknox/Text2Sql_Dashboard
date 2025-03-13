from django.http import JsonResponse
from .services.data_usage_os_version_service import get_data_usage_by_version_and_contract

def data_usage_by_version_view(request):
    if request.method == 'GET':
        try:
            data = get_data_usage_by_version_and_contract()
            formatted_data = format_data_for_echarts(data)
            return JsonResponse(formatted_data, safe=False)
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)

def format_data_for_echarts(data):
    os_versions = list(set(item['os_version'] for item in data))
    contract_types = list(set(item['contract_type'] for item in data))

    series = []
    for contract_type in contract_types:
        series_data = []
        for os_version in os_versions:
            usage = next((item['total_data_usage'] for item in data if item['os_version'] == os_version and item['contract_type'] == contract_type), 0)
            series_data.append(int(usage)) 
        series.append({
            "name": contract_type,
            "type": "bar",
            "data": series_data
        })

    return {
        "title": {"text": "Uso de Datos por Versión de OS y Tipo de Contrato"},
        "tooltip": {"trigger": "axis", "axisPointer": {"type": "shadow"}},
        "legend": {"data": contract_types},
        "grid": {"left": "3%", "right": "4%", "bottom": "3%", "containLabel": True},
        "xAxis": {"type": "value", "boundaryGap": [0, 0.01]},
        "yAxis": {"type": "category", "data": os_versions},
        "series": series
    }
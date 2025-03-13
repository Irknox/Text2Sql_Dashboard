import requests
from django.conf import settings

# Función para obtener el token de Superset
def get_superset_token():
    auth_url = f"{settings.SUPERSET_URL}/api/v1/security/login"
    auth_payload = {
        "username": settings.SUPERSET_USER,
        "password": settings.SUPERSET_PASSWORD,
        "provider": "db"
    }
    response = requests.post(auth_url, json=auth_payload)
    
    if response.status_code == 200:
        return response.json()["access_token"]
    
    raise Exception("Error obteniendo token de Superset")

# Función para obtener datos de un dataset en Superset
def get_superset_chart_data(dataset_id, metric, date_range):
    token = get_superset_token()
    
    headers = {"Authorization": f"Bearer {token}"}
    url = f"{settings.SUPERSET_URL}/api/v1/chart/data"
    
    payload = {
        "datasource": {"id": dataset_id, "type": "table"},
        "queries": [{
            "metrics": [metric],
            "filters": [{"col": "fecha", "op": "TEMPORAL_RANGE", "val": date_range}],
        }]
    }

    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        return response.json()

    raise Exception(f"Error obteniendo datos de Superset: {response.text}")


def get_superset_pie_chart(dataset_id):
    """Obtiene datos de Superset para un gráfico de tarta filtrado por edad > 20"""
    
    token = get_superset_token()
    headers = {"Authorization": f"Bearer {token}"}
    url = f"{settings.SUPERSET_URL}/api/v1/chart/data"
    
    payload = {
        "datasource": {"id": dataset_id, "type": "table"},
        "queries": [{
            "groupby": ["provincia"],  # Agrupamos por provincia
            "metrics": ["count"],  # Contamos registros
            "filters": [{"col": "age", "op": ">", "val": 20}],  # Filtramos age > 20
        }]
    }

    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        return response.json()

    raise Exception(f"Error obteniendo datos de Superset: {response.text}")
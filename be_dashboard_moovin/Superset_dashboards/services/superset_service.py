import requests
from django.conf import settings

#Generar el token de superset
def get_superset_token():
    auth_url = f"{settings.SUPERSET_URL}/api/v1/security/login"
    auth_payload = {
        "username": settings.SUPERSET_USER,
        "password": settings.SUPERSET_PASSWORD,
        "provider": "db"
    }
    response = requests.post(auth_url, json=auth_payload)
    
    if response.status_code == 200:
        return response.json().get("access_token") 

    raise Exception(f"Error obteniendo token de Superset: {response.text}")

def make_superset_request(endpoint, data=None, method="GET"):
    token = get_superset_token()  

    headers = {
        "Authorization": f"Bearer {token}",
    }

    if method == "POST":
        response = requests.post(endpoint, headers=headers, json=data)
    else:
        response = requests.get(endpoint, headers=headers, params=data)

    if response.status_code == 200:
        return response.json()  
    else:
        raise Exception(f"Error al hacer la solicitud a Superset: {response.status_code} - {response.text}")



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


def get_province_distribution_chart(dataset_id):    
    token = get_superset_token()
    headers = {"Authorization": f"Bearer {token}"}
    url = f"{settings.SUPERSET_URL}/api/v1/chart/data"
    
    payload = {
        "datasource": {"id": dataset_id, "type": "table"},
        "queries": [{
            "groupby": ["provincia"], 
            "metrics": ["count"], 
            "filters": [{"col": "age", "op": ">", "val": 20}], 
        }]
    }

    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code == 200:
        return response.json()

    raise Exception(f"Error obteniendo datos de Superset: {response.text}")
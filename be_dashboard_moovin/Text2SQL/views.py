from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import openai
from django.conf import settings
from django.db import connection
import os

openai.api_key = settings.AI_API

@csrf_exempt
def text_to_sql(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        text = data.get('text', '')

         # Cargar el prompt desde el archivo .env
        sql_prompt = os.getenv('SQL_PROMPT') + f" Solicitud: {text}"
        charts_prompt = os.getenv('CHARTS_PROMPT') + f" Consulta: {text}"+ f" Atributos: {text}"

        # Solicitud al modelo de OpenAI para convertir texto natural a SQL
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": sql_prompt}
            ],
            max_tokens=150
        )

        sql_query = response['choices'][0]['message']['content']

        # Ejecutar la consulta SQL en la base de datos
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            columns = [col[0] for col in cursor.description]
            results = [dict(zip(columns, row)) for row in cursor.fetchall()]

        if results:
            attributes = results[0].keys()
            print("Atributos del primer objeto:", attributes)
        else:
            print("El array results está vacío")
            
            
        charts_prompt = os.getenv('CHARTS_PROMPT') + f" Consulta: {text}"+ f" Atributos: {attributes}"
        
        # Solicitud al modelo de OpenAI para obtener el apartado Options para echarts
        charts_response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": charts_prompt}
            ],
            max_tokens=250
        )
        
        charts_options = charts_response['choices'][0]['message']['content']
        return JsonResponse({'sql_query': sql_query, 'results': results , 'charts_options': charts_options}, status=200)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
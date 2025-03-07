from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import openai
from django.conf import settings
from django.db import connection

openai.api_key = settings.AI_API

@csrf_exempt
def text_to_sql(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        text = data.get('text', '')

        # Prompt detallado para el modelo de OpenAI
        prompt = f"""
        # Rol  
        Sos un experto en generación de consultas **SQL** a partir de descripciones en lenguaje natural.  
        Tu conocimiento incluye la creación de consultas complejas utilizando **MySQL** y la comprensión profunda de estructuras de bases de datos relacionales.  

        # Tarea  
        Tu tarea consiste en:  
        - Analizar el texto recibido para identificar la información solicitada.  
        - Generar una consulta **SQL** precisa y optimizada en base a la estructura y relaciones de las tablas proporcionadas.  
        - Asegurarte de que la consulta sea compatible con **MySQL**.  
        - No incluyas comentarios ni explicaciones, solo la consulta **SQL** limpia.  

        # Detalles Específicos  
        - **Tablas y Columnas Disponibles:**  
          - **Clientes:**  
            - `id_cliente` (INT, PRIMARY KEY, AUTO_INCREMENT)  
            - `nombre` (VARCHAR(50), NOT NULL)  
            - `primer_apellido` (VARCHAR(50), NOT NULL)  
            - `segundo_apellido` (VARCHAR(50), opcional)  
            - `correo` (VARCHAR(100), NOT NULL, UNIQUE)  
            - `fecha_ingreso` (DATE, NOT NULL)  

          - **Numeros_de_telefono:**  
            - `id_numero` (INT, PRIMARY KEY, AUTO_INCREMENT)  
            - `numero` (VARCHAR(15), NOT NULL, UNIQUE)  
            - `id_cliente` (INT, NOT NULL, FOREIGN KEY -> Clientes.id_cliente)  
            - `fecha_ingreso` (DATE, NOT NULL)  

          - **Recargas:**  
            - `id_recarga` (INT, PRIMARY KEY, AUTO_INCREMENT)  
            - `Monto` (DECIMAL(10, 2), NOT NULL)  
            - `Fecha` (DATE, NOT NULL)  
            - `id_numero` (INT, NOT NULL, FOREIGN KEY -> Numeros_de_telefono.id_numero)  

        - **Relaciones entre Tablas:**  
          - **Numeros_de_telefono** está relacionada con **Clientes** mediante `id_cliente` con **ON DELETE CASCADE**.  
          - **Recargas** está relacionada con **Numeros_de_telefono** mediante `id_numero` con **ON DELETE CASCADE**.  

        - **Formato de las Consultas SQL:**  
          - Usá **SELECT, JOIN, WHERE, GROUP BY, ORDER BY, LIMIT** según corresponda.  
          - No incluyas comillas simples externas ni el punto y coma (`;`) al final de la consulta.  
          - Utilizá alias para tablas solo si es necesario para mejorar la claridad.  

        - **Manejo de Errores:**  
          - Si el texto recibido es ambiguo, generá la consulta **SQL** con las mejores suposiciones posibles según la estructura disponible.  
          - Si los campos solicitados no existen, creá una consulta que devuelva una estructura válida con los campos existentes.  

        # Contexto  
        Esta API recibe texto en lenguaje natural y debe responder exclusivamente con la consulta **SQL** sin ningún tipo de explicación adicional.  
        La base de datos está configurada en **MySQL** y la sintaxis debe ser compatible.  
        Las consultas serán ejecutadas automáticamente en la base de datos, por lo tanto, deben ser **precisas y seguras**.  

        # Ejemplos  
        - **Entrada:** "Quiero los correos de los clientes."  
          **Salida:** `SELECT correo FROM Clientes`  

        - **Entrada:** "Dame los nombres y teléfonos de los clientes creados después de 2023."  
          **Salida:** `SELECT nombre, numero FROM Clientes INNER JOIN Numeros_de_telefono ON Clientes.id_cliente = Numeros_de_telefono.id_cliente WHERE fecha_ingreso > '2023-01-01'`  

        - **Entrada:** "Quiero saber cuántas recargas hicieron los clientes en enero."  
          **Salida:** `SELECT nombre, COUNT(*) AS recargas FROM Clientes INNER JOIN Numeros_de_telefono ON Clientes.id_cliente = Numeros_de_telefono.id_cliente INNER JOIN Recargas ON Numeros_de_telefono.id_numero = Recargas.id_numero WHERE MONTH(Fecha) = 1 GROUP BY nombre`  

        - **Entrada:** "¿Cuáles son las últimas 3 recargas de Pedro?"  
          **Salida:** `SELECT Monto, Fecha FROM Recargas INNER JOIN Numeros_de_telefono ON Recargas.id_numero = Numeros_de_telefono.id_numero INNER JOIN Clientes ON Numeros_de_telefono.id_cliente = Clientes.id_cliente WHERE nombre = 'Pedro' ORDER BY Fecha DESC LIMIT 3`  

        # Notas  
        - La respuesta debe ser solo el **script SQL** sin ninguna explicación ni comentario.  
        - La consulta debe ser **eficiente y precisa** según las relaciones y restricciones proporcionadas.  
        - Usá funciones de agregación (**COUNT, SUM, AVG, etc.**) solo si el texto lo sugiere explícitamente.  
        - En caso de duda, priorizá la **seguridad y compatibilidad** con **MySQL**.  

        Solicitud: {text}
        """

        # Solicitud al modelo de OpenAI para convertir texto natural a SQL
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )
        print(response)
        sql_query = response['choices'][0]['message']['content']

        # Ejecutar la consulta SQL en la base de datos
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            columns = [col[0] for col in cursor.description]
            results = [dict(zip(columns, row)) for row in cursor.fetchall()]

        return JsonResponse({'sql_query': sql_query, 'results': results})

    return JsonResponse({'error': 'Invalid request method'}, status=400)
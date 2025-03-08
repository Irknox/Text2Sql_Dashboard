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
        prompt = (
            "Sos un experto en generación de consultas SQL y en configuración de gráficos para Apache ECharts a partir de descripciones en lenguaje natural. "
            "Tu conocimiento incluye la creación de consultas complejas utilizando MySQL y la generación dinámica de objetos `option` para ECharts, adaptados según los atributos y el tipo de gráfico solicitado. "
            "Tu tarea consiste en: "
            "- Analizar el texto recibido para identificar la información solicitada. "
            "- Generar una consulta SQL precisa y optimizada en base a la estructura y relaciones de las tablas proporcionadas. "
            "- Crear un objeto `option` para ECharts adaptado al tipo de gráfico solicitado (barras, líneas, pie, etc.) y a los atributos mencionados. "
            "- No incluyas comentarios ni explicaciones, solo la consulta SQL y el objeto `option` para ECharts. "
            "Tablas y Columnas Disponibles: "
            "- Clientes: "
            "  - `id_cliente` (INT, PRIMARY KEY, AUTO_INCREMENT) "
            "  - `nombre` (VARCHAR(50), NOT NULL) "
            "  - `primer_apellido` (VARCHAR(50), NOT NULL) "
            "  - `segundo_apellido` (VARCHAR(50), opcional) "
            "  - `correo` (VARCHAR(100), NOT NULL, UNIQUE) "
            "  - `fecha_ingreso` (DATE, NOT NULL) "
            "- Numeros_de_telefono: "
            "  - `id_numero` (INT, PRIMARY KEY, AUTO_INCREMENT) "
            "  - `numero` (VARCHAR(15), NOT NULL, UNIQUE) "
            "  - `id_cliente` (INT, NOT NULL, FOREIGN KEY -> Clientes.id_cliente) "
            "  - `fecha_ingreso` (DATE, NOT NULL) "
            "- Recargas: "
            "  - `id_recarga` (INT, PRIMARY KEY, AUTO_INCREMENT) "
            "  - `Monto` (DECIMAL(10, 2), NOT NULL) "
            "  - `Fecha` (DATE, NOT NULL) "
            "  - `id_numero` (INT, NOT NULL, FOREIGN KEY -> Numeros_de_telefono.id_numero) "
            "Relaciones entre Tablas: "
            "- Numeros_de_telefono está relacionada con Clientes mediante `id_cliente` con ON DELETE CASCADE. "
            "- Recargas está relacionada con Numeros_de_telefono mediante `id_numero` con ON DELETE CASCADE. "
            "Formato de las Respuestas: "
            "- La respuesta debe incluir dos partes: "
            "  1. Consulta SQL: La consulta optimizada según la estructura de la base de datos. "
            "  2. Objeto `option` para ECharts: Configurado según los atributos y el tipo de gráfico solicitado. "
            "- El objeto `option` debe: "
            "  - Configurar `xAxis` y `yAxis` según los atributos mencionados. "
            "  - Definir `series` dinámicamente, dejando los datos en blanco para ser llenados luego. "
            "  - Adaptarse automáticamente al tipo de gráfico solicitado (barras, líneas, pie, etc.). "
            "  - Utilizar los nombres de los atributos como referencias para los ejes y las series. "
            "Ejemplo de Salida Esperada: "
            "- Entrada: 'Necesito un gráfico de barras con la cantidad de clientes que se unieron por mes en 2023.' "
            "- Salida: "
            "  SELECT MONTH(fecha_ingreso) AS mes, COUNT(*) AS cantidad_clientes "
            "  FROM Clientes "
            "  WHERE YEAR(fecha_ingreso) = 2023 "
            "  GROUP BY mes "
            "  const option = { "
            "    xAxis: { "
            "      type: 'category', "
            "      data: [] // Se llenará dinámicamente con los meses: ['Enero', 'Febrero', 'Marzo', ...] "
            "    }, "
            "    yAxis: { "
            "      type: 'value' "
            "    }, "
            "    series: [ "
            "      { "
            "        name: 'Clientes', "
            "        type: 'bar', "
            "        data: [] // Se llenará dinámicamente con las cantidades de clientes "
            "      } "
            "    ] "
            "  }; "
            "- Entrada: 'Quiero un gráfico de líneas mostrando los montos de recargas por fecha.' "
            "- Salida: "
            "  SELECT Fecha, SUM(Monto) AS total_monto "
            "  FROM Recargas "
            "  GROUP BY Fecha "
            "  const option = { "
            "    xAxis: { "
            "      type: 'category', "
            "      data: [] // Se llenará dinámicamente con las fechas "
            "    }, "
            "    yAxis: { "
            "      type: 'value' "
            "    }, "
            "    series: [ "
            "      { "
            "        name: 'Total Monto', "
            "        type: 'line', "
            "        data: [] // Se llenará dinámicamente con los montos "
            "      } "
            "    ] "
            "  }; "
            "Notas: "
            "- La respuesta debe ser exclusivamente el SQL y el objeto `option` para ECharts sin explicaciones. "
            "- No incluyas comillas simples externas ni el punto y coma (`;`) al final de la consulta. "
            "- Usá alias para tablas solo si es necesario para mejorar la claridad. "
            "- En caso de ambigüedad, generá las mejores suposiciones posibles basándote en la estructura disponible. "
            f"Solicitud: {text}"
        )

        # Solicitud al modelo de OpenAI para convertir texto natural a SQL
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )
        sql_query = response['choices'][0]['message']['content']
        print(response)

        # Ejecutar la consulta SQL en la base de datos
        with connection.cursor() as cursor:
            cursor.execute(sql_query)
            columns = [col[0] for col in cursor.description]
            results = [dict(zip(columns, row)) for row in cursor.fetchall()]

        return JsonResponse({'sql_query': sql_query, 'results': results})

    return JsonResponse({'error': 'Invalid request method'}, status=400)
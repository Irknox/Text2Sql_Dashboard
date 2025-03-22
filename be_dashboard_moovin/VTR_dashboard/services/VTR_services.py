import json
from django.conf import settings
from django.http import JsonResponse
import mysql.connector

def get_category(recargas_por_producto):
    with open("db.json", "r", encoding="utf-8") as file:
        data = json.load(file)

    if recargas_por_producto in data:
        return JsonResponse({recargas_por_producto: data[recargas_por_producto]})
    else:
        return JsonResponse({"error": "Categoría no encontrada"}, status=404)


def get_sales_current_month():
    try:
        connection = mysql.connector.connect(
            host=settings.DB_HOST,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database=settings.DB_NAME
        )
        
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT YEAR(fecha) AS Año,
                MONTH(fecha) AS Mes,
                SUM(monto) AS Monto
                FROM botacora_cliente_final
                WHERE (fecha BETWEEN '2023-12-01' AND '2023-12-09') 
                OR (fecha BETWEEN '2024-01-01' AND '2024-01-09')
                GROUP BY Año, Mes
                ORDER BY Año, Mes; """
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        connection.close()
        return result
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        raise
    
def get_sales_last_month():
    try:
        connection = mysql.connector.connect(
            host=settings.DB_HOST,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database=settings.DB_NAME
        )
        
        cursor = connection.cursor(dictionary=True)
        query = """SELECT anio_venta AS Año, mes_venta as Mes ,sum(total_ventas) as Monto 
        FROM tcf.resumen_ventas
        WHERE anio_venta=2023 and mes_venta=12; """
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        connection.close()
        return result
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        raise

    
def get_sales_per_hour():
    try:
        connection = mysql.connector.connect(
            host=settings.DB_HOST,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database=settings.DB_NAME
        )
        
        cursor = connection.cursor(dictionary=True)
        query = """SELECT 
            HOUR(fecha) AS hora,
            SUM(monto) AS Ventas
            FROM 
            botacora_cliente_final
            WHERE 
            fecha BETWEEN '2024-01-09 04:00:00' AND '2024-01-10 00:00:00'
            GROUP BY 
            HOUR(fecha)
            ORDER BY 
            hora;
            """
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        connection.close()
        return result
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        raise

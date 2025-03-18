import mysql.connector
from django.conf import settings
from datetime import datetime, timedelta


def get_balance_available(id_Cliente):
    try:
        #Parsear id para que se adapte a la consulta
        id_Cliente = str(id_Cliente)

        connection = mysql.connector.connect(
            host=settings.DB_HOST,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database=settings.DB_NAME
        )
        
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT Monto FROM control_saldo WHERE id_Cliente = %s;
        """
        # Usa parámetros seguros para evitar inyección SQL
        cursor.execute(query, (id_Cliente,))
        result = cursor.fetchall()
        cursor.close()
        connection.close()
        return result
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        raise

def get_current_sales(id_Cliente):
    try:
        id_Cliente = str(id_Cliente)

        connection = mysql.connector.connect(
            host=settings.DB_HOST,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database=settings.DB_NAME
        )
        
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT SUM(monto) AS total_monto
            FROM botacora_cliente_final
            WHERE id_Cliente = %s
            AND MONTH(fecha) = 2
            AND YEAR(fecha) = 2024;
        """
        
        cursor.execute(query, (id_Cliente,))
        result = cursor.fetchone()  
        cursor.close()
        connection.close()

        return result["total_monto"] if result["total_monto"] is not None else 0

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        raise
    # Usar para obtener la del último mes actual: SELECT SUM(monto) AS total_monto FROM botacora_cliente_final WHERE id_Cliente = %s AND MONTH(fecha) = MONTH(CURDATE()) AND YEAR(fecha) = YEAR(CURDATE());

def get_sales_same_date_last_month(id_Cliente):
    try:
        id_Cliente = str(id_Cliente)

        connection = mysql.connector.connect(
            host=settings.DB_HOST,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database=settings.DB_NAME
        )
        
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT SUM(monto) AS total_monto
            FROM botacora_cliente_final
            WHERE id_Cliente = %s
            AND MONTH(fecha) = 1
            AND YEAR(fecha) = 2024
            AND DAY(fecha)= 5; 
        """ #Se usa 5 en el dia por que hasta este dia hay registros para el mes de Feb (Ultimo mes en la BD), mes 1 para el mes anterior (Enero)
        
        cursor.execute(query, (id_Cliente,))
        result = cursor.fetchone()  
        cursor.close()
        connection.close()

        return result["total_monto"] if result["total_monto"] is not None else 0

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        raise
    # Usar para obtener la del último mes actual: SELECT SUM(monto) AS total_monto FROM botacora_cliente_final WHERE id_Cliente = %s AND MONTH(fecha) = MONTH(CURDATE()) AND YEAR(fecha) = YEAR(CURDATE());

def get_sales_by_week(id_Cliente):
    try:
        id_Cliente = str(id_Cliente)

        connection = mysql.connector.connect(
            host=settings.DB_HOST,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database=settings.DB_NAME
        )
        
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT 
                SUM(monto) AS total_monto,
                WEEK(fecha, 3) AS semana,  -- Obtiene el número de la semana (modo ISO)
                anio_venta AS año          -- Año de la venta
            FROM botacora_cliente_final
            WHERE id_Cliente = %s
            AND anio_venta IN (2022, 2023)  -- Filtra por los años 2022 y 2023
            GROUP BY anio_venta, WEEK(fecha, 3)  -- Agrupa por año y semana
            ORDER BY anio_venta ASC, semana ASC;  -- Ordena por año primero, luego por semana dentro de cada año
        """
        
        cursor.execute(query, (id_Cliente,))
        result = cursor.fetchall() # Obtiene todos los resultados
        cursor.close()
        connection.close()
    
        return result

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        raise
    
    
def format_sales_for_chart(sales_data):
    legend_data = []
    x_axis_data = [f"Semana {i}" for i in range(1, 53)]  # Crear las 52 semanas del año
    series_data = []
    
    # Agrupar los datos de ventas por año y semana
    years_data = {}

    for record in sales_data:
        year = record['año']
        semana = record['semana']
        monto = record['total_monto']
        
        if year not in years_data:
            years_data[year] = {}

        years_data[year][semana] = monto  # Guardar el monto en la semana correspondiente
    
    # Crear la lista de ventas por año
    for year in sorted(years_data.keys()):
        year_sales = []
        
        # Asignar el monto de ventas para cada semana del año
        for semana in range(1, 53):  # 52 semanas en total
            week_sales = years_data[year].get(semana, 0)  # Obtener ventas o 0 si no hay datos
            year_sales.append(week_sales)
        
        series_data.append({
            'name': f'Ventas {year}',
            'data': year_sales
        })
        
        # Añadir la entrada correspondiente al 'legend_data'
        legend_data.append(f"1 Enero {year}-31 Dic {year}")
    
    # Devolver los datos listos para usarse en el gráfico
    result = {
        'legend': {
            'data': legend_data
        },
        'xAxis': {
            'data': x_axis_data  # Lista de semanas
        },
        'series': series_data
    }
    
    return result

def get_sales_data(id_Cliente):
    try:
        id_Cliente = str(id_Cliente)

        connection = mysql.connector.connect(
            host=settings.DB_HOST,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database=settings.DB_NAME
        )
        
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT 
                CASE mes_venta
                    WHEN 1 THEN 'Enero'
                    WHEN 2 THEN 'Febrero'
                    WHEN 3 THEN 'Marzo'
                    WHEN 4 THEN 'Abril'
                    WHEN 5 THEN 'Mayo'
                    WHEN 6 THEN 'Junio'
                    WHEN 7 THEN 'Julio'
                    WHEN 8 THEN 'Agosto'
                    WHEN 9 THEN 'Septiembre'
                    WHEN 10 THEN 'Octubre'
                    WHEN 11 THEN 'Noviembre'
                    WHEN 12 THEN 'Diciembre'
                END AS mes,
                total_ventas AS monto,
                numero_ventas
            FROM resumen_ventas
            WHERE id_cliente = %s
            AND anio_venta = 2023
            AND mes_venta BETWEEN 7 AND 12  -- Solo últimos 6 meses (Julio - Diciembre)
            ORDER BY mes_venta ASC;
        """
        
        cursor.execute(query, (id_Cliente,))
        result = cursor.fetchall()  # Obtiene todos los resultados
        cursor.close()
        connection.close()
    
        return result  # Devuelve los datos formateados con los nombres de los meses

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        raise
    
    

def last_six_months_sales_chart_formatter(data):
    legend_data = [record["mes"] for record in data]
    amount_data = [{"value": record["monto"], "name": record["mes"]} for record in data]
    
    sales_amount = [
        {
            "value": record["numero_ventas"],
            "name": record["mes"],
            "selected": True if record["mes"] == "Septiembre" else False
        }
        for record in data
    ]

    # Retornar la respuesta formateada
    return {
        "legend_data": legend_data,
        "amount_data": amount_data,
        "sales_amount": sales_amount
    }
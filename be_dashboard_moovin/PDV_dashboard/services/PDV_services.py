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

def get_sales_by_day(id_Cliente):
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
                DATE(fecha) AS fecha,  -- Convierte la fecha a solo día (sin hora)
                anio_venta AS año      -- Utiliza la columna anio_venta para el año
            FROM botacora_cliente_final
            WHERE id_Cliente = %s
            AND anio_venta IN (2022, 2023)  -- Filtra por los años 2022 y 2023
            GROUP BY anio_venta, DATE(fecha)  -- Agrupa por año y fecha
            ORDER BY anio_venta ASC, DATE(fecha) ASC;  -- Ordena por año primero, luego por fecha dentro de cada año
        """
        
        cursor.execute(query, (id_Cliente,))
        result = cursor.fetchall()  # Obtiene todos los resultados de la consulta
        cursor.close()
        connection.close()
    

        return result  # Devuelve los resultados obtenidos de la consulta

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        raise

def format_sales_for_chart(sales_data):
    legend_data = []
    x_axis_data = []
    series_data = []
    
    # Generar los 365 días del año de forma fija, sin duplicados
    days_of_year = []
    for i in range(365):
        day = (datetime(2022, 1, 1) + timedelta(days=i)).strftime("%d %b")  # '01 Jan', '02 Jan', ...
        days_of_year.append(day)

    # Agrupar los datos de ventas por año y fecha
    years_data = {}

    for record in sales_data:
        year = record['año']
        fecha = record['fecha']
        monto = record['total_monto']
        
        if year not in years_data:
            years_data[year] = {}
        
        # Usar la fecha como clave para agrupar por día (formato 'dd bbb')
        years_data[year][fecha.strftime('%d %b')] = monto
    
    # Crear la lista de ventas por año
    for year in sorted(years_data.keys()):
        year_sales = []
        
        # Asignar el monto de ventas para cada día del año
        for day in days_of_year:
            # Verificar si hay ventas para el día en el año
            day_date = datetime.strptime(day, '%d %b')  # Convertir '01 Jan' -> datetime para comparar con 'fecha'
            day_sales = years_data[year].get(day_date.strftime('%d %b'), 0)
            year_sales.append(day_sales)
        
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
            'data': days_of_year  # Usar los días fijos, sin el año
        },
        'series': series_data
    }
    
    return result
import mysql.connector
from django.conf import settings


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

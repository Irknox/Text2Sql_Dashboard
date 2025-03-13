import mysql.connector
from django.conf import settings

def get_data_usage_by_version_and_contract():
    try:
        connection = mysql.connector.connect(
            host=settings.DB_HOST,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            database=settings.DB_NAME
        )

        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT os_version, contract_type, SUM(data_usage_10_days) as total_data_usage
            FROM target
            GROUP BY os_version, contract_type;
        """
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        connection.close()

        return result
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        raise
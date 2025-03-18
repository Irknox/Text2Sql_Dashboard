from PDV_dashboard.services.PDV_services import get_balance_availabe

# Simula un ID de cliente para probar
id_cliente = 123

# Llama a la función y muestra el resultado
try:
    result = get_balance_availabe(id_cliente)
    print("Resultado:", result)
except Exception as e:
    print("Error al ejecutar el servicio:", e)
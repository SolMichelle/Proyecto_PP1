import mysql.connector
from mysql.connector import Error
from datetime import datetime

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root', 
    #'password': '',
    'database': 'panaderia_bd'
}

def connect_db():
    """Establece y retorna la conexión a la base de datos MySQL."""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Error as e:
        # En una aplicación real, se usaría un sistema de logging.
        print(f"Error al conectar a MySQL: {e}")
        return None


# --------------------------------------------------------------------
# 2. FUNCIÓN PARA CARGAR DATOS (SELECT)

def get_products():
    """
    Consulta el catálogo de productos (id, nombre, precio, categoría) 
    para enviarlo al frontend y construir el menú.
    """
    conn = connect_db()
    if conn is None:
        return []

    productos = []
    try:
    
        cursor = conn.cursor(dictionary=True) 
        
        query = "SELECT id_producto, nombre, precio, categoria FROM productos WHERE stock > 0 ORDER BY categoria, nombre;"
        
        cursor.execute(query)
        productos = cursor.fetchall()
        
    except Error as e:
        print(f"Error al obtener productos: {e}")
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()
    return productos


# --------------------------------------------------------------------
# 3. FUNCIÓN PARA SIMULAR PAGO (INSERT - Transacción)

def insert_sale(customer_data: dict, cart_items: list, total_amount: float) -> bool:
    """
    Realiza la transacción de la venta: 
    1. Inserta la cabecera (ventas_formulario).
    2. Inserta el detalle (ventas_detalle) por cada producto.
    3. Confirma la transacción.
    
    Args:
        customer_data (dict): {'nombre', 'correo', 'contacto'}
        cart_items (list): Lista de diccionarios, cada uno con {'id', 'qty', 'price'}. 
                        'id' es id_producto.
        total_amount (float): Total final de la venta.
    
    Returns:
        bool: True si la transacción fue exitosa.
    """
    conn = connect_db()
    if conn is None:
        return False
    
    cursor = conn.cursor()
    success = False
    
    try:
        # Deshabilitar auto-commit e iniciar la transacción
        conn.start_transaction()

        query_cabecera = """
            INSERT INTO ventas_formulario 
            (fecha, nombre_cliente, correo, contacto, total)
            VALUES (%s, %s, %s, %s, %s)
        """
        data_cabecera = (
            datetime.now(),
            customer_data.get('nombre'), 
            customer_data.get('correo'), 
            customer_data.get('contacto'), 
            total_amount
        )
        
        cursor.execute(query_cabecera, data_cabecera)
        id_pedido = cursor.lastrowid # Obtiene el ID generado automáticamente (PRIMARY KEY)

        query_detalle = """
            INSERT INTO ventas_detalle 
            (id_pedido, id_producto, cantidad, subtotal)
            VALUES (%s, %s, %s, %s)
        """

        for item in cart_items:
            # item['price'] es el precio unitario obtenido del carrito
            subtotal = item['price'] * item['qty']
            data_detalle = (
                id_pedido, 
                item['id'], 
                item['qty'], 
                subtotal
            )
            cursor.execute(query_detalle, data_detalle)
        
        conn.commit() 
        success = True
        
    except Error as e:
        conn.rollback() 
        print(f"Error en la transacción de venta (ROLLBACK aplicado): {e}")
    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()
    
    return success

# --------------------------------------------------------------------
# FUNCIÓN PARA CONSULTAS DE REPORTE Y MANTENIMIENTO 
def run_reporting_queries():
    """
    Ejecuta consultas de reporte y mantenimiento para demostrar 
    la capacidad de la BD.
    """
    conn = connect_db()
    if conn is None:
        return

    cursor = conn.cursor(dictionary=True)
    
    print("\n=======================================================")
    print("DEMOSTRACIÓN DE CONSULTAS SQL DE REPORTE Y MANTENIMIENTO")
    print("=======================================================")

    # 1. SELECT con Condición
    print("\n1. Productos en la categoría 'pasteleria':")
    query_1 = "SELECT nombre, FORMAT(precio, 2) AS precio FROM productos WHERE categoria = 'pasteleria';"
    cursor.execute(query_1)
    for row in cursor.fetchall():
        print(f" - {row['nombre']}: ${row['precio']}")


    # 2. JOIN y Agregación (Suma de Ventas de Hoy)
    # NOTA: Usamos la fecha actual (NOW()) para obtener datos de ventas_formulario de hoy.
    print("\n2. Monto total recaudado HOY (Agregación):")
    query_2 = "SELECT FORMAT(SUM(total), 2) AS TotalDiario FROM ventas_formulario WHERE DATE(fecha) = DATE(NOW());"
    cursor.execute(query_2)
    total_hoy = cursor.fetchone()['TotalDiario']
    print(f" - Recaudación de hoy: ${total_hoy if total_hoy else '0.00'}")


    # 3. UPDATE (Mantenimiento de Precio)
    # NOTA: Esto solo tiene efecto si la base de datos se ejecuta
    print("\n3. Actualización de precio de 'Factura: Alcayota' a $600...")
    query_3 = "UPDATE productos SET precio = 600.00 WHERE nombre = 'Factura: Alcayota';"
    cursor.execute(query_3)
    conn.commit()
    print(" - Precio actualizado. Consulta de verificación:")
    query_check = "SELECT nombre, precio FROM productos WHERE nombre = 'Factura: Alcayota';"
    cursor.execute(query_check)
    print(f" - Nuevo Precio: ${cursor.fetchone()['precio']}")


    # 4. Productos comprados en el último pedido
    print("\n4. Productos del ÚLTIMO pedido insertado:")
    query_4 = """
        SELECT 
            T1.nombre_cliente, 
            T3.nombre AS producto, 
            T2.cantidad 
        FROM ventas_formulario T1 
        JOIN ventas_detalle T2 ON T1.id_pedido = T2.id_pedido
        JOIN productos T3 ON T2.id_producto = T3.id_producto
        ORDER BY T1.id_pedido DESC
        LIMIT 3;
    """
    cursor.execute(query_4)
    results_4 = cursor.fetchall()
    if results_4:
        print(f" - Cliente: {results_4[0]['nombre_cliente']}")
        for row in results_4:
            print(f"   - {row['cantidad']} x {row['producto']}")
    else:
        print(" - No hay pedidos en la BD para reportar.")


    cursor.close()
    conn.close()
    print("=======================================================")


# --------------------------------------------------------------------
# Ejemplo de uso (Descomentar y ejecutar en la terminal)
# --------------------------------------------------------------------
# if __name__ == '__main__':
#     # 1. Ejecuta la simulación de una venta primero (si no hay datos)
#     # 2. Luego ejecuta el reporte para ver los resultados
#     
#     # run_reporting_queries()
#     pass


# --------------------------------------------------------------------
# Descomentar para probar después de configurar DB_CONFIG
# --------------------------------------------------------------------
# if __name__ == '__main__':
#     print("--- PRUEBA DE CONEXIÓN Y CONSULTA DE PRODUCTOS ---")
#     productos = get_products()
#     if productos:
#         print(f"Se cargaron {len(productos)} productos:")
#         print(productos[0])
#         print("...")
#     else:
#         print("Error: No se pudieron cargar productos. Revise la conexión y la tabla.")
        
#     print("\n--- PRUEBA DE SIMULACIÓN DE VENTA ---")
#     ejemplo_cliente = {
#         'nombre': 'Juan Pérez',
#         'correo': 'juan@ejemplo.com',
#         'contacto': '3512223334'
#     }
#     
#     # Nota: Los IDs deben existir en la tabla 'productos'
#     ejemplo_carrito = [
#         {'id': 1, 'qty': 2, 'price': 550.00},  # Factura: Alcayota
#         {'id': 10, 'qty': 1, 'price': 350.00}, # Tortita: Raspada
#     ]
#     
#     ejemplo_total = (2 * 550.00) + (1 * 350.00)
#     
#     if insert_sale(ejemplo_cliente, ejemplo_carrito, ejemplo_total):
#         print("Venta insertada correctamente en la BDD.")
#     else:
#         print("Fallo al insertar la venta.")

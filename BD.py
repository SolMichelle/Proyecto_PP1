import mysql.connector
from mysql.connector import Error
from datetime import datetime

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root', 
    'database': 'panaderia_bd'
}

def connect_db():
    """Establece y retorna la conexión a la base de datos MySQL."""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Error as e:
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
        
        query = "SELECT id_producto, nombre, precio, categoria, imagen FROM productos WHERE stock > 0 ORDER BY categoria, nombre;"
        
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
    1. Inserta la cabecera (pedidos).
    2. Inserta el detalle en la tabla `ventas` (relación muchos-a-muchos entre pedidos y productos) por cada producto.
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
       conn.start_transaction()

        # Insertar en la tabla Pedidos (según panaderia_bd_create.sql)
        query_cabecera = (
            "INSERT INTO Pedidos (nombre, correo, direccion, tarjeta, total)"
            " VALUES (%s, %s, %s, %s, %s)"
        )
        data_cabecera = (
            customer_data.get('nombre'),
            customer_data.get('correo'),
            customer_data.get('direccion'),
            customer_data.get('tarjeta'),
            total_amount
        )

        cursor.execute(query_cabecera, data_cabecera)
        id_pedido = cursor.lastrowid

        # La tabla Ventas sólo almacena id_pedido e id_producto según el esquema.
        # Insertamos una fila por unidad vendida (repite según cantidad) para conservar la info de cantidad.
        query_ventas = "INSERT INTO Ventas (id_pedido, id_producto) VALUES (%s, %s)"
        for item in cart_items:
            qty = int(item.get('qty', 1) or 1)
            prod_id = int(item.get('id')) if item.get('id') is not None else None
            for _ in range(max(1, qty)):
                cursor.execute(query_ventas, (id_pedido, prod_id))

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
        JOIN ventas T2 ON T1.id_pedido = T2.id_pedido
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


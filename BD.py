import mysql.connector
from mysql.connector import Error
from datetime import datetime
from typing import List, Dict, Any, Optional

# Configuración de la base de datos (Ajustar según tu entorno)
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root', 
    'password': '', 
    'database': 'panaderia_bd'
}

def connect_db():
    """Establece conexión con la base de datos MySQL."""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        return conn
    except Error as e:
        print(f"Error al conectar: {e}")
        return None

def get_products() -> List[Dict[str, Any]]:
    """Consulta productos disponibles con su imagen."""
    conn = connect_db()
    if not conn:
        return []
    cursor = None
    try:
        cursor = conn.cursor(buffered=True) 
        # Seleccionamos id_producto, nombre, precio, categoria e imagen (agregada por ALTER TABLE)
        cursor.execute("SELECT id_producto, nombre, precio, categoria, imagen FROM productos WHERE stock > 0")
        return cursor.fetchall() or []
    except Error as e:
        print(f"Error en get_products: {e}")
        return []
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

def search_products(query: str) -> List[Dict[str, Any]]:
    """Busca productos por nombre o categoría (HU 8)."""
    conn = connect_db()
    if not conn:
        return []
    cursor = None
    try:
        cursor = conn.cursor(buffered=True)
        sql = "SELECT * FROM productos WHERE nombre LIKE %s OR categoria LIKE %s"
        search_val = f"%{query}%"
        cursor.execute(sql, (search_val, search_val))
        return cursor.fetchall() or []
    except Error as e:
        print(f"Error en search_products: {e}")
        return []
    finally:
        if cursor: cursor.close()
        if conn: conn.close()

def insert_venta_formulario(customer_data: Dict[str, Any], cart_items: List[Dict[str, Any]], total_amount: float) -> bool:
    """
    Registra el pedido siguiendo el esquema SQL final proporcionado:
    - Tabla 'Pedidos': (id_venta, nombre, correo, direccion, tarjeta, total)
    - Tabla 'Ventas': (id_venta, id_pedido, id_producto) - Relación N:N
    """
    conn = connect_db()
    if not conn:
        return False
    
    cursor = None
    try:
        cursor = conn.cursor()
        conn.start_transaction()

        # 1. Inserción en la tabla 'Pedidos'
        # Usamos los nombres exactos de tu script: nombre, correo, direccion, tarjeta, total
        # Nota: La tabla no tiene campo 'fecha' en tu último script, pero se puede agregar si es necesario.
        query_pedidos = """
            INSERT INTO Pedidos 
            (nombre, correo, direccion, tarjeta, total)
            VALUES (%s, %s, %s, %s, %s)
        """
        # Simulamos un número de tarjeta si no viene del front (o lo tomamos si existe)
        tarjeta_val = customer_data.get('tarjeta', 12345678) 
        
        data_pedidos = (
            customer_data.get('nombre'),
            customer_data.get('correo'),
            customer_data.get('direccion'),
            tarjeta_val,
            total_amount
        )
        
        cursor.execute(query_pedidos, data_pedidos)
        id_generado_pedido = cursor.lastrowid 

        # 2. Inserción en la tabla 'Ventas' (Relación N:N entre Pedidos y Productos)
        # Tu script define: id_venta (PK), id_pedido (FK), id_producto (FK)
        query_ventas_relacion = """
            INSERT INTO Ventas 
            (id_pedido, id_producto)
            VALUES (%s, %s)
        """

        for item in cart_items:
            # item['id'] debe coincidir con el ID del producto en el front
            p_id = int(item['id'])
            cursor.execute(query_ventas_relacion, (id_generado_pedido, p_id))
        
        conn.commit() 
        return True
        
    except Error as e:
        if conn: conn.rollback() 
        print(f"Error crítico en insert_venta_formulario: {e}")
        return False
    finally:
        if cursor: cursor.close()
        if conn: conn.close()
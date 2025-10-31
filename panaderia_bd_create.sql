CREATE DATABASE IF NOT EXISTS panaderia_bd;
USE panaderia_bd;

CREATE TABLE productos (
	id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(50),
    stock INT 
);

-- Tabla de cabecera de ventas (Pedido)
CREATE TABLE ventas_formulario (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATETIME NOT NULL, 
    nombre_cliente VARCHAR(100) NOT NULL,
    correo VARCHAR(100),
    contacto VARCHAR(50), 
    total DECIMAL(10, 2) NOT NULL
);

-- Tabla del detalle de la venta (productos por pedido)
CREATE TABLE ventas_detalle (
    id_venta_detalle INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    variante VARCHAR(100),    
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES ventas_cabecera(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);
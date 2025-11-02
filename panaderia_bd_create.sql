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
    FOREIGN KEY (id_pedido) REFERENCES ventas_formulario(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

USE panaderia_bd;

DROP TABLE IF EXISTS Ventas;
DROP TABLE IF EXISTS Pedidos;
DROP TABLE IF EXISTS ventas_formulario;
DROP TABLE IF EXISTS ventas_detalle;

CREATE TABLE Pedidos(
	id_venta INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(100) NOT NULL,
	correo VARCHAR(100),
	direccion VARCHAR(50),
	tarjeta INT NOT NULL,
	total DECIMAL(10,2) NOT NULL
);

CREATE TABLE Ventas(
	id_venta INT PRIMARY KEY AUTO_INCREMENT,
	id_pedido INT NOT NULL,
	id_producto INT NOT NULL,
	FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_venta),
	FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);


ALTER TABLE Productos ADD imagen VARCHAR(200);



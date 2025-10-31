USE panaderia_bd;

-- CATEGORÍA: panaderia
-- Facturas 
INSERT INTO productos (nombre, precio, categoria, stock) VALUES 
('Factura: Alcayota', 550.00, 'facturas', 15),
('Factura: Rellena de Membrillo', 550.00, 'facturas', 15),
('Factura: Dulce de Leche', 550.00, 'facturas', 15),
('Factura: Ricota con pasas', 550.00, 'facturas', 15),
('Facturas de Hojaldre', 650.00, 'facturas', 12);

-- Tortitas (Precio base $350 por unidad)
INSERT INTO productos (nombre, precio, categoria, stock) VALUES 
('Tortita: Raspada', 350.00, 'tortitas', 20),
('Tortita: Pinchada', 350.00, 'tortitas', 20),
('Tortita: De Chicha', 350.00, 'tortitas', 20),
('Tortita: Cordobesa (Manteca)', 350.00, 'tortitas', 20),
('Tortita: De Hoja', 350.00, 'tortitas', 20);

-- Sanguchitos 
INSERT INTO productos (nombre, precio, categoria, stock) VALUES 
('Sanguchito: Jamón y Queso', 1500.00, 'sandwiches', 10),
('Sanguchito: Aceituna', 1500.00, 'sandwiches', 10),
('Sanguchito: Morron y Huevo', 1500.00, 'sandwichespanaderia', 10),
('Sanguchito: Salame y Queso', 1500.00, 'sandwiches', 10);

-- Pan 
INSERT INTO productos (nombre, precio, categoria, stock) VALUES 
('Pan (por Kilo)', 2100.00, 'pan', 80);


-- CATEGORÍA: pasteleria
INSERT INTO productos (nombre, precio, categoria, stock) VALUES 
('Postrecitos (Individual)', 8000.00, 'pasteleria', 10),
('Postres (Torta Entera)', 18000.00, 'pasteleria', 2),
('Cuadraditos (Individual)', 5000.00, 'pasteleria', 10),
('Pastaflora (Unidad)', 2200.00, 'pasteleria', 5);

-- Tartas 
INSERT INTO productos (nombre, precio, categoria, stock) VALUES 
('Tarta: Cabsha', 12000.00, 'pasteleria', 3),
('Tarta: Ricota', 12000.00, 'pasteleria', 3),
('Tarta: Lemon pie con Frutos Rojos', 12000.00, 'pasteleria', 3);


-- CATEGORÍA: confiteria
INSERT INTO productos (nombre, precio, categoria, stock) VALUES 
('Alfajor (Unidad)', 2000.00, 'confiteria', 25),
('Alfajorcitos de Maizena (100g)', 1900.00, 'confiteria', 13),
('Palmeritos (100g)', 900.00, 'confiteria', 10),
('Palmeron (Unidad)', 2500.00, 'confiteria', 60),
('Merengues (Unidad)', 1800.00, 'confiteria', 100),
('Rosquitas (100g)', 900.00, 'confiteria', 10);

-- Galletas 
INSERT INTO productos (nombre, precio, categoria, stock) VALUES 
('Galleta: Avena y Chocolate (100g)', 1200.00, 'galletas', 10),
('Galleta: Avena y Semillas (100g)', 1200.00, 'galletas', 5),
('Galleta: Limón (100g)', 1200.00, 'galletas', 10),
('Galleta: Naranja (100g)', 1200.00, 'galletas', 10),
('Galleta: Coco (100g)', 1200.00, 'galletas', 5),
('Galleta: Chispas de Chocolate (100g)', 1200.00, 'galletas', 10),
('Galleta: Café con Nuez (100g)', 1200.00, 'galletas', 5),
('Galleta: Frutilla (100g)', 1200.00, 'galletas', 10),
('Galleta: Pepa (100g)', 1200.00, 'galletas', 10),
('Galleta: Marmolada (100g)', 1200.00, 'galletas',5);
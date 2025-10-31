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


-- Facturas 
UPDATE productos SET imagen = 'FacturaAlcayota.jpeg' WHERE nombre = 'Factura: Alcayota';
UPDATE productos SET imagen = 'FacturaRellena.jpeg' WHERE nombre = 'Factura: Rellena de Membrillo';
UPDATE productos SET imagen = 'FacturaDulceDeLeche.jpeg' WHERE nombre = 'Factura: Dulce de Leche';
UPDATE productos SET imagen = 'FacturaRicota.jpeg' WHERE nombre = 'Factura: Ricota con pasas';
UPDATE productos SET imagen = 'imagenes/OjaldrePastelera.jpeg' WHERE nombre = 'Facturas de Hojaldre';

-- Tortitas 
UPDATE productos SET imagen = 'TortitaRaspada.jpeg' WHERE nombre = 'Tortita: Raspada';
UPDATE productos SET imagen = 'TortitaPinchada.jpeg' WHERE nombre = 'Tortita: Pinchada';
UPDATE productos SET imagen = 'Tortachicha.jpeg' WHERE nombre = 'Tortita: De Chicha';
UPDATE productos SET imagen = 'TortitaManteca.jpeg' WHERE nombre = 'Tortita: Cordobesa (Manteca)';
UPDATE productos SET imagen = 'TortitadeHoja.jpeg' WHERE nombre = 'Tortita: De Hoja';

-- Sandwiches 
UPDATE productos SET imagen = 'JyQ.jpeg' WHERE nombre = 'Sanguchito: Jamón y Queso';
UPDATE productos SET imagen = 'Aceituna.jpeg' WHERE nombre = 'Sanguchito: Aceituna';
UPDATE productos SET imagen = 'Morron.jpeg' WHERE nombre = 'Sanguchito: Morron y Huevo';
UPDATE productos SET imagen = 'Salame.jpeg' WHERE nombre = 'Sanguchito: Salame y Queso';

-- Pan
UPDATE productos SET imagen = 'imagenes/PanBollo.jpeg' WHERE nombre = 'Pan (por Kilo)';

-- Postres 
UPDATE productos SET imagen = 'imagenes/cheesecake.jpeg' WHERE nombre = 'Postrecitos (Individual)';
UPDATE productos SET imagen = 'imagenes/Tiramisu.jpeg' WHERE nombre = 'Postres (Torta Entera)';
UPDATE productos SET imagen = 'imagenes/CuadradoCoco.jpeg' WHERE nombre = 'Cuadraditos (Individual)';
UPDATE productos SET imagen = 'imagenes/PastaFlora.jpeg' WHERE nombre = 'Pastaflora (Unidad)';

-- Tartas 
UPDATE productos SET imagen = 'cabsha.jpeg' WHERE nombre = 'Tarta: Cabsha';
UPDATE productos SET imagen = 'Ricota.jpeg' WHERE nombre = 'Tarta: Ricota';
UPDATE productos SET imagen = 'LemonPieFrutosRojos.jpeg' WHERE nombre = 'Tarta: Lemon pie con Frutos Rojos';

-- Confiteria 
UPDATE productos SET imagen = 'imagenes/AlfajorMaizena.jpeg' WHERE nombre = 'Alfajor (Unidad)';
UPDATE productos SET imagen = 'imagenes/AlfajorcitoMaizena.jpeg' WHERE nombre = 'Alfajorcitos de Maizena (100g)';
UPDATE productos SET imagen = 'imagenes/palmerito.jpeg' WHERE nombre = 'Palmeritos (100g)';
UPDATE productos SET imagen = 'imagenes/Palmeron.jpeg' WHERE nombre = 'Palmeron (Unidad)';
UPDATE productos SET imagen = 'imagenes/Merengues.jpeg' WHERE nombre = 'Merengues (Unidad)';
UPDATE productos SET imagen = 'imagenes/RoscaNaranja.jpeg' WHERE nombre = 'Rosquitas (100g)';

-- Galletas 
UPDATE productos SET imagen = 'GalletaAvenayChocolate.jpeg' WHERE nombre = 'Galleta: Avena y Chocolate (100g)';
UPDATE productos SET imagen = 'Galletaavenaysemillas.jpeg' WHERE nombre = 'Galleta: Avena y Semillas (100g)';
UPDATE productos SET imagen = 'GalletaLimon.jpeg' WHERE nombre = 'Galleta: Limón (100g)';
UPDATE productos SET imagen = 'GalletaNaranja.jpeg' WHERE nombre = 'Galleta: Naranja (100g)';
UPDATE productos SET imagen = 'Galletacoco.jpeg' WHERE nombre = 'Galleta: Coco (100g)';
UPDATE productos SET imagen = 'GalletachispasChocolate.jpeg' WHERE nombre = 'Galleta: Chispas de Chocolate (100g)';
UPDATE productos SET imagen = 'GalletaCafeNuez.jpeg' WHERE nombre = 'Galleta: Café con Nuez (100g)';
UPDATE productos SET imagen = 'GalletaFrutilla.jpeg' WHERE nombre = 'Galleta: Frutilla (100g)';
UPDATE productos SET imagen = 'GalletaPepa.jpeg' WHERE nombre = 'Galleta: Pepa (100g)';
UPDATE productos SET imagen = 'GalletaMarmolada.jpeg' WHERE nombre = 'Galleta: Marmolada';

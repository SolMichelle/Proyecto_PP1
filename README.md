# Proyecto_PP1: Tienda virtual de una panadaría 

Este repositorio contiene los archivos necesarios para el proyecto de la asignatura Práctica Profesional Uno del IES 9008 "Manuel Belgrano".

Se utiliza la licencia MIT.


## Descripción del proyecto

El proyecto consiste en diseñar e implementar una página web con funcionalidad de tienda virtual para una panadería mediana ubicada en Mendoza.

### Problemas resueltos:

El negocio enfrentaba problemas de baja visibilidad y complicaciones en la gestión de pedidos. La implementación de este sitio web resuelve estas situaciones al:

- Ofrecer una tienda virtual y una sección para encargos claros, ampliando la base de clientes.

- Mejorar la imagen de la marca con enunciados entendibles, imágenes claras y precios actualizados.

- Facilitar la comunicación con los usuarios mediante un link directo a las redes sociales de la panadería.


## Tecnologías implementadas (Tech Stack)

Este proyecto se basa en una arquitectura cliente-servidor para simular un entorno de producción real:

### Frontend (Cliente):

HTML5, CSS3 y JavaScript.

Uso de la librería Bootstrap para garantizar un diseño responsive y moderno.

Toda la lógica del carrito de compras y la interacción con el usuario se maneja con JavaScript.

### Backend (Servidor y Persistencia):

- Python: utilizado para la lógica de negocio y la gestión de la base de datos.

- MySQL: sistema de gestión de bases de datos relacionales para almacenar productos, precios y registrar pedidos de venta.


## Requisitos para ejecución local

Para ejecutar el backend de Python (`app.py`) y la base de datos de este proyecto, se deben tener instalados y configurados los siguientes elementos en su entorno local:
* **. Servidor de Base de Datos (BD):**
    * **MySQL Server:** necesario para alojar la base de datos `panaderia_bd`
* **. Lenguaje de programación:**
    * **Python 3.x:** requerido para ejecutar el script del servidor (`app.py`) que maneja la lógica de la BD.
* **. Librerías de Python:**
    * **`mysql-connector-python`:** librería específica que Python utiliza para conectarse, enviar consultas SQL y recibir respuestas del servidor MySQL.
    * **`Flask`:** micro-framework para el backend y las rutas API.
    * **`Flask-CORS`:** permite que el frontend (servido por el navegador) pueda hacer peticiones al servidor Flask en 127.0.0.1:5000.
    *  **`waitress`:** librería que actúa como servidor, permitiendo que Flask se ejecute con estabilidad y alto rendimiento para manejar un tráfico de usuarios real.


## Metodología y equipo

El proyecto fue desarrollado utilizando la metodología Scrum-Kanban (Scrumban).

- Propietario del producto: dueño de la panadería.

- Líder en Scrum y BD: Sol Ponce.

- Líder de Desarrollo: Aldana Aranda.

A pesar de ser un equipo pequeño, la colaboración fue clave para superar los desafíos técnicos iniciales y lograr la integración exitosa del frontend con la BD.

# VER Sistema de ventas
Sistema de ventas, compras e inventario

## El sistema contará con 3 (tres) partes principales:

### API: 
Encargada de las peticiones y validaciones con la base de datos y con los clientes (app). 
Autorización, autenticación, manipulación de datos y comunicación entre clientes.
Desarrollado con Node.js, Express, Passport, JWT, entre otras tecnologías.

### Base de Datos:
El Schema será desplegado en una BDRM, MySQL. Cumpliendo las primeras 3 leyes de normalización de las tablas. Obviando la 4ta, por temas de simplicidad a la hora de desarollar.

### APP:
Encargada de interactuar, mostrar contenido con el cliente y, por supuesto, de recibir la información del usuario y conectarse con la API para enviar la información.
Desarrollado con Electron.js, JavaScript Vanilla, Node.js, y por ende, con tecnologias web, aunque no se pierde la sensación de que la app es realmente nativa.

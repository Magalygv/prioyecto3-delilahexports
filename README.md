# prioyecto3-delilahexports


Backend "Delilah Restó", App de pedidos de comida

objetivo:
Generar el backend de pedidos online para un restaurante llamada Delilah Restó, generando bases de datos relacionales, operaciones CRUD, endpoints funcionales y documentación.

Recursos y tecnologías utilizadas:

-	Node.js
-	Nodemon
-	Express
-	JWT para autenticación via Token
-	MySQL
-	Sequelize
-	Postman para manejo de endpoints y testing
-	Swagger para documentación de API

Documentación de la API:

Abrir el archivo documentation.yml y copiar su contenido en Swagger o importar.

Inicio del Proyecto => =>

1- clonar el repositorio:

git clone https://github.com/Magalygv/prioyecto3-delilahexports.git

2- Instalación de dependencias

dotenv
express
helmet
jsonwebtoken
mysql
mysql2
sequelize

3- Creando base de datos

•	Abrir XAMPP y sobre el puerto 3306

•	ejecutar los servicios de Apache y MySQL

•	Abrir (admin) del servicio MySQL

•	Generar una nueva Base de datos: db_delilahexports desde el panel de control

•	Abrir el archivo en bd.sql y dentro del panel de control de la base de datos ejecutar la serie de queries del archivo o importar el mismo.


crear archivo .env


DB_HOST=localhost
DB_NAME=db_delilahexports
DB_USER=root
DB_PASS=
DB_PORT=3306


4 - Iniciando el servidor
Abrir el archivo desde la consola en nodemon server.js

5 - Ahora lo esperado!

Ejecutar los endpoints USER ORDERS PRODUCTS desde postman para poder hacer uso de la API y base de datos.


CREATE DATABASE db_delilahexports;
USE db_delilahexports;

-- Table Creation
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR (60) NOT NULL,
  password VARCHAR (60) NOT NULL,
  full_name VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  phone INT NOT NULL,
  delivery_address VARCHAR (60) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  is_disabled BOOLEAN DEFAULT FALSE
);

-- Populate users table
INSERT INTO
  users
VALUES
  (NULL,"saramejia","sara123","Sara Mejia","saramejia2020@gmail.com",3101234567,"Calle sur 123",TRUE,FALSE),
  (NULL,"cristinasanta","cristina123","Cristina Santa","cristinasanta2020@hotmail.com",3111234567,"carrera 55 num 12 12",FALSE,FALSE),
  (NULL,"solvalencia","sol123","Sol Eugenia Valencia","solevalencia2020@gmail.com",3121234567,"diagonal 35 sur 879",FALSE,FALSE),
  (NULL,"magalygonzalez","maga123","Magaly Gonzalez","magalygv2020@gmail.com",3011234567,"Calle 99 sur 32",TRUE,FALSE),
  (NULL,"katerinrodriguez","katerin123","Katerin Rodrigrez ","katherodri456@hotmail.com",3001234567,"diagonal 38 sur 56",FALSE,FALSE),
  (NULL,"juantorres","juan123","Juan Pablo Torres","juantojo123456@gmail.com",3171234567,"calle 56 num 89 74  ",FALSE,FALSE);
   
CREATE TABLE products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR (60) NOT NULL,
  price FLOAT NOT NULL,
  img_url VARCHAR(200) NOT NULL,
  description VARCHAR(150) NOT NULL,
  is_disabled BOOLEAN DEFAULT FALSE
);

-- Populate products table
INSERT INTO
  products
VALUES
  (NULL,"lazaña mixta carne y pollo",360,"https://via.placeholder.com/732","Lazaña personal de 300gramos de carne y pollo+ con jugo natural + postre de tres leches",FALSE),
  (NULL,"lazaña carne",300,"https://via.placeholder.com/237","Lazaña personal de 300gramos de carne de res+ con jugo natural + postre de tres leches",FALSE),
  (NULL,"lazaña pollo",265,"https://via.placeholder.com/200","Lazaña personal de 300gramos con pollo y champiñones+ con jugo natural + postre de tres leches",FALSE),
  (NULL,"lazaña vegetales con carne",60,"https://via.placeholder.com/666","Lazaña personal de 300gramos de vegetales frescos y carne de ternera+ con jugo natural + postre de tres leches",FALSE),
  (NULL,"lazaña vegetales con mariscos",400,"https://via.placeholder.com/444","Lazaña personal de 300gramos vegetales + mariscos y pulpo+ con jugo natural + postre de tres leches",FALSE),
  (NULL,"lazaña vegetales",450,"https://via.placeholder.com/999","Lazaña personal de 300gramos de vegetales frescos y queso baja en calorias+ con jugo natural + postre de tres leches",FALSE),
  (NULL,"lazaña vegetales con pollo",450,"https://via.placeholder.com/888","Lazaña personal de 300gramos con pollo y vegetales frescos + queso de bufala+ con jugo natural + postre de tres leches",FALSE);
  
CREATE TABLE orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  status VARCHAR(60) NOT NULL,
  date DATETIME NOT NULL,
  description VARCHAR(150) NOT NULL,
  payment_method VARCHAR (60) NOT NULL,
  total FLOAT NOT NULL,
  user_id INT NOT NULL DEFAULT "0",
  is_disabled BOOLEAN DEFAULT FALSE,
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);

-- Populate orders table
INSERT INTO
  orders
VALUES
  (NULL,"delivered",NOW(),"lazañacarne+pollo, 1 jugo+postre","card",480,1,FALSE),
  (NULL,"canceled",NOW(),"lazañacarne, 1 jugo+postre","card",120,3,FALSE),
  (NULL,"sending",NOW(),"lazañapollo, 1 jugo+postre","cash",120,1,FALSE),
  (NULL,"preparing",NOW(),"1lazañavegetales+carne, 1 jugo+postre","cash",400,3,FALSE),
  (NULL,"confirmed",NOW(),"lazañavegetales+mariscos, 1 jugo+postre","card",450,2,FALSE),
  (NULL,"new",NOW(),"lazañax2vegetales, 1 jugo+postre","cash",450,1,FALSE),
  (NULL,"new",NOW(),"lazañax2veget+pollo, 1 jugo+postre","cash",450,1,FALSE);

CREATE TABLE orders_products (
  order_prod_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  product_id INT,
  product_amount INT NOT NULL,
  FOREIGN KEY(order_id) REFERENCES orders(order_id),
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);

-- Populate orders_products table
INSERT INTO
  orders_products
VALUES
  (NULL, 1, 1, 1),
  (NULL, 1, 4, 2),
  (NULL, 2, 4, 2),
  (NULL, 3, 4, 2),
  (NULL, 4, 5, 1),
  (NULL, 5, 6, 1),
  (NULL, 6, 7, 1);
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: branch
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `branch` (
  `idbranch` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `cuit` varchar(15) NOT NULL,
  `dir_street` varchar(30) NOT NULL,
  `phone_number` int DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `representative` varchar(45) DEFAULT NULL,
  `lastNumber` bigint NOT NULL DEFAULT '0',
  `lastSerie` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`idbranch`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: branch_user
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `branch_user` (
  `idbranch_user` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_branch` int NOT NULL,
  PRIMARY KEY (`idbranch_user`),
  UNIQUE KEY `branch_user_idUser_idBranch_unique` (`id_user`, `id_branch`),
  KEY `id_branch` (`id_branch`),
  CONSTRAINT `branch_user_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `branch_user_ibfk_2` FOREIGN KEY (`id_branch`) REFERENCES `branch` (`idbranch`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: buy
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `buy` (
  `idbuy` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_branch` int NOT NULL,
  `id_supplier` int NOT NULL,
  `date` varchar(16) NOT NULL,
  `total_amount` decimal(19, 2) NOT NULL,
  `howPaid` varchar(20) NOT NULL,
  PRIMARY KEY (`idbuy`),
  KEY `id_user` (`id_user`),
  KEY `id_branch` (`id_branch`),
  KEY `id_supplier` (`id_supplier`),
  CONSTRAINT `buy_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`iduser`) ON UPDATE CASCADE,
  CONSTRAINT `buy_ibfk_2` FOREIGN KEY (`id_branch`) REFERENCES `branch` (`idbranch`) ON UPDATE CASCADE,
  CONSTRAINT `buy_ibfk_3` FOREIGN KEY (`id_supplier`) REFERENCES `supplier` (`idsupplier`) ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: buy_product
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `buy_product` (
  `idbuy_product` int NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `id_buy` int NOT NULL,
  `quantity` decimal(19, 2) NOT NULL,
  `price` decimal(19, 2) NOT NULL,
  PRIMARY KEY (`idbuy_product`),
  UNIQUE KEY `buy_product_idBuy_idProduct_unique` (`id_product`, `id_buy`),
  KEY `id_buy` (`id_buy`),
  CONSTRAINT `buy_product_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`idproduct`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `buy_product_ibfk_2` FOREIGN KEY (`id_buy`) REFERENCES `buy` (`idbuy`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: cash-flow
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cash-flow` (
  `idcash_flow` int NOT NULL AUTO_INCREMENT,
  `id_emplooy` int NOT NULL,
  `id_branch` int NOT NULL,
  `operation` varchar(3) NOT NULL,
  `observation` varchar(255) DEFAULT 'NO',
  `amount` decimal(19, 2) NOT NULL,
  `id_cash_register` int NOT NULL,
  `date` varchar(16) NOT NULL,
  PRIMARY KEY (`idcash_flow`),
  KEY `id_emplooy` (`id_emplooy`),
  KEY `id_branch` (`id_branch`),
  KEY `id_cash_register` (`id_cash_register`),
  CONSTRAINT `cash-flow_ibfk_1` FOREIGN KEY (`id_emplooy`) REFERENCES `emplooy` (`idemplooy`) ON UPDATE CASCADE,
  CONSTRAINT `cash-flow_ibfk_2` FOREIGN KEY (`id_branch`) REFERENCES `branch` (`idbranch`) ON UPDATE CASCADE,
  CONSTRAINT `cash-flow_ibfk_3` FOREIGN KEY (`id_cash_register`) REFERENCES `cash-register` (`idbox`) ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: cash-register
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `cash-register` (
  `idbox` int NOT NULL AUTO_INCREMENT,
  `money_amount` decimal(19, 2) NOT NULL,
  `id_branch` int NOT NULL,
  PRIMARY KEY (`idbox`),
  KEY `id_branch` (`id_branch`),
  CONSTRAINT `cash-register_ibfk_1` FOREIGN KEY (`id_branch`) REFERENCES `branch` (`idbranch`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: customer
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `customer` (
  `idcustomer` int NOT NULL AUTO_INCREMENT,
  `idPeople` int NOT NULL,
  `debt` decimal(19, 2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`idcustomer`),
  UNIQUE KEY `idPeople` (`idPeople`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`idPeople`) REFERENCES `people` (`idpeople`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: debt_paid
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `debt_paid` (
  `iddebt_paid` int NOT NULL AUTO_INCREMENT,
  `id_customer` int NOT NULL,
  `id_user` int NOT NULL,
  `amount` decimal(19, 2) NOT NULL,
  `date` varchar(10) NOT NULL,
  `register_date` datetime NOT NULL,
  `how_paid` varchar(255) NOT NULL,
  `observation` varchar(255) NOT NULL,
  PRIMARY KEY (`iddebt_paid`),
  KEY `id_customer` (`id_customer`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `debt_paid_ibfk_1` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`idcustomer`) ON UPDATE CASCADE,
  CONSTRAINT `debt_paid_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`iduser`) ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: department
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `department` (
  `iddepartment` int NOT NULL AUTO_INCREMENT,
  `description` varchar(30) NOT NULL,
  PRIMARY KEY (`iddepartment`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: doc-type
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `doc-type` (
  `iddoc_type` int NOT NULL AUTO_INCREMENT,
  `description` varchar(20) NOT NULL,
  PRIMARY KEY (`iddoc_type`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: emplooy
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `emplooy` (
  `idemplooy` int NOT NULL AUTO_INCREMENT,
  `lastname` varchar(30) NOT NULL,
  `name` varchar(15) NOT NULL,
  `id_doc_type` int NOT NULL,
  `num_doc` varchar(15) NOT NULL,
  `dir_street` varchar(30) DEFAULT NULL,
  `phone_number` bigint DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `birth_date` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`idemplooy`),
  UNIQUE KEY `num_doc` (`num_doc`),
  KEY `id_doc_type` (`id_doc_type`),
  CONSTRAINT `emplooy_ibfk_1` FOREIGN KEY (`id_doc_type`) REFERENCES `doc-type` (`iddoc_type`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: global
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `global` (
  `idglobal` int NOT NULL AUTO_INCREMENT,
  `fantasy_name` varchar(40) NOT NULL,
  `business_name` varchar(40) NOT NULL,
  `tax_name` varchar(4) NOT NULL,
  `tax_percentage` decimal(2, 0) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idglobal`),
  UNIQUE KEY `business_name` (`business_name`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: location-exposition
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `location-exposition` (
  `idlocation_exposition` int NOT NULL AUTO_INCREMENT,
  `description` varchar(30) NOT NULL,
  `id_branch` int NOT NULL,
  PRIMARY KEY (`idlocation_exposition`),
  KEY `id_branch` (`id_branch`),
  CONSTRAINT `location-exposition_ibfk_1` FOREIGN KEY (`id_branch`) REFERENCES `branch` (`idbranch`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: location-store
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `location-store` (
  `idlocation_store` int NOT NULL AUTO_INCREMENT,
  `description` varchar(30) NOT NULL,
  `id_branch` int NOT NULL,
  PRIMARY KEY (`idlocation_store`),
  KEY `id_branch` (`id_branch`),
  CONSTRAINT `location-store_ibfk_1` FOREIGN KEY (`id_branch`) REFERENCES `branch` (`idbranch`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: order
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `order` (
  `idorder` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_customer` int NOT NULL,
  `id_branch` int NOT NULL,
  `date` varchar(16) NOT NULL,
  `tax` smallint NOT NULL,
  `total_amount` decimal(19, 2) NOT NULL,
  `invoicing` tinyint NOT NULL DEFAULT '0',
  `price_list` varchar(255) NOT NULL DEFAULT 'public',
  PRIMARY KEY (`idorder`),
  KEY `id_user` (`id_user`),
  KEY `id_customer` (`id_customer`),
  KEY `id_branch` (`id_branch`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`iduser`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`idcustomer`) ON UPDATE CASCADE,
  CONSTRAINT `order_ibfk_3` FOREIGN KEY (`id_branch`) REFERENCES `branch` (`idbranch`) ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: order_product
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `order_product` (
  `idorder_product` int NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `id_order` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`idorder_product`),
  UNIQUE KEY `order_product_idOrder_idProduct_unique` (`id_product`, `id_order`),
  KEY `id_order` (`id_order`),
  CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`idproduct`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`id_order`) REFERENCES `order` (`idorder`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: people
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `people` (
  `idpeople` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `id_doc_type` int NOT NULL,
  `num_doc` varchar(15) NOT NULL,
  `id_dir_department` bigint NOT NULL,
  `id_dir_province` bigint NOT NULL,
  `id_dir_city` bigint NOT NULL,
  `dir_post_code` bigint NOT NULL,
  `dir_street` varchar(30) DEFAULT NULL,
  `phone_number` bigint DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `cbu` bigint DEFAULT NULL,
  `cuit` bigint DEFAULT NULL,
  PRIMARY KEY (`idpeople`),
  KEY `id_doc_type` (`id_doc_type`),
  CONSTRAINT `people_ibfk_1` FOREIGN KEY (`id_doc_type`) REFERENCES `doc-type` (`iddoc_type`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: product
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `product` (
  `idproduct` bigint NOT NULL,
  `id_department` int NOT NULL,
  `id_unit_measure` int NOT NULL,
  `id_location_exposition` int NOT NULL,
  `id_location_store` int NOT NULL,
  `description` varchar(45) NOT NULL,
  `stock` decimal(19, 2) NOT NULL DEFAULT '0.00',
  `stock_min` decimal(19, 2) NOT NULL,
  `on_sale` tinyint NOT NULL DEFAULT '0',
  `buy_price` decimal(19, 2) NOT NULL DEFAULT '0.00',
  `unit_price` decimal(19, 2) NOT NULL DEFAULT '0.00',
  `wholesaler_price` decimal(19, 2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`idproduct`),
  KEY `id_department` (`id_department`),
  KEY `id_unit_measure` (`id_unit_measure`),
  KEY `id_location_exposition` (`id_location_exposition`),
  KEY `id_location_store` (`id_location_store`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_department`) REFERENCES `department` (`iddepartment`) ON UPDATE CASCADE,
  CONSTRAINT `product_ibfk_2` FOREIGN KEY (`id_unit_measure`) REFERENCES `unit-measure` (`idunit_measure`) ON UPDATE CASCADE,
  CONSTRAINT `product_ibfk_3` FOREIGN KEY (`id_location_exposition`) REFERENCES `location-exposition` (`idlocation_exposition`) ON UPDATE CASCADE,
  CONSTRAINT `product_ibfk_4` FOREIGN KEY (`id_location_store`) REFERENCES `location-store` (`idlocation_store`) ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sale
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sale` (
  `idglobal` int NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `fromDate` varchar(10) NOT NULL,
  `toDate` varchar(10) NOT NULL,
  `discount` decimal(19, 2) NOT NULL,
  `productChange` tinyint NOT NULL,
  PRIMARY KEY (`idglobal`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `sale_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`idproduct`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sell
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sell` (
  `idsell` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_customer` int NOT NULL,
  `id_branch` int NOT NULL,
  `number_check` bigint NOT NULL,
  `serie_check` int NOT NULL,
  `date` varchar(16) NOT NULL,
  `tax` smallint NOT NULL,
  `total_amount` decimal(19, 2) NOT NULL,
  `invoicing` tinyint NOT NULL DEFAULT '0',
  `how_paid` varchar(255) NOT NULL,
  `how_much_paid` decimal(19, 2) NOT NULL,
  PRIMARY KEY (`idsell`),
  KEY `id_user` (`id_user`),
  KEY `id_customer` (`id_customer`),
  KEY `id_branch` (`id_branch`),
  CONSTRAINT `sell_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`iduser`),
  CONSTRAINT `sell_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`idcustomer`) ON UPDATE CASCADE,
  CONSTRAINT `sell_ibfk_3` FOREIGN KEY (`id_branch`) REFERENCES `branch` (`idbranch`) ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sell_product
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sell_product` (
  `idsell_product` int NOT NULL AUTO_INCREMENT,
  `id_product` bigint NOT NULL,
  `id_sell` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(19, 2) NOT NULL,
  PRIMARY KEY (`idsell_product`),
  UNIQUE KEY `sell_product_idSell_idProduct_unique` (`id_product`, `id_sell`),
  KEY `id_sell` (`id_sell`),
  CONSTRAINT `sell_product_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `product` (`idproduct`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sell_product_ibfk_2` FOREIGN KEY (`id_sell`) REFERENCES `sell` (`idsell`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: supplier
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `supplier` (
  `idsupplier` int NOT NULL AUTO_INCREMENT,
  `idPeople` int NOT NULL,
  PRIMARY KEY (`idsupplier`),
  UNIQUE KEY `idPeople` (`idPeople`),
  CONSTRAINT `supplier_ibfk_1` FOREIGN KEY (`idPeople`) REFERENCES `people` (`idpeople`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: unit-measure
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `unit-measure` (
  `idunit_measure` int NOT NULL AUTO_INCREMENT,
  `long_description` varchar(45) NOT NULL,
  `short_description` varchar(5) NOT NULL,
  PRIMARY KEY (`idunit_measure`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `id_emplooy` int NOT NULL,
  `id_user_type` int NOT NULL,
  `register_date` datetime NOT NULL,
  `menu_stock` tinyint NOT NULL,
  `menu_buys` tinyint NOT NULL DEFAULT '0',
  `menu_sells` tinyint NOT NULL DEFAULT '0',
  `menu_maintenance` tinyint NOT NULL DEFAULT '0',
  `menu_queries` tinyint NOT NULL DEFAULT '0',
  `menu_admin` tinyint NOT NULL DEFAULT '0',
  `menu_invoicing` tinyint NOT NULL DEFAULT '0',
  `username` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `id_emplooy` (`id_emplooy`),
  UNIQUE KEY `username` (`username`),
  KEY `id_user_type` (`id_user_type`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_emplooy`) REFERENCES `emplooy` (`idemplooy`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`id_user_type`) REFERENCES `user-type` (`iduser_type`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user-type
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user-type` (
  `iduser_type` int NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL,
  PRIMARY KEY (`iduser_type`),
  UNIQUE KEY `type` (`type`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: branch
# ------------------------------------------------------------

INSERT INTO
  `branch` (
    `idbranch`,
    `name`,
    `cuit`,
    `dir_street`,
    `phone_number`,
    `email`,
    `representative`,
    `lastNumber`,
    `lastSerie`
  )
VALUES
  (
    1,
    'Principal',
    'DESCONOCIDO',
    'Moises Quinteros 1163',
    11111,
    'email@default.dev',
    'Administrador',
    11,
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: branch_user
# ------------------------------------------------------------

INSERT INTO
  `branch_user` (`idbranch_user`, `id_user`, `id_branch`)
VALUES
  (1, 1, 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: buy
# ------------------------------------------------------------

INSERT INTO
  `buy` (
    `idbuy`,
    `id_user`,
    `id_branch`,
    `id_supplier`,
    `date`,
    `total_amount`,
    `howPaid`
  )
VALUES
  (1, 1, 1, 1, '2022/04/20-18:31', 2000.00, 'Contado');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: buy_product
# ------------------------------------------------------------

INSERT INTO
  `buy_product` (
    `idbuy_product`,
    `id_product`,
    `id_buy`,
    `quantity`,
    `price`
  )
VALUES
  (1, 1, 1, 20.00, 100.00);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: cash-flow
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: cash-register
# ------------------------------------------------------------

INSERT INTO
  `cash-register` (`idbox`, `money_amount`, `id_branch`)
VALUES
  (1, 11800.00, 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: customer
# ------------------------------------------------------------

INSERT INTO
  `customer` (`idcustomer`, `idPeople`, `debt`)
VALUES
  (1, 1, 0.00);
INSERT INTO
  `customer` (`idcustomer`, `idPeople`, `debt`)
VALUES
  (2, 2, 350.00);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: debt_paid
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: department
# ------------------------------------------------------------

INSERT INTO
  `department` (`iddepartment`, `description`)
VALUES
  (1, 'VARIOS');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: doc-type
# ------------------------------------------------------------

INSERT INTO
  `doc-type` (`iddoc_type`, `description`)
VALUES
  (1, 'DNI');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: emplooy
# ------------------------------------------------------------

INSERT INTO
  `emplooy` (
    `idemplooy`,
    `lastname`,
    `name`,
    `id_doc_type`,
    `num_doc`,
    `dir_street`,
    `phone_number`,
    `email`,
    `birth_date`
  )
VALUES
  (
    1,
    'Administrador',
    'Administrador',
    1,
    '11111111',
    'Adress Default',
    111111111,
    'email@default.dev',
    '2000/02/02'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: global
# ------------------------------------------------------------

INSERT INTO
  `global` (
    `idglobal`,
    `fantasy_name`,
    `business_name`,
    `tax_name`,
    `tax_percentage`
  )
VALUES
  (1, 'Mercado 1990', 'DESCONOCIDO', 'IVA', 0);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: location-exposition
# ------------------------------------------------------------

INSERT INTO
  `location-exposition` (
    `idlocation_exposition`,
    `description`,
    `id_branch`
  )
VALUES
  (1, 'Estante 1', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: location-store
# ------------------------------------------------------------

INSERT INTO
  `location-store` (`idlocation_store`, `description`, `id_branch`)
VALUES
  (1, 'Deposito 1', 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: order
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: order_product
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: people
# ------------------------------------------------------------

INSERT INTO
  `people` (
    `idpeople`,
    `name`,
    `id_doc_type`,
    `num_doc`,
    `id_dir_department`,
    `id_dir_province`,
    `id_dir_city`,
    `dir_post_code`,
    `dir_street`,
    `phone_number`,
    `email`,
    `cbu`,
    `cuit`
  )
VALUES
  (
    1,
    'Consumidor Final',
    1,
    '99999999',
    1,
    1,
    2,
    99999,
    'Sin direccion',
    9999999,
    'consumidor@final.com',
    NULL,
    9999999
  );
INSERT INTO
  `people` (
    `idpeople`,
    `name`,
    `id_doc_type`,
    `num_doc`,
    `id_dir_department`,
    `id_dir_province`,
    `id_dir_city`,
    `dir_post_code`,
    `dir_street`,
    `phone_number`,
    `email`,
    `cbu`,
    `cuit`
  )
VALUES
  (
    2,
    'Don Juan',
    1,
    '1232222222',
    42147,
    42,
    42147010000,
    1234,
    'AAA 123',
    12222,
    'don@juan.com',
    NULL,
    123223222
  );
INSERT INTO
  `people` (
    `idpeople`,
    `name`,
    `id_doc_type`,
    `num_doc`,
    `id_dir_department`,
    `id_dir_province`,
    `id_dir_city`,
    `dir_post_code`,
    `dir_street`,
    `phone_number`,
    `email`,
    `cbu`,
    `cuit`
  )
VALUES
  (
    3,
    'Pepino',
    1,
    '123232323',
    26077,
    26,
    26077010000,
    1234,
    'aaa 123',
    222222,
    'pepino@gmail.com',
    1232323232,
    123444222
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: product
# ------------------------------------------------------------

INSERT INTO
  `product` (
    `idproduct`,
    `id_department`,
    `id_unit_measure`,
    `id_location_exposition`,
    `id_location_store`,
    `description`,
    `stock`,
    `stock_min`,
    `on_sale`,
    `buy_price`,
    `unit_price`,
    `wholesaler_price`
  )
VALUES
  (
    1,
    1,
    1,
    1,
    1,
    'Mayonesa 250ml',
    15.00,
    5.00,
    0,
    100.00,
    150.00,
    130.00
  );
INSERT INTO
  `product` (
    `idproduct`,
    `id_department`,
    `id_unit_measure`,
    `id_location_exposition`,
    `id_location_store`,
    `description`,
    `stock`,
    `stock_min`,
    `on_sale`,
    `buy_price`,
    `unit_price`,
    `wholesaler_price`
  )
VALUES
  (
    22548024324,
    1,
    1,
    1,
    1,
    'Perfume Tommy Hombres',
    2.00,
    1.00,
    0,
    1000.00,
    2100.00,
    1350.00
  );
INSERT INTO
  `product` (
    `idproduct`,
    `id_department`,
    `id_unit_measure`,
    `id_location_exposition`,
    `id_location_store`,
    `description`,
    `stock`,
    `stock_min`,
    `on_sale`,
    `buy_price`,
    `unit_price`,
    `wholesaler_price`
  )
VALUES
  (
    9789875808850,
    1,
    1,
    1,
    1,
    'Libro Codigo Da Vinci',
    5.00,
    2.00,
    0,
    1000.00,
    1500.00,
    1250.00
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sale
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sell
# ------------------------------------------------------------

INSERT INTO
  `sell` (
    `idsell`,
    `id_user`,
    `id_customer`,
    `id_branch`,
    `number_check`,
    `serie_check`,
    `date`,
    `tax`,
    `total_amount`,
    `invoicing`,
    `how_paid`,
    `how_much_paid`
  )
VALUES
  (
    1,
    1,
    2,
    1,
    1,
    0,
    '2022/04/18-16:05',
    0,
    150.00,
    0,
    'Efectivo/Cuenta Corriente',
    100.00
  );
INSERT INTO
  `sell` (
    `idsell`,
    `id_user`,
    `id_customer`,
    `id_branch`,
    `number_check`,
    `serie_check`,
    `date`,
    `tax`,
    `total_amount`,
    `invoicing`,
    `how_paid`,
    `how_much_paid`
  )
VALUES
  (
    2,
    1,
    1,
    1,
    2,
    0,
    '2022/04/18-16:18',
    0,
    150.00,
    0,
    'Efectivo',
    150.00
  );
INSERT INTO
  `sell` (
    `idsell`,
    `id_user`,
    `id_customer`,
    `id_branch`,
    `number_check`,
    `serie_check`,
    `date`,
    `tax`,
    `total_amount`,
    `invoicing`,
    `how_paid`,
    `how_much_paid`
  )
VALUES
  (
    3,
    1,
    2,
    1,
    3,
    0,
    '2022/04/18-16:35',
    0,
    300.00,
    0,
    'Efectivo',
    300.00
  );
INSERT INTO
  `sell` (
    `idsell`,
    `id_user`,
    `id_customer`,
    `id_branch`,
    `number_check`,
    `serie_check`,
    `date`,
    `tax`,
    `total_amount`,
    `invoicing`,
    `how_paid`,
    `how_much_paid`
  )
VALUES
  (
    5,
    1,
    2,
    1,
    5,
    0,
    '2022/04/20-18:02',
    0,
    150.00,
    0,
    'Efectivo',
    150.00
  );
INSERT INTO
  `sell` (
    `idsell`,
    `id_user`,
    `id_customer`,
    `id_branch`,
    `number_check`,
    `serie_check`,
    `date`,
    `tax`,
    `total_amount`,
    `invoicing`,
    `how_paid`,
    `how_much_paid`
  )
VALUES
  (
    6,
    1,
    2,
    1,
    6,
    0,
    '2022/04/20-18:08',
    0,
    150.00,
    0,
    'Efectivo',
    150.00
  );
INSERT INTO
  `sell` (
    `idsell`,
    `id_user`,
    `id_customer`,
    `id_branch`,
    `number_check`,
    `serie_check`,
    `date`,
    `tax`,
    `total_amount`,
    `invoicing`,
    `how_paid`,
    `how_much_paid`
  )
VALUES
  (
    7,
    1,
    2,
    1,
    7,
    0,
    '2022/04/20-18:10',
    0,
    300.00,
    0,
    'Efectivo',
    300.00
  );
INSERT INTO
  `sell` (
    `idsell`,
    `id_user`,
    `id_customer`,
    `id_branch`,
    `number_check`,
    `serie_check`,
    `date`,
    `tax`,
    `total_amount`,
    `invoicing`,
    `how_paid`,
    `how_much_paid`
  )
VALUES
  (
    8,
    1,
    2,
    1,
    8,
    0,
    '2022/04/20-18:11',
    0,
    150.00,
    0,
    'Cuenta Corriente',
    0.00
  );
INSERT INTO
  `sell` (
    `idsell`,
    `id_user`,
    `id_customer`,
    `id_branch`,
    `number_check`,
    `serie_check`,
    `date`,
    `tax`,
    `total_amount`,
    `invoicing`,
    `how_paid`,
    `how_much_paid`
  )
VALUES
  (
    9,
    1,
    2,
    1,
    9,
    0,
    '2022/04/20-18:29',
    0,
    300.00,
    0,
    'Cuenta Corriente',
    0.00
  );
INSERT INTO
  `sell` (
    `idsell`,
    `id_user`,
    `id_customer`,
    `id_branch`,
    `number_check`,
    `serie_check`,
    `date`,
    `tax`,
    `total_amount`,
    `invoicing`,
    `how_paid`,
    `how_much_paid`
  )
VALUES
  (
    10,
    1,
    2,
    1,
    10,
    0,
    '2022/04/20-18:32',
    0,
    600.00,
    0,
    'Tarjeta',
    0.00
  );
INSERT INTO
  `sell` (
    `idsell`,
    `id_user`,
    `id_customer`,
    `id_branch`,
    `number_check`,
    `serie_check`,
    `date`,
    `tax`,
    `total_amount`,
    `invoicing`,
    `how_paid`,
    `how_much_paid`
  )
VALUES
  (
    11,
    1,
    1,
    1,
    11,
    0,
    '2022/04/21-20:37',
    0,
    9600.00,
    0,
    'Efectivo',
    9600.00
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sell_product
# ------------------------------------------------------------

INSERT INTO
  `sell_product` (
    `idsell_product`,
    `id_product`,
    `id_sell`,
    `quantity`,
    `price`
  )
VALUES
  (1, 1, 2, 1, 150.00);
INSERT INTO
  `sell_product` (
    `idsell_product`,
    `id_product`,
    `id_sell`,
    `quantity`,
    `price`
  )
VALUES
  (2, 1, 5, 1, 150.00);
INSERT INTO
  `sell_product` (
    `idsell_product`,
    `id_product`,
    `id_sell`,
    `quantity`,
    `price`
  )
VALUES
  (3, 1, 6, 1, 150.00);
INSERT INTO
  `sell_product` (
    `idsell_product`,
    `id_product`,
    `id_sell`,
    `quantity`,
    `price`
  )
VALUES
  (4, 1, 7, 2, 150.00);
INSERT INTO
  `sell_product` (
    `idsell_product`,
    `id_product`,
    `id_sell`,
    `quantity`,
    `price`
  )
VALUES
  (5, 1, 8, 1, 150.00);
INSERT INTO
  `sell_product` (
    `idsell_product`,
    `id_product`,
    `id_sell`,
    `quantity`,
    `price`
  )
VALUES
  (6, 1, 9, 2, 150.00);
INSERT INTO
  `sell_product` (
    `idsell_product`,
    `id_product`,
    `id_sell`,
    `quantity`,
    `price`
  )
VALUES
  (7, 1, 10, 4, 150.00);
INSERT INTO
  `sell_product` (
    `idsell_product`,
    `id_product`,
    `id_sell`,
    `quantity`,
    `price`
  )
VALUES
  (8, 9789875808850, 11, 5, 1500.00);
INSERT INTO
  `sell_product` (
    `idsell_product`,
    `id_product`,
    `id_sell`,
    `quantity`,
    `price`
  )
VALUES
  (9, 22548024324, 11, 1, 2100.00);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: supplier
# ------------------------------------------------------------

INSERT INTO
  `supplier` (`idsupplier`, `idPeople`)
VALUES
  (1, 3);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: unit-measure
# ------------------------------------------------------------

INSERT INTO
  `unit-measure` (
    `idunit_measure`,
    `long_description`,
    `short_description`
  )
VALUES
  (1, 'Unidad', 'U');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: user
# ------------------------------------------------------------

INSERT INTO
  `user` (
    `iduser`,
    `id_emplooy`,
    `id_user_type`,
    `register_date`,
    `menu_stock`,
    `menu_buys`,
    `menu_sells`,
    `menu_maintenance`,
    `menu_queries`,
    `menu_admin`,
    `menu_invoicing`,
    `username`,
    `password`
  )
VALUES
  (
    1,
    1,
    1,
    '2022-04-15 16:21:10',
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    'admin',
    '$2b$08$uEGBLVCHfuYiCiD0YO17W.oPEG634QwuPjuieDuX84HN7Eb.Ncnx2'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: user-type
# ------------------------------------------------------------

INSERT INTO
  `user-type` (`iduser_type`, `type`)
VALUES
  (1, 'ADMIN');
INSERT INTO
  `user-type` (`iduser_type`, `type`)
VALUES
  (2, 'USER');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

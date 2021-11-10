CREATE SCHEMA `versystem` ;

CREATE TABLE `versystem`.`global` (
  `idglobal` INT NOT NULL AUTO_INCREMENT,
  `empresa` VARCHAR(40) NOT NULL,
  `nombre_impuesto` CHAR(4) NULL,
  `pocentaje_impuesto` SMALLINT NULL,
  PRIMARY KEY (`idglobal`));

CREATE TABLE `versystem`.`tipo-documento` (
  `idtipo-documento` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(20) NOT NULL,
  `operacion` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`idtipo-documento`));

CREATE TABLE `versystem`.`marca` (
  `idmarca` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`idmarca`));

CREATE TABLE `versystem`.`unidad-medida` (
  `idunidad-medida` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `prefijo` CHAR(5) NULL,
  `estado` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idunidad-medida`));

CREATE TABLE `versystem`.`categoria` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  `estado` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`idcategoria`));

CREATE TABLE `versystem`.`sucursal` (
  `idsucursal` INT NOT NULL AUTO_INCREMENT,
  `id-tipo-documento` INT NOT NULL,
  `numero-documento` VARCHAR(15) NOT NULL,
  `direccion` VARCHAR(30) NOT NULL,
  `telefono` INT NULL,
  `email` VARCHAR(45) NULL,
  `representante` VARCHAR(45) NULL,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`idsucursal`),
  INDEX `tipo-documento_idx` (`id-tipo-documento` ASC) VISIBLE,
  CONSTRAINT `id-tipo-documento-sucursal`
    FOREIGN KEY (`id-tipo-documento`)
    REFERENCES `versystem`.`tipo-documento` (`idtipo-documento`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

CREATE TABLE `versystem`.`caja` (
  `idcaja` INT NOT NULL AUTO_INCREMENT,
  `dinero` DECIMAL(19,4) NOT NULL,
  `id-sucursal` INT NOT NULL,
  PRIMARY KEY (`idcaja`),
  INDEX `id-sucursal_idx` (`id-sucursal` ASC) VISIBLE,
  CONSTRAINT `id-sucursal-caja`
    FOREIGN KEY (`id-sucursal`)
    REFERENCES `versystem`.`sucursal` (`idsucursal`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `versystem`.`empleado` (
  `idempleado` INT NOT NULL AUTO_INCREMENT,
  `apellidos` VARCHAR(30) NOT NULL,
  `nombre` VARCHAR(15) NOT NULL,
  `id-tipo-documento` INT NOT NULL,
  `numero-documento` VARCHAR(15) NOT NULL,
  `direccion` VARCHAR(30) NOT NULL,
  `telefono` INT NULL,
  `email` VARCHAR(45) NULL,
  `fecha-nacimiento` DATE NOT NULL,
  `login` VARCHAR(15) NOT NULL,
  `password` VARCHAR(25) NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idempleado`),
  INDEX `id-tipo-documento_idx` (`id-tipo-documento` ASC) VISIBLE,
  CONSTRAINT `id-tipo-documento-empleado`
    FOREIGN KEY (`id-tipo-documento`)
    REFERENCES `versystem`.`tipo-documento` (`idtipo-documento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `versystem`.`tipo-usuario` (
  `idtipo-usuario` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idtipo-usuario`),
  UNIQUE INDEX `tipo_UNIQUE` (`tipo` ASC) VISIBLE);

CREATE TABLE `versystem`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `id-empleado` INT NULL,
  `id-tipo-usuario` INT NULL,
  `fecha-registro` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `menu-almacen` TINYINT NOT NULL DEFAULT 0,
  `menu-compras` TINYINT NOT NULL DEFAULT 0,
  `menu-ventas` TINYINT NOT NULL DEFAULT 0,
  `menu-mantenimiento` TINYINT NOT NULL DEFAULT 0,
  `menu-consulta-compras` TINYINT NOT NULL DEFAULT 0,
  `menu-consulta-ventas` TINYINT NOT NULL DEFAULT 0,
  `menu-admin` TINYINT NOT NULL DEFAULT 0,
  `menu-facturacion` TINYINT NOT NULL DEFAULT 0,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `id-empleado_UNIQUE` (`id-empleado` ASC) VISIBLE,
  INDEX `id-tipo-usuario-usuario_idx` (`id-tipo-usuario` ASC) VISIBLE,
  CONSTRAINT `id-empleado-usuario`
    FOREIGN KEY (`id-empleado`)
    REFERENCES `versystem`.`empleado` (`idempleado`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `id-tipo-usuario-usuario`
    FOREIGN KEY (`id-tipo-usuario`)
    REFERENCES `versystem`.`tipo-usuario` (`idtipo-usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `versystem`.`sucursales-por-usuario` (
  `idsucursales-por-usuario` INT NOT NULL AUTO_INCREMENT,
  `id-usuario` INT NOT NULL,
  `id-sucursal` INT NOT NULL,
  PRIMARY KEY (`idsucursales-por-usuario`),
  INDEX `id-usuario-sucursales-por-usuario_idx` (`id-usuario` ASC) VISIBLE,
  INDEX `id-sucursal-sucursales-por-usuario_idx` (`id-sucursal` ASC) VISIBLE,
  CONSTRAINT `id-usuario-sucursales-por-usuario`
    FOREIGN KEY (`id-usuario`)
    REFERENCES `versystem`.`usuario` (`idusuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `id-sucursal-sucursales-por-usuario`
    FOREIGN KEY (`id-sucursal`)
    REFERENCES `versystem`.`sucursal` (`idsucursal`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `versystem`.`detalle-documento-sucursal` (
  `iddetalle-documento-sucursal` INT NOT NULL AUTO_INCREMENT,
  `id-sucursal` INT NOT NULL,
  `id-tipo-documento` INT NOT NULL,
  `ultima-serie` INT NOT NULL DEFAULT 0,
  `ultimo-numero` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`iddetalle-documento-sucursal`),
  INDEX `id-sucursal-detalle-documento-sucursal_idx` (`id-sucursal` ASC) VISIBLE,
  INDEX `id-tipo-documento-detalle-documento-sucursal_idx` (`id-tipo-documento` ASC) VISIBLE,
  CONSTRAINT `id-sucursal-detalle-documento-sucursal`
    FOREIGN KEY (`id-sucursal`)
    REFERENCES `versystem`.`sucursal` (`idsucursal`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `id-tipo-documento-detalle-documento-sucursal`
    FOREIGN KEY (`id-tipo-documento`)
    REFERENCES `versystem`.`tipo-documento` (`idtipo-documento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `versystem`.`deposito` (
  `iddeposito` INT NOT NULL AUTO_INCREMENT,
  `nombre-deposito` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`iddeposito`));

CREATE TABLE `versystem`.`ubicacion` (
  `idubicacion` INT NOT NULL AUTO_INCREMENT,
  `id-deposito` INT NULL,
  `nombre-lugar` VARCHAR(30) NULL,
  PRIMARY KEY (`idubicacion`),
  INDEX `id-deposito-ubicacion_idx` (`id-deposito` ASC) VISIBLE,
  CONSTRAINT `id-deposito-ubicacion`
    FOREIGN KEY (`id-deposito`)
    REFERENCES `versystem`.`deposito` (`iddeposito`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `versystem`.`persona` (
  `idpersona` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `id-tipo-documento` INT NOT NULL,
  `num-documento` INT NOT NULL,
  `direccion-departamento` VARCHAR(45) NOT NULL,
  `direccion-provincia` VARCHAR(45) NOT NULL,
  `direccion-codigopostal` SMALLINT NOT NULL,
  `direccion-calle` VARCHAR(45) NOT NULL,
  `cuit` INT NOT NULL,
  `telefono` INT NULL,
  `email` VARCHAR(50) NULL,
  `cbu` INT NULL,
  `estado` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idpersona`),
  INDEX `id-tipo-documento-persona_idx` (`id-tipo-documento` ASC) VISIBLE,
  CONSTRAINT `id-tipo-documento-persona`
    FOREIGN KEY (`id-tipo-documento`)
    REFERENCES `versystem`.`tipo-documento` (`idtipo-documento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `versystem`.`cliente` (
  `idcliente` INT NOT NULL AUTO_INCREMENT,
  `id-persona` INT NULL,
  `cuenta-corriente` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`idcliente`),
  INDEX `id-persona-cliente_idx` (`id-persona` ASC) VISIBLE,
  CONSTRAINT `id-persona-cliente`
    FOREIGN KEY (`id-persona`)
    REFERENCES `versystem`.`persona` (`idpersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `versystem`.`proveedor` (
  `idproveedor` INT NOT NULL AUTO_INCREMENT,
  `id-persona` INT NULL,
  PRIMARY KEY (`idproveedor`),
  INDEX `id-persona-proveedor_idx` (`id-persona` ASC) VISIBLE,
  CONSTRAINT `id-persona-proveedor`
    FOREIGN KEY (`id-persona`)
    REFERENCES `versystem`.`persona` (`idpersona`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `versystem`.`articulo` (
  `idarticulo` INT NOT NULL AUTO_INCREMENT,
  `id-categoria` INT NOT NULL,
  `id-unidad-medida` INT NOT NULL,
  `id-marca` INT NOT NULL,
  `id-proveedor` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` TINYTEXT NULL,
  `id-ubicacion` INT NOT NULL,
  `stock-min` DECIMAL(19,2) NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idarticulo`),
  INDEX `id-cateogria-articulo_idx` (`id-categoria` ASC) VISIBLE,
  INDEX `id-unidad-medida-articulo_idx` (`id-unidad-medida` ASC) VISIBLE,
  INDEX `id-marca-articulo_idx` (`id-marca` ASC) VISIBLE,
  INDEX `id-proveedor-articulo_idx` (`id-proveedor` ASC) VISIBLE,
  INDEX `id-ubicacion-articulo_idx` (`id-ubicacion` ASC) VISIBLE,
  CONSTRAINT `id-cateogria-articulo`
    FOREIGN KEY (`id-categoria`)
    REFERENCES `versystem`.`categoria` (`idcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-unidad-medida-articulo`
    FOREIGN KEY (`id-unidad-medida`)
    REFERENCES `versystem`.`unidad-medida` (`idunidad-medida`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-marca-articulo`
    FOREIGN KEY (`id-marca`)
    REFERENCES `versystem`.`marca` (`idmarca`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-proveedor-articulo`
    FOREIGN KEY (`id-proveedor`)
    REFERENCES `versystem`.`proveedor` (`idproveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-ubicacion-articulo`
    FOREIGN KEY (`id-ubicacion`)
    REFERENCES `versystem`.`ubicacion` (`idubicacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `versystem`.`ingreso` (
  `idingreso` INT NOT NULL AUTO_INCREMENT,
  `id-usuario` INT NOT NULL,
  `id-sucursal` INT NOT NULL,
  `id-proveedor` INT NOT NULL,
  `id-tipo-documento` INT NOT NULL,
  `serie-comprobante` VARCHAR(15) NULL,
  `numero-comprobante` INT NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `impuesto` SMALLINT NOT NULL,
  `total` INT NOT NULL,
  `estado` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idingreso`),
  UNIQUE INDEX `estado_UNIQUE` (`estado` ASC) VISIBLE,
  INDEX `id-usuario-ingreso_idx` (`id-usuario` ASC) VISIBLE,
  INDEX `id-sucursal-ingreso_idx` (`id-sucursal` ASC) VISIBLE,
  INDEX `id-proveedor-ingreso_idx` (`id-proveedor` ASC) VISIBLE,
  INDEX `id-tipo-documento-ingreso_idx` (`id-tipo-documento` ASC) VISIBLE,
  CONSTRAINT `id-usuario-ingreso`
    FOREIGN KEY (`id-usuario`)
    REFERENCES `versystem`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-sucursal-ingreso`
    FOREIGN KEY (`id-sucursal`)
    REFERENCES `versystem`.`sucursal` (`idsucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-proveedor-ingreso`
    FOREIGN KEY (`id-proveedor`)
    REFERENCES `versystem`.`proveedor` (`idproveedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-tipo-documento-ingreso`
    FOREIGN KEY (`id-tipo-documento`)
    REFERENCES `versystem`.`tipo-documento` (`idtipo-documento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `versystem`.`pedido` (
  `idpedido` INT NOT NULL AUTO_INCREMENT,
  `id-cliente` INT NOT NULL,
  `id-usuario` INT NOT NULL,
  `id-sucursal` INT NOT NULL,
  `tipo-pedido` VARCHAR(20) NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idpedido`),
  INDEX `id-cliente-pedido_idx` (`id-cliente` ASC) VISIBLE,
  INDEX `id-usuario-pedido_idx` (`id-usuario` ASC) VISIBLE,
  INDEX `id-sucursal-pedido_idx` (`id-sucursal` ASC) VISIBLE,
  CONSTRAINT `id-cliente-pedido`
    FOREIGN KEY (`id-cliente`)
    REFERENCES `versystem`.`cliente` (`idcliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-usuario-pedido`
    FOREIGN KEY (`id-usuario`)
    REFERENCES `versystem`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-sucursal-pedido`
    FOREIGN KEY (`id-sucursal`)
    REFERENCES `versystem`.`sucursal` (`idsucursal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `versystem`.`detalle-ingreso` (
  `iddetalle-ingreso` INT NOT NULL AUTO_INCREMENT,
  `id-ingreso` INT NOT NULL,
  `id-articulo` INT NOT NULL,
  `codigo` INT NOT NULL,
  `serie` INT NOT NULL,
  `descripcion` TINYTEXT NOT NULL,
  `stock-ingreso` DECIMAL(19,2) NOT NULL,
  `stock-actual` DECIMAL(19,2) NOT NULL,
  `precio-ventadistribuidor` DECIMAL(19,4) NOT NULL,
  `precio-ventapublico` DECIMAL(19,4) NOT NULL,
  PRIMARY KEY (`iddetalle-ingreso`),
  INDEX `id-ingreso_idx` (`id-ingreso` ASC) VISIBLE,
  INDEX `id-articulo-detalle-ingreso_idx` (`id-articulo` ASC) VISIBLE,
  CONSTRAINT `id-ingreso-detalle-ingreso`
    FOREIGN KEY (`id-ingreso`)
    REFERENCES `versystem`.`ingreso` (`idingreso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-articulo-detalle-ingreso`
    FOREIGN KEY (`id-articulo`)
    REFERENCES `versystem`.`articulo` (`idarticulo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `versystem`.`detalle-pedido` (
  `iddetalle-pedido` INT NOT NULL AUTO_INCREMENT,
  `id-pedido` INT NOT NULL,
  `id-detalle-ingreso` INT NOT NULL,
  `cantidad` DECIMAL(7,2) NOT NULL,
  `precio-venta` DECIMAL(19,2) NOT NULL,
  `descuento` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`iddetalle-pedido`),
  INDEX `id-pedido-detalle-pedido_idx` (`id-pedido` ASC) VISIBLE,
  INDEX `id-detalle-ingreso-detalle-pedido_idx` (`id-detalle-ingreso` ASC) VISIBLE,
  CONSTRAINT `id-pedido-detalle-pedido`
    FOREIGN KEY (`id-pedido`)
    REFERENCES `versystem`.`pedido` (`idpedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-detalle-ingreso-detalle-pedido`
    FOREIGN KEY (`id-detalle-ingreso`)
    REFERENCES `versystem`.`detalle-ingreso` (`iddetalle-ingreso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `versystem`.`venta` (
  `idventa` INT NOT NULL AUTO_INCREMENT,
  `id-pedido` INT NOT NULL,
  `id-usuario` INT NOT NULL,
  `tipo-venta` VARCHAR(30) NOT NULL,
  `id-tipo-documento` INT NOT NULL,
  `serie-comprobante` INT NULL,
  `num-comprobante` INT NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `impuesto` SMALLINT NULL,
  `total` INT NOT NULL,
  `factura` TINYINT NOT NULL DEFAULT 0,
  `estado` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`idventa`),
  INDEX `id-pedido-venta_idx` (`id-pedido` ASC) VISIBLE,
  INDEX `id-usuario-venta_idx` (`id-usuario` ASC) VISIBLE,
  INDEX `id-tipo-documento-venta_idx` (`id-tipo-documento` ASC) VISIBLE,
  CONSTRAINT `id-pedido-venta`
    FOREIGN KEY (`id-pedido`)
    REFERENCES `versystem`.`pedido` (`idpedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-usuario-venta`
    FOREIGN KEY (`id-usuario`)
    REFERENCES `versystem`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id-tipo-documento-venta`
    FOREIGN KEY (`id-tipo-documento`)
    REFERENCES `versystem`.`tipo-documento` (`idtipo-documento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `versystem`.`credito` (
  `idcredito` INT NOT NULL AUTO_INCREMENT,
  `id-venta` INT NOT NULL,
  `fecha-pago` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total-pago` INT NOT NULL,
  PRIMARY KEY (`idcredito`),
  INDEX `id-venta-credito_idx` (`id-venta` ASC) VISIBLE,
  CONSTRAINT `id-venta-credito`
    FOREIGN KEY (`id-venta`)
    REFERENCES `versystem`.`venta` (`idventa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
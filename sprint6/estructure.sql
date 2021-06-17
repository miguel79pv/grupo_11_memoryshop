-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema memory_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema memory_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `memory_db` DEFAULT CHARACTER SET utf8 ;
USE `memory_db` ;

-- -----------------------------------------------------
-- Table `memory_db`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `memory_db`.`brands` (
  `idmarcas` INT NOT NULL,
  `nombre` VARCHAR(100) NULL,
  `foto` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idmarcas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `memory_db`.`type_memory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `memory_db`.`type_memory` (
  `idtipomemoria` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idtipomemoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `memory_db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `memory_db`.`products` (
  `idproducto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `sku` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `precio` DECIMAL(8,2) NOT NULL,
  `foto` VARCHAR(50) NOT NULL,
  `id_brand` INT NOT NULL,
  `id_type` INT NOT NULL,
  PRIMARY KEY (`idproducto`),
  INDEX `id_brand_idx` (`id_brand` ASC),
  INDEX `id_type_idx` (`id_type` ASC),
  CONSTRAINT `id_brand`
    FOREIGN KEY (`id_brand`)
    REFERENCES `memory_db`.`brands` (`idmarcas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_type`
    FOREIGN KEY (`id_type`)
    REFERENCES `memory_db`.`type_memory` (`idtipomemoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `memory_db`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `memory_db`.`category` (
  `idcategory` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idcategory`));


-- -----------------------------------------------------
-- Table `memory_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `memory_db`.`users` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  `category` INT NOT NULL,
  PRIMARY KEY (`iduser`),
  INDEX `category_idx` (`category` ASC),
  CONSTRAINT `category`
    FOREIGN KEY (`category`)
    REFERENCES `memory_db`.`category` (`idcategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `memory_db`.`brands`
-- -----------------------------------------------------
START TRANSACTION;
USE `memory_db`;
INSERT INTO `memory_db`.`brands` (`idmarcas`, `nombre`, `foto`) VALUES (1, 'ADATA', 'adata_logo.png');
INSERT INTO `memory_db`.`brands` (`idmarcas`, `nombre`, `foto`) VALUES (2, 'KINGSTON', 'kingston_logo.png');
INSERT INTO `memory_db`.`brands` (`idmarcas`, `nombre`, `foto`) VALUES (3, 'BIWIN', 'biwin_logo.png');
INSERT INTO `memory_db`.`brands` (`idmarcas`, `nombre`, `foto`) VALUES (4, 'ROY MEMORY', 'roymemory_logo.png');
INSERT INTO `memory_db`.`brands` (`idmarcas`, `nombre`, `foto`) VALUES (5, 'MICRON', 'micron_logo.png');

COMMIT;


-- -----------------------------------------------------
-- Data for table `memory_db`.`type_memory`
-- -----------------------------------------------------
START TRANSACTION;
USE `memory_db`;
INSERT INTO `memory_db`.`type_memory` (`idtipomemoria`, `nombre`, `descripcion`) VALUES (1, 'SSD', 'Memoria de estado Sólido');
INSERT INTO `memory_db`.`type_memory` (`idtipomemoria`, `nombre`, `descripcion`) VALUES (2, 'RAM', 'Memoria para PC');
INSERT INTO `memory_db`.`type_memory` (`idtipomemoria`, `nombre`, `descripcion`) VALUES (3, 'FLASH', 'Memoria de almacenamiento extraible');

COMMIT;


-- -----------------------------------------------------
-- Data for table `memory_db`.`products`
-- -----------------------------------------------------
START TRANSACTION;
USE `memory_db`;
INSERT INTO `memory_db`.`products` (`idproducto`, `nombre`, `sku`, `descripcion`, `precio`, `foto`, `id_brand`, `id_type`) VALUES (1, 'Kingston FLASH A400', 'KUSBA400', 'Descripcion Kingston A400', 149.50, 'Product-1622084001424.jpg', 2, 3);
INSERT INTO `memory_db`.`products` (`idproducto`, `nombre`, `sku`, `descripcion`, `precio`, `foto`, `id_brand`, `id_type`) VALUES (2, 'ADATA RAM DDR3', 'ARAMDDR3', 'Descripcion Adata DDR3', 1349.50, 'ADATA-FLASH-32G.jpg', 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `memory_db`.`category`
-- -----------------------------------------------------
START TRANSACTION;
USE `memory_db`;
INSERT INTO `memory_db`.`category` (`idcategory`, `name`) VALUES (1, 'admin');
INSERT INTO `memory_db`.`category` (`idcategory`, `name`) VALUES (2, 'usuario');
INSERT INTO `memory_db`.`category` (`idcategory`, `name`) VALUES (3, 'visitante');

COMMIT;


-- -----------------------------------------------------
-- Data for table `memory_db`.`users`
-- -----------------------------------------------------
START TRANSACTION;
USE `memory_db`;
INSERT INTO `memory_db`.`users` (`iduser`, `first_name`, `last_name`, `email`, `password`, `image`, `category`) VALUES (1, 'Miguel', 'Perez', 'miguel@miguel.com', '$2a$10$KaHBcxu2vqMVUiJLNXXnVekCUkqInAHBZqWwmNDFtV.n5TkRe3oce', 'foto1.jpg', 1);
INSERT INTO `memory_db`.`users` (`iduser`, `first_name`, `last_name`, `email`, `password`, `image`, `category`) VALUES (2, 'Angel', 'Velazquez', 'angel@angel.com', '$2a$10$KaHBcxu2vqMVUiJLNXXnVekCUkqInAHBZqWwmNDFtV.n5TkRe3oce', 'foto2.jpg', 1);

COMMIT;


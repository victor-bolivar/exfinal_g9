-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema exfinal_g9
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema exfinal_g9
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `exfinal_g9` DEFAULT CHARACTER SET utf8 ;
USE `exfinal_g9` ;

-- -----------------------------------------------------
-- Table `exfinal_g9`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exfinal_g9`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(64) NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exfinal_g9`.`mensaje`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `exfinal_g9`.`mensaje` (
  `idmensaje` INT NOT NULL,
  `texto` VARCHAR(45) NULL,
  `idusuario` INT NOT NULL,
  PRIMARY KEY (`idmensaje`, `idusuario`),
  INDEX `fk_mensaje_usuario_idx` (`idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_mensaje_usuario`
    FOREIGN KEY (`idusuario`)
    REFERENCES `exfinal_g9`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

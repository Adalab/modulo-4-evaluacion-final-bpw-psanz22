

  
CREATE TABLE IF NOT EXISTS `museum`.`artists` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  `lastname` VARCHAR(90) NULL DEFAULT NULL,
  `movement` VARCHAR(100) NULL DEFAULT NULL,
  `picture` TINYTEXT,
  PRIMARY KEY (`id`));



-- -----------------------------------------------------
-- Table `museum`.`work`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `museum`.`work` (
  `id_work` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(70) NOT NULL,
  `year` INT NULL DEFAULT NULL,
  `image` TINYTEXT,
  `artists_id` INT NOT NULL,
  PRIMARY KEY (`id_work`, `artists_id`),
  INDEX `fk_work_artists_idx` (`artists_id` ASC) VISIBLE,
  CONSTRAINT `fk_work_artists`
    FOREIGN KEY (`artists_id`)
    REFERENCES `museum`.`artists` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
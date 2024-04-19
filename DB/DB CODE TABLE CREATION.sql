CREATE DATABASE IF NOT EXISTS museum;

USE museum;

CREATE TABLE artists (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
lastname VARCHAR(90) NOT NULL,
period VARCHAR(100),
picture TINYTEXT
);

CREATE TABLE work (
id_work INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(70) NOT NULL,
year INT,
image TINYTEXT
);

-------
ALTER TABLE `museum`.`work` 
ADD COLUMN `artists_id` INT(11) NOT NULL AFTER `year`,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id_work`, `artists_id`),
ADD INDEX `fk_work_artists_idx` (`artists_id` ASC) VISIBLE;
;

ALTER TABLE `museum`.`work` 
ADD CONSTRAINT `fk_work_artists`
  FOREIGN KEY (`artists_id`)
  REFERENCES `museum`.`artists` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  -------
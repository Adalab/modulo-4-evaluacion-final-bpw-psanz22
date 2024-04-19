CREATE DATABASE IF NOT EXISTS museum;

USE museum;

CREATE TABLE artists (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50) NOT NULL,
lastname VARCHAR(90) NOT NULL,
movement VARCHAR(100),
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
  
  ALTER TABLE work ADD foreign key (fk_artists_id) references artists(id);
  
  
  
  
  INSERT INTO artists (name, lastname, movement, picture) VALUES ("Remedios", "Varo", "Surrealism",
  "https://vientosur.info/wp-content/uploads/2020/07/30901697407_535b7c90d0_b-697x640.jpg" );
  
   INSERT INTO artists (name, lastname, movement, picture) VALUES ("Camille", "Claudel", "Impressionism",
   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Camille_Claudel.jpg/640px-Camille_Claudel.jpg");
   
    INSERT INTO artists (name, lastname, movement, picture) VALUES("Maruja", "Mallo", "Expressionism, Art Deco", "https://upload.wikimedia.org/wikipedia/commons/2/25/Maruja_Mallo.JPG");
  
   INSERT INTO work (title, year, image, fk_artists_id) VALUES("La creación de las aves", 1957, 
   "https://totenart.com/noticias/wp-content/uploads/2021/09/totenart-remedios-varo.jpg", 1);
   
   INSERT INTO work (title, year, image, fk_artists_id) VALUES("Mujer saliendo del psicoanalista", 1960,
   "https://totenart.com/noticias/wp-content/uploads/2021/05/totenart-mujer-saliendo-del-psicoanalista.jpg", 1);
   
    INSERT INTO work (title, year, image, fk_artists_id) VALUES("Le Valse", 1895, "https://www.reprodart.com/kunst/camille_claudel/der-walzer.jpg", 2 );
    
     INSERT INTO work (title, year, image, fk_artists_id) VALUES("Mujer Rubia", 1951, "https://uploads5.wikiart.org/00219/images/maruja-mallo/mujer-rubia-1951.jpg",
     3);
     
     INSERT INTO work (title, year, image, fk_artists_id) VALUES("Naturaleza Viva", 1943, "https://uploads1.wikiart.org/00219/images/maruja-mallo/naturaleza-viva-1943.jpg!Large.jpg",
     3);
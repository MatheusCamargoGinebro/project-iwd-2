CREATE DATABASE IF NOT EXISTS theIfers;

USE theIfers;

CREATE TABLE IF NOT EXISTS userSite(
	userName varchar(128) not null,
	userEmail varchar(256) not null,
	passworld varchar(128) not null,
	id int auto_increment,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS card(
	cardTitle varchar(18) not null,
	cardDescription varchar(222) not null,
	cardImageURL longtext not null,
	data_armazenamento timestamp DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO card(cardTitle, cardDescription, cardImageURL) VALUES ('Título de Teste','Descrição extragrande de teste.','https://picsum.photos/1680/720'); -- URL de imagem apenas para teste.
select * from userSite;
select * from card;
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
	cardImageURL varchar(1024) null,
	data_armazenamento timestamp DEFAULT CURRENT_TIMESTAMP,
	cardId int auto_increment,
	FOREIGN KEY (cardId) REFERENCES userSite(id)
);

select * from userSite;
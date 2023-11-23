DROP DATABASE IF EXISTS myDatabase;

CREATE DATABASE IF NOT EXISTS myDatabase;

USE myDatabase;

CREATE TABLE
	IF NOT EXISTS user (
		userName varchar(128) not null,
		email varchar(256) not null,
		UserPassword varchar(128) not null,
		id int auto_increment,
		PRIMARY KEY (id)
	);

CREATE TABLE
	IF NOT EXISTS card (
		cardTitle varchar(18) not null,
		cardDescription varchar(222) not null,
		cardImageURL longtext not null,
		data_armazenamento timestamp DEFAULT CURRENT_TIMESTAMP
	);

INSERT INTO
	card (cardTitle, cardDescription, cardImageURL)
VALUES
	(
		'Título de Teste',
		'Descrição extragrande de teste.',
		'https://picsum.photos/1680/720'
	);

-- URL de imagem apenas para teste.
INSERT INTO
	user (userName, email, UserPassword)
VALUES
	('teste', 'teste@gmail.com', '4dM1n@m4g0d0_h7m1');


select
	*
from
	user;

select
	*
from
	card;
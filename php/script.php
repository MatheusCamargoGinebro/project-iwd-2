<?php
// Script PHP para rodar o formulário de cadastro de cards.

ini_set("display_errors", 1);
error_reporting(E_ALL);

$imageTitle = $_GET['imageTitle'];
$imageDescription = $_GET['imageDescription'];

$hostname = 'localhost';
$user = 'root';
$password = ''; // Senha local :)
$database = 'theIfers';

$conn = mysqli_connect($hostname, $user, $password, $database);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());

}

$query ="insert into card (cardTitle, cardDescription) values ('$imageTitle', '$imageDescription')";
$res = mysqli_query($conn, $query);

header("location: http://127.0.0.1:5500/index.html");

die();
?>
<?php
// Script PHP para rodar o formulário de REGISTRO.
ini_set("display_errors", 1);
error_reporting(E_ALL);

$userName = $_GET['userName'];
$userEmail = $_GET['userEmail'];
$newPassword = $_GET['newPassword'];

$hostname = 'localhost';
$user = 'root';
$password = ''; // Senha local :)
$database = 'theIfers';

$conn = mysqli_connect($hostname, $user, $password, $database);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}

$query ="insert into userSite(userName, userEmail, passworld) values ('$userName', '$userEmail', '$newPassword')";
$res = mysqli_query($conn, $query);

header("location: http://127.0.0.1:5500/index.html");

die();
?>
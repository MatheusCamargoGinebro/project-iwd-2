<?php
// Script PHP para rodar o formulário de LOGIN.
ini_set("display_errors", 1);
error_reporting(E_ALL);

$userName = $_GET['userName'];
$password = $_GET['password'];

$hostname = 'localhost';
$user = 'root';
$password = 'ifsp';
$database = 'theIfers';

$conn = mysqli_connect($hostname, $user, $password, $database);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
} else {
    
}

header("location: http://127.0.0.1:5500/index.html");

die();
?>
<?php
ini_set("display_errors", 1);
error_reporting(E_ALL);

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$hostname = 'localhost';
$user = 'root';
$password = 'ifsp'; // Senha local :)
$database = 'myDatabase';

$conn = mysqli_connect($hostname, $user, $password, $database);

if (!$conn) {
    die("Conexão falhou: " . mysqli_connect_error());
}
?>
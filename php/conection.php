<?php
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

    $hostname = 'localhost';
    $user = 'root';
    $password = '0001108917495.sp5'; // Senha local :)
    $database = 'theIfers';

    $conn = mysqli_connect($hostname, $user, $password, $database);

    if (!$conn) {
        die("Conexão falhou: " . mysqli_connect_error());
    }
?>
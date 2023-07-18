<?php
    // Script PHP para rodar o formulário de REGISTRO.
    include('conection.php');

    $userName = $_GET['userName'];
    $userEmail = $_GET['userEmail'];
    $newPassword = $_GET['newPassword'];

    $query ="insert into userSite(userName, userEmail, passworld) values ('$userName', '$userEmail', '$newPassword')";
    $res = mysqli_query($conn, $query);

    header("location: http://127.0.0.1:5500/index.html");

    die();
?>
<?php
include_once("../connection.php");

if (!isset($_SESSION)) {
    session_start();
}

if (isset($_SESSION['id']) && isset($_SESSION['email'])) {
    $sql = "SELECT * FROM `user` WHERE `email` = '" . $_SESSION['email'] . "'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        http_response_code(200);
        echo json_encode(array("session" => true, "email" => $_SESSION['email']));
    } else {
        http_response_code(200);
        echo json_encode(array("session" => false, "email" => $_SESSION['email']));
    }
} else {
    http_response_code(201);
    echo json_encode(array("session" => false, "email" => ""));
}

mysqli_close($conn);
exit();
?>
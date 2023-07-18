<?php
    header('Content-type: application/json');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Origin: http://127.0.0.1:5000');
    header('Access-Control-Allow-Methods: POST');

    // Conectando ao banco de dados:
    include('conection.php');

    // Receber os dados do objeto enviado pelo código JavaScript
    $jsonData = file_get_contents('php://input');
    $formValues = json_decode($jsonData, true);

    // Acessar os valores do objeto
    $title = $formValues['title'];
    $description = $formValues['description'];
    $image = $formValues['image'];

    $query ="insert into card (cardTitle, cardDescription, cardImageURL) values ('$title', '$description', '$image')";
    $res = mysqli_query($conn, $query);

    http_response_code(201);
    echo json_encode(array('sucess' => true));
    exit();

    header("location: http://127.0.0.1:5500/index.html");

    die();
?>
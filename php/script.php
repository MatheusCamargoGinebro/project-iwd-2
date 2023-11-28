<?php
    ini_set("display_errors", 1);
    error_reporting(E_ALL);

    header('Content-type: application/json');
    header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    
    
    // Conectando ao banco de dados:
    include('conection.php');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Receber os dados do objeto enviado pelo código JavaScript
        $jsonData = file_get_contents('php://input');
        $formValues = json_decode($jsonData, true);

        // Acessar os valores do objeto

        $title = $formValues['title'];
        $description = $formValues['description'];
        $image = $formValues['image'];
        
        if($title != '' && $description != '' && $image != '' && $image && $image != null){
            $query ="insert into card (cardTitle, cardDescription, cardImageURL) values ('$title', '$description', '$image')";
            $res = mysqli_query($conn, $query);
            
            http_response_code(201);
            echo json_encode(array(
                'sucess' => true,
                'error' => null));
                
            header("location: http://127.0.0.1:5500/index.html)");
            exit();
        } else {
            http_response_code(400);
            echo json_encode(array(
                'sucess' => false,
                'error' => 'Preencha todos os campos'));
                exit();
        }
    }

?>
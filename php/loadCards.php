<?php
    include('conection.php');

    header('Content-type: application/json');
    header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    
    // Puxando os dados do banco de dados:
    $sql = "SELECT * FROM card";
    
    // Armazenando os dados em uma variável:
    $results = mysqli_query($conn, $sql);

    // Criando um array para armazenar os dados:
    $index = 0; 
    // Criando um array para armazenar os dados:
    while($record = mysqli_fetch_row($results)){
        $question = array(
            'cardTitle' => $record[0],
            'cardDescription' => $record[1],
            'cardImageURL' => $record[2],
            'data_armazenamento' => $record[3],
        );
        $questions[$index] = $question;
        $index++; 
    }

    // Fechando a conexão:
    mysqli_close($conn);

    // Retornando o JSON para o JavaScript:
    $Data =  json_encode($questions, JSON_PRETTY_PRINT);
    echo $Data;
?>  
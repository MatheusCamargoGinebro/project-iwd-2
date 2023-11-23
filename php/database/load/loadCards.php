<?php
include_once("../../connection.php");
    
    // Puxando os dados do banco de dados:
    $sql = "SELECT * FROM card";
    
    // Armazenando os dados em uma variável:
    $results = mysqli_query($conn, $sql);
    $cardsQuantidity = mysqli_num_rows($results);

    $cards = array();
    if( $cardsQuantidity > 0) {
        while($row = mysqli_fetch_array($results)) {
            $cards[] = $row;
        }
        http_response_code(200);
    } else {
        http_response_code(201);
    }
    echo json_encode(array("cards" => $cards, "size" => $cardsQuantidity));

?>  
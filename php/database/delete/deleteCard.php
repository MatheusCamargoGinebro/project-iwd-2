<?php
include_once("../../connection.php");

$data = json_decode(file_get_contents('php://input'), true);

if(isset($data['id'])){
    $id = $data['id'];

    $sql = "DELETE FROM `card` WHERE `id` = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt,"i", $id);
    $result = mysqli_stmt_execute($stmt);

    if($result){
        http_response_code(200);
        echo json_encode(array("status" => true, "message" => "Card deletado com sucesso."));
    } else {
        http_response_code(201);
        echo json_encode(array("status" => false, "message" => "Erro ao deletar card."));
    }
} else {
    http_response_code(201);
    echo json_encode(array("status" => false, "message" => "Dados vazios."));
}
?>
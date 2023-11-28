<?php
include_once('../../connection.php');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id']) && isset($data['title']) && isset($data['description']) && isset($data['image'])) {
    $id = $data['id'];
    $newTitle = $data['title'];
    $newDescription = $data['description'];
    $newImage = $data['image'];

    $sql = "UPDATE `card` SET `cardTitle` = ?, `cardDescription` = ?, `cardImageURL` = ? WHERE `id` = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt,"sssi", $newTitle, $newDescription, $newImage, $id);
    mysqli_stmt_execute($stmt);

    if ($stmt) {
        http_response_code(200);
        echo json_encode(array("status" => true, "message" => "Card atualizado com sucesso."));
    } else {
        http_response_code(201);
        echo json_encode(array("status" => false, "message" => "Erro ao atualizar card."));
    }

    mysqli_stmt_close($stmt);
} else {
    http_response_code(201);
    echo json_encode(array("status" => false, "message" => "Dados vazios."));
}
mysqli_close($conn);
exit();
?>
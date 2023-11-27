<?php
include_once('../../connection.php');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['title']) && isset($data['description']) && isset($data['image'])) {
    $title = $data['title'];
    $description = $data['description'];
    $image = $data['image'];

    $sql = "INSERT INTO `card` (`cardTitle`, `cardDescription`, `cardImageURL`) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sss", $title, $description, $image);
    mysqli_stmt_execute($stmt);

    if ($stmt) {
        http_response_code(200);
        echo json_encode(array("status" => true, "message" => "Card cadastrado com sucesso."));
    } else {
        http_response_code(201);
        echo json_encode(array("status" => false, "message" => "Erro ao cadastrar card."));
    }

    mysqli_stmt_close($stmt);
} else {
    http_response_code(201);
    echo json_encode(array("status" => false, "message" => "Dados vazios."));
}
mysqli_close($conn);
exit();
?>
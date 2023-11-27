<?php
include_once('../../connection.php');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['name']) && isset($data['email']) && isset($data['password'])) {
    // Checking availability of email and name using prepared statements
    $sql = "SELECT * FROM `user` WHERE `email` = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $data['email']);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $emailStatus = (mysqli_num_rows($result) == 0);

    $sql = "SELECT * FROM `user` WHERE `userName` = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $data['name']);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $nameStatus = (mysqli_num_rows($result) == 0);

    mysqli_stmt_close($stmt);

    if (!$emailStatus || !$nameStatus) {
        http_response_code(201);
        echo json_encode(array("session" => false, "level" => 0, "message" => "Dados já cadastrados.", "email" => $emailStatus, "name" => $nameStatus));
    } else {
        $sql = "INSERT INTO `user` (`userName`, `email`, `UserPassword`) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "sss", $data['name'], $data['email'], $data['password']);
        mysqli_stmt_execute($stmt);

        if ($stmt) {
            mysqli_stmt_close($stmt);

            $sql = "SELECT * FROM `user` WHERE `userName` = ? AND `UserPassword` = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "ss", $data['name'], $data['password']);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if (mysqli_num_rows($result) == 1) {
                $usuario = mysqli_fetch_assoc($result);
                if (!isset($_SESSION)) {
                    session_start();
                }
        
                $_SESSION['userName'] = $usuario['userName'];
                $_SESSION['email'] = $usuario['email'];
                $_SESSION['id'] = $usuario['id'];

                http_response_code(200);
                echo json_encode(array("session" => true, "level" => 1, "message" => "Cadastro realizado com sucesso.", "email" => $emailStatus, "name" => $nameStatus));
            } else {
                http_response_code(201);
                echo json_encode(array("session" => false, "level" => 0, "message" => "Erro ao iniciar a sessão.", "email" => $emailStatus, "name" => $nameStatus));
            }
        } else {
            http_response_code(201);
            echo json_encode(array("session" => false, "level" => 0, "message" => "Erro ao cadastrar.", "email" => $emailStatus, "name" => $nameStatus));
        }
    }
} else {
    http_response_code(201);
    echo json_encode(array("session" => false, "level" => 0, "message" => "Dados vazios.", "email" => false, "name" => false));
}

mysqli_close($conn);
exit();
?>
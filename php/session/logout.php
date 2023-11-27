<?php
if (!isset($_SESSION)) {
    session_start();
}

session_destroy();

echo json_encode(array("session" => false, "message" => "Sessão encerrada com sucesso."));

header("location: http://localhost:5000");
exit();
?>
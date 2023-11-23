<?php
if (!isset($_SESSION)) {
    session_start();
}

session_destroy();

echo json_encode(array("session" => false, "message" => "Sessão encerrada com sucesso."));
exit();
?>
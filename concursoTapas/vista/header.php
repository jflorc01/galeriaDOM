<?php
    session_start();
    if(!isset($_SESSION['user'])){
        $_SESSION['user'] = "Invitado";
        $_SESSION['rol'] = "invitado";
    }

    $user = $_SESSION['user'];
    $rol = $_SESSION['rol'];
    require_once("../controlador/funciones.php");

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="../public/img/logotipo.svg">
    <title>Concurso de tapas</title>
</head>
<body>
    

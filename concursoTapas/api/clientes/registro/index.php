<?php

    require_once "../../clases/Conexion.php";
    $con = new Conexion();

    // Registro de usuario
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if(isset($_POST['usuario']) && isset($_POST['pass']) && isset($_POST['email'])){
            $usuario = $_POST['usuario'];
            $pass = $_POST['pass'];
            $email = $_POST['email'];

            $passHash = hash("sha512", $pass);

            $sql = "INSERT INTO clientes (nombre_usuario, contrasena, tipo, email) VALUES ('$usuario', '$passHash', 'user', '$email')";
            
            try{

                $con->query($sql);
                if($con->affected_rows > 0){
                    header("HTTP/1.1 201 Created");
                    echo json_encode($con->insert_id);
                }else{
                    header("HTTP/1.1 500 Internal Server Error");
                }

            }catch(mysqli_sql_exception $e){
                header("HTTP/1.1 400 Bad Request");
            }
        }else{
            header("HTTP/1.1 400 Bad Request");
        }
        exit;
    }
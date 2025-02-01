<?php
    require_once "../../clases/Conexion.php";
    require_once "../../../vendor/autoload.php";
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    
    $con = new Conexion();
    $secret = "miclavesecreta";
    $alg = "HS256";

    // Inicio de sesión
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if(!isset($_POST['user']) || !isset($_POST['pass'])){
            header("HTTP/1.1 400 Bad Request");
            exit;
        }

        try{
            $sql = "SELECT * FROM clientes WHERE nombre_usuario = '{$_POST['user']}'";
            $result = $con->query($sql);

            if($result && $result->num_rows > 0){
                $datos = $result->fetch_assoc();
                $passHash = $datos['contrasena'];

                if($passHash === hash('sha512', $_POST['pass'])){
                    
                    $payload = [
                        "id" => $datos['id_cliente'],
                        "user" => $datos['nombre_usuario'],
                        "rol" => $datos['tipo'],
                        "email" => $datos['email'],
                    ];                 
                    
                    $jwt = JWT::encode($payload, $secret, $alg);
                    echo json_encode(["token" => $jwt]);

                    header("HTTP/1.1 200 OK");
                }else{
                    header("HTTP/1.1 401 Unauthorized");
                }

            }else{
                header("HTTP/1.1 404 Not Found");
            }
        }catch(mysqli_sql_exception $e){
            header("HTTP/1.1 500 Internal Server Error");
        }
    }



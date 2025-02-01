<?php

    require_once "../clases/Conexion.php";
    require_once "../../vendor/autoload.php";
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    $con = new Conexion();
    $secret = "miclavesecreta";
    $alg = "HS256";

    // Registrar consumo
    if($_SERVER['REQUEST_METHOD'] === "POST"){
        $headers = getallheaders();

        if(isset($_POST['id_tapa']) && isset($_POST['fecha']) && isset($_POST['hora']) && isset($_POST['valoracion'])){

            $id_tapa = $_POST['id_tapa'];
            $fecha = $_POST['fecha'];
            $hora = $_POST['hora'];
            $valoracion = $_POST['valoracion'];

            if(isset($headers['Authorization'])){
                $jwt = trim(trim($headers['Authorization'], "Bearer"));
                echo "<p>---$jwt---</p>";

                try{
                    $payload = JWT::decode($jwt, new Key($secret, $alg));
                    echo "<pre>";
                    var_dump($payload);
                    echo "</pre>";

                    $id_cliente = $payload->id;

                    $sql = "INSERT INTO consumos (cliente, tapa, fecha, hora, valoracion) 
                        VALUES ('$id_cliente', '$id_tapa', '$fecha', '$hora', '$valoracion')";
                    
                    try{
                        $con->query($sql);
                        if($con->affected_rows > 0){
                            header("HTTP/1.1 201 Created");
                            echo json_encode($con->insert_id);
                        }else{
                            header("HTTP/1.1 500 Internal Server Error");
                            exit;
                        }
                    }catch(mysqli_sql_exception $e){
                        header("HTTP/1.1 400 Bad Request");
                        exit;
                    }  

                }catch(Exception $e){
                    header("HTTP/1.1 401 Unauthorized");
                    exit;
                }
            }else{
                header("HTTP/1.1 401 Unauthorized");
                exit;
            }
        }else{
            header("HTTP/1.1 400 Bad Request");
            exit;
        }
    }

    // Obtener consumiciones de usuario
    if($_SERVER['REQUEST_METHOD'] === "GET"){
        $headers = getallheaders();

        if(isset($headers['Authorization'])){
            $jwt = trim(trim($headers['Authorization'], "Bearer"));

            try{
                $payload = JWT::decode($jwt, new Key($secret, $alg));
                $id_cliente = $payload->id;

                $sql = "SELECT * FROM consumos WHERE cliente = '$id_cliente'";
                try{
                    $result = $con->query($sql);

                    if($result && $result->num_rows > 0){
                        $consumos = $result->fetch_all(MYSQLI_ASSOC);
                        header("HTTP/1.1 200 OK");
                        echo json_encode($consumos);
                    }else{
                        header("HTTP/1.1 404 Not Found");
                    }
                }catch(mysqli_sql_exception $e){
                    header("HTTP/1.1 500 Internal Server Error");
                }
            }catch(Exception $e){
                header("HTTP/1.1 401 Unauthorized");
                exit;
            }

        }else{
            header("HTTP/1.1 401 Unauthorized");
            exit;
        }
    }
<?php

    require_once "../clases/Conexion.php";
    require_once "../../vendor/autoload.php";
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    $con = new Conexion();
    $secret = "miclavesecreta";
    $alg = "HS256";

    // Listar bares
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        try{
            
            $sql = "SELECT * FROM bares WHERE 1 ";

            if(count($_GET) === 1 || count($_GET) === 0){
                if(isset($_GET['id'])){
                    $sql .= "AND id_bar = '{$_GET['id']}' ";
                }

                if(isset($_GET['nombre'])){
                    $sql .= "AND nombre LIKE '%{$_GET['nombre']}%'";
                }
            }else{
                header("HTTP/1.1 400 Bad Request");
                exit;
            }

            $result = $con->query($sql);
            if($result && $result->num_rows > 0){
                $bares = $result->fetch_all(MYSQLI_ASSOC);
                header('HTTP/1.1 200 OK');
                echo json_encode($bares);
            }else{
                header('HTTP/1.1 404 Not Found');
            }
        }catch(mysqli_sql_exception $e){
            header('HTTP/1.1 500 Internal Server Error');
        }
        exit;
    }

    // Insertar un nuevo bar (Solo para admins)
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $headers = getallheaders();

        if(isset($headers['Authorization'])){
            $jwt = trim(trim($headers['Authorization'], "Bearer"));
            
            if(isset($_POST['nombre']) && isset($_POST['direccion']) && 
            isset($_POST['telefono']) && isset($_POST['hora_apertura']) && 
            isset($_POST['hora_cierre'])){
                
                try{
                    $payload = JWT::decode($jwt, new Key($secret, $alg));
                
                    if($payload->rol === 'admin'){

                        $nombre = $_POST['nombre'];
                        $direccion = $_POST['direccion'];
                        $telefono = $_POST['telefono'];
                        $hora_apertura = $_POST['hora_apertura'];
                        $hora_cierre = $_POST['hora_cierre'];

                        $sql = "INSERT INTO bares (nombre, direccion, telefono, hora_apertura, hora_cierre)
                            VALUES ('$nombre', '$direccion', '$telefono', '$hora_apertura', '$hora_cierre')";
                        
                        try{
                            $con->query($sql);
                            if($con->affected_rows > 0){
                                header('HTTP/1.1 201 Created');
                                echo json_encode($con->insert_id);
                            }else{
                                header('HTTP/1.1 500 Internal Server Error');
                                exit;
                            }
                        }catch(mysqli_sql_exception $e){
                            header('HTTP/1.1 400 Bad Request');
                            exit;
                        }

                    }else{
                        header('HTTP/1.1 401 Unauthorized');
                        exit;
                    }

                }catch(Exception $e){
                    header('HTTP/1.1 401 Unauthorized');
                }

            }else{
                header('HTTP/1.1 400 Bad Request');
                exit;
            }
        }else{
            header('HTTP/1.1 401 Unauthorized');
            exit;
        }
    }

    // Actualizar un bar (Solo para admins)
    if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        parse_str(file_get_contents('php://input'), $put);
        $headers = getallheaders();

        if(isset($headers['Authorization'])){
            $jwt = trim(trim($headers['Authorization'], "Bearer"));
            
            if(isset($put['id']) && isset($put['nombre']) && isset($put['direccion']) && 
            isset($put['telefono']) && isset($put['hora_apertura']) && isset($put['hora_cierre'])){
                
                try{
                    $payload = JWT::decode($jwt, new Key($secret, $alg));
                
                    if($payload->rol === 'admin'){

                        $id = $put['id'];
                        $nombre = $put['nombre'];
                        $direccion = $put['direccion'];
                        $telefono = $put['telefono'];
                        $hora_apertura = $put['hora_apertura'];
                        $hora_cierre = $put['hora_cierre'];

                        $sql = "UPDATE bares SET nombre = '$nombre', direccion = '$direccion', telefono = '$telefono', 
                            hora_apertura = '$hora_apertura', hora_cierre = '$hora_cierre' WHERE id_bar = '$id'";
                        
                        try{
                            $con->query($sql);
                            if($con->affected_rows > 0){
                                echo json_encode($id);
                                header('HTTP/1.1 200 OK');
                            }else{
                                header('HTTP/1.1 500 Internal Server Error');
                                exit;
                            }
                        }catch(mysqli_sql_exception $e){
                            header('HTTP/1.1 400 Bad Request');
                            exit;
                        }

                    }else{
                        header('HTTP/1.1 401 Unauthorized');
                        exit;
                    }

                }catch(Exception $e){
                    header('HTTP/1.1 401 Unauthorized');
                }

            }else{
                header('HTTP/1.1 400 Bad Request');
                exit;
            }
        }else{
            header('HTTP/1.1 401 Unauthorized');
            exit;
        }
    }

    // Eliminar un bar (Solo para admins)
    if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        $headers = getallheaders();

        if(isset($headers['Authorization'])){
            $jwt = trim(trim($headers['Authorization'], "Bearer"));
            
            if(isset($_GET['id'])){
                
                try{
                    $payload = JWT::decode($jwt, new Key($secret, $alg));
                
                    if($payload->rol === 'admin'){

                        $id = $_GET['id'];

                        $sql = "DELETE FROM bares WHERE id_bar = '$id'";
                        
                        try{
                            $con->query($sql);
                            if($con->affected_rows > 0){
                                echo json_encode($id);
                                header('HTTP/1.1 200 OK');
                            }else{
                                header('HTTP/1.1 500 Internal Server Error');
                                exit;
                            }
                        }catch(mysqli_sql_exception $e){
                            header('HTTP/1.1 404 Bad Request');
                            exit;
                        }

                    }else{
                        header('HTTP/1.1 401 Unauthorized');
                        exit;
                    }

                }catch(Exception $e){
                    header('HTTP/1.1 401 Unauthorized');
                }

            }else{
                header('HTTP/1.1 400 Bad Request');
                exit;
            }
        }else{
            header('HTTP/1.1 401 Unauthorized');
            exit;
        }
    }
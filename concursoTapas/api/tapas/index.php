<?php

    require_once "../clases/Conexion.php";
    require_once "../../vendor/autoload.php";
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    $con = new Conexion();
    $secret = "miclavesecreta";
    $alg = "HS256";

    // Listar tapas
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        try{
            $sql = "SELECT * FROM tapas WHERE 1 ";
            $limit = 6;

            if(count($_GET) === 1 || count($_GET) === 0){
                if(isset($_GET['id'])){
                    $sql .= "AND id_tapa = '{$_GET['id']}' ";
                }
                if(isset($_GET['nombre'])){
                    $sql .= "AND nombre LIKE '%{$_GET['nombre']}%' ";
                }
                if(isset($_GET['bar'])){
                    $sql .= "AND bar = '{$_GET['bar']}' ";
                }
            }elseif(count($_GET) === 2){
                if(isset($_GET['nombre']) && isset($_GET['pag'])){
                    if($_GET['pag'] == 0){
                        $sql .= "AND nombre LIKE '%{$_GET['nombre']}%'";
                    }else{
                        $page = (int)$_GET['pag'];
                        $offset = ($page - 1) * $limit;
                        // $sql .= " LIMIT $limit OFFSET $offset";
                        $sql .= "AND nombre LIKE '%{$_GET['nombre']}%' LIMIT $limit OFFSET $offset";
                    }
                    
                }else{
                    header("HTTP/1.1 400 Bad Request");
                    exit;
                }
            }else{
                header("HTTP/1.1 400 Bad Request");
                exit;
            }

            // Paginación
            
            // if (isset($_GET['pag'])) {
            //     $page = (int)$_GET['pag'];
            //     $offset = ($page - 1) * $limit;
            //     $sql .= " LIMIT $limit OFFSET $offset";
            // }
            // echo $sql;

            $result = $con->query($sql);
            if($result && $result->num_rows > 0){
                $tapas = $result->fetch_all(MYSQLI_ASSOC);
                header("HTTP/1.1 200 OK");
                echo json_encode($tapas);
                
            }
        }catch(mysqli_sql_exception $e){
            header("HTTP/1.1 500 Internal Server Error $e");
            exit;
        }
    }

    // Insertar una nueva tapa (Solo para admins)
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $headers = getallheaders();

        if(isset($headers['Authorization'])){
            $jwt = trim(trim($headers['Authorization'], "Bearer"));

            if(isset($_POST['nombre']) && isset($_POST['ingredientes']) && isset($_POST['bar'])){
                try{
                    $payload = JWT::decode($jwt, new Key($secret, $alg));

                    if($payload->rol === 'admin'){
                        $nombre = $_POST['nombre'];
                        $ingredientes = $_POST['ingredientes'];
                        $bar = $_POST['bar'];

                        $sql = "INSERT INTO tapas (nombre, ingredientes, bar) VALUES ('$nombre', '$ingredientes', '$bar')";
                        try{
                            $result = $con->query($sql);

                            if($result){
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
                    }else{
                        header("HTTP/1.1 401 Unauthorized");
                        exit;
                    }
                }catch(Exception $e){
                    header("HTTP/1.1 401 Unauthorized");
                    exit;
                }
            }else{
                header("HTTP/1.1 400 Bad Request");
                exit;
            }
        }else{
            header("HTTP/1.1 401 Unauthorized");
            exit;
        }
    }

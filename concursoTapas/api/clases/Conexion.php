<?php
    Class Conexion extends mysqli {
        private $host = "localhost";
        private $db = "tapleon";
        private $user = "tapleon";
        private $pass = "tapleon";
        public function __construct() {
            try {
                parent::__construct($this->host, $this->user, $this->pass, $this->db);
            } catch (mysqli_sql_exception $e) {
                //echo "ERROR: {$e->getMessage()}";
                header("HTTP/1.1 500 Internal Server Error");
                exit;
            }
        }
    } 
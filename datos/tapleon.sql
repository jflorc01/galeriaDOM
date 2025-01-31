-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 31-01-2025 a las 17:45:32
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tapleon`
--
CREATE DATABASE IF NOT EXISTS `tapleon` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tapleon`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bares`
--

CREATE TABLE `bares` (
  `id_bar` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `latitud` decimal(10,8) DEFAULT NULL,
  `longitud` decimal(11,8) DEFAULT NULL,
  `hora_apertura` time DEFAULT NULL,
  `hora_cierre` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bares`
--

INSERT INTO `bares` (`id_bar`, `nombre`, `direccion`, `telefono`, `latitud`, `longitud`, `hora_apertura`, `hora_cierre`) VALUES
(1, 'Bar Las Torres', 'Av. de Álvaro López Núñez, 25, León', '987234567', 42.59820000, -5.56780000, '12:00:00', '23:30:00'),
(2, 'Restaurante Ezequiel', 'Calle Ancha, 20, León', '987123456', 42.60000000, -5.57100000, '12:00:00', '23:30:00'),
(3, 'Casa Blas', 'C/ Sampiro, 1, León', '987345678', 42.60330000, -5.57550000, '12:00:00', '23:30:00'),
(4, 'Bar La Tizona', 'Calle de Ordoño IV, 10, León', '987456789', 42.60500000, -5.57400000, '12:00:00', '23:30:00'),
(5, 'Camarote Madrid', 'C/ Cervantes, 8, León', '987567890', 42.60350000, -5.57390000, '12:00:00', '23:30:00'),
(6, 'Bar Genarín', 'Plaza del Espolón, León', '987678901', 42.60170000, -5.57450000, '12:00:00', '23:30:00'),
(7, 'El Patio', 'Plaza Torres de Omaña, 2, León', '987789012', 42.60300000, -5.57470000, '12:00:00', '23:30:00'),
(8, 'Café Bar Rúa 11', 'Calle La Rúa, León', '987890123', 42.60180000, -5.57520000, '12:00:00', '23:30:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasena` char(128) NOT NULL,
  `tipo` enum('user','admin') DEFAULT 'user',
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre_usuario`, `contrasena`, `tipo`, `email`) VALUES
(1, 'admin', 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec', 'admin', 'admin@example.com'),
(2, 'user1', 'b14361404c078ffd549c03db443c3fede2f3e534d73f78f77301ed97d4a436a9fd9db05ee8b325c0ad36438b43fec8510c204fc1c1edb21d0941c00e9e2c1ce2', 'user', 'user1@example.com'),
(3, 'user2', '291116775902b38dd09587ad6235cec503fc14dbf9c09cad761f2e5a5755102eaceb54b95ffd179c22652c3910dbc6ed85ddde7e09eef1ecf3ad219225f509f5', 'user', 'user2@example.com'),
(4, 'user3', '8ac4145c8e388ddfe3cd94886f026260d917cab07903c533f3a26945019bc4a50e6f23f266acbb0cbae89130fa3242c9a5145e4218c3ef1deebccb58d1a64a43', 'user', 'user3@example.com'),
(5, 'user4', '6725c0435c585ea54b0dbba81ae7cad2e56257efd6ab10940ffc3e7adc1274b44379a1c1e8f0e5bd1fe01e3774ffe2b2a53f5f31f7cb091a9fd6be55471457d7', 'user', 'user4@example.com'),
(6, 'user5', '4f796267fa62838c0146d10fae3394877ccdb5197be86f20adcc3b0b844ab913a9530ae6b51f3f117d616899befac104daac2dc302e1e42c11451e8612e042e8', 'user', 'user5@example.com'),
(7, 'user6', '98e0de00aaf6c95eaafcd4e99a1258a06cf2c2465badf0c138e5fd5c462bdd27f37573b830b60a23946cf2e0fb77762c1b1daef9b44ff9dd9ca509a64a4069b5', 'user', 'user6@example.com'),
(8, 'user7', 'bfa2c173b6ea6f0231a9695c0dd068c916c40d6f7004eef72c1c84fa8068563ea8a2f24e40ba905e7b44212147fa3fd213e1689a2b14e2660fe3dfec958d61e3', 'user', 'user7@example.com'),
(9, 'user8', '437fdf2893dc62b6290725e12a91ebfd5ba9d55e33bab0a9f8775edb1a43caa508bde707697d77a3f4248bb9112ce03c93e89ff79470695c2debdeb6919b4def', 'user', 'user8@example.com'),
(10, 'user9', 'bc2b45060e6b26332b9296dc418858e3ee4bfcccab7309de9630f67ec756d15ad90c762f4fb027a8a57d1735c310537c8ffe7beaf1fb6138be912cd40d8aa0bb', 'user', 'user9@example.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consumos`
--

CREATE TABLE `consumos` (
  `id_consumo` int(11) NOT NULL,
  `cliente` int(11) DEFAULT NULL,
  `tapa` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `valoracion` int(11) DEFAULT NULL CHECK (`valoracion` between 1 and 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `consumos`
--

INSERT INTO `consumos` (`id_consumo`, `cliente`, `tapa`, `fecha`, `hora`, `valoracion`) VALUES
(1, 1, 1, '2024-10-01', '12:30:00', 5),
(2, 2, 2, '2024-10-02', '13:15:00', 4),
(3, 3, 3, '2024-10-03', '14:45:00', 3),
(4, 4, 4, '2024-10-04', '15:00:00', 5),
(5, 5, 5, '2024-10-05', '16:00:00', 4),
(6, 6, 6, '2024-10-06', '17:30:00', 5),
(7, 7, 7, '2024-10-07', '18:30:00', 3),
(8, 8, 8, '2024-10-08', '19:30:00', 2),
(9, 9, 1, '2024-10-09', '20:30:00', 5),
(10, 10, 2, '2024-10-10', '21:30:00', 4),
(11, 1, 3, '2024-10-11', '22:30:00', 1),
(12, 2, 4, '2024-10-12', '23:30:00', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tapas`
--

CREATE TABLE `tapas` (
  `id_tapa` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `ingredientes` text DEFAULT NULL,
  `bar` int(11) DEFAULT NULL,
  `nombre_bar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tapas`
--

INSERT INTO `tapas` (`id_tapa`, `nombre`, `ingredientes`, `bar`, `nombre_bar`) VALUES
(1, 'Tortilla con pimiento y mayonesa', 'Huevo, patatas, pimiento, mayonesa, sal', 1, 'Bar Las Torres'),
(2, 'Pizza de jamón y queso con arroz', 'Jamón, queso, base de arroz, tomate', 2, 'Restaurante Ezequiel'),
(3, 'Patatas bravas con pimentón', 'Patatas, salsa brava, ajo, pimentón', 3, 'Casa Blas'),
(4, 'Orejas de cerdo guisadas', 'Oreja de cerdo, cebolla, ajo, pimentón', 4, 'Bar La Tizona'),
(5, 'Morcilla con queso de cabra', 'Morcilla, queso de cabra, pan', 5, 'Camarote Madrid'),
(6, 'Patatas con huevo y jamón', 'Patatas, huevo, jamón, aceite de oliva', 6, 'Bar Genarín'),
(7, 'Pan con tomate', 'Pan, tomate, ajo, aceite de oliva', 7, 'El Patio'),
(8, 'Croqueta de Cecina con Queso y Miel', 'Cecina, queso de Valdeón, miel, harina, leche', 8, 'Café Bar Rúa 11'),
(9, 'Patatas con salsa rosa', 'Patatas, mayonesa, ketchup', 1, 'Bar Las Torres'),
(10, 'Bocadillo de jalapeños', 'Pan, jalapeños, queso', 2, 'Restaurante Ezequiel'),
(11, 'Montadito de albóndigas', 'Pan, albóndigas, tomate', 3, 'Casa Blas'),
(12, 'Alitas de pollo', 'Pollo, ajo, pimentón, aceite de oliva', 4, 'Bar La Tizona'),
(13, 'Patatas bravas', 'Patatas, salsa brava, ajo, pimentón', 5, 'Camarote Madrid'),
(14, 'Tortilla con pimiento rojo', 'Huevo, patatas, pimiento rojo, sal', 6, 'Bar Genarín'),
(15, 'Bocadillo de panceta', 'Pan, panceta, aceite de oliva', 7, 'El Patio'),
(16, 'Pulpo con patatas', 'Pulpo, patatas, pimentón, aceite de oliva', 8, 'Café Bar Rúa 11');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bares`
--
ALTER TABLE `bares`
  ADD PRIMARY KEY (`id_bar`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `consumos`
--
ALTER TABLE `consumos`
  ADD PRIMARY KEY (`id_consumo`),
  ADD KEY `cliente` (`cliente`),
  ADD KEY `tapa` (`tapa`);

--
-- Indices de la tabla `tapas`
--
ALTER TABLE `tapas`
  ADD PRIMARY KEY (`id_tapa`),
  ADD KEY `bar` (`bar`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bares`
--
ALTER TABLE `bares`
  MODIFY `id_bar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `consumos`
--
ALTER TABLE `consumos`
  MODIFY `id_consumo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tapas`
--
ALTER TABLE `tapas`
  MODIFY `id_tapa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consumos`
--
ALTER TABLE `consumos`
  ADD CONSTRAINT `consumos_ibfk_1` FOREIGN KEY (`cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE,
  ADD CONSTRAINT `consumos_ibfk_2` FOREIGN KEY (`tapa`) REFERENCES `tapas` (`id_tapa`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tapas`
--
ALTER TABLE `tapas`
  ADD CONSTRAINT `tapas_ibfk_1` FOREIGN KEY (`bar`) REFERENCES `bares` (`id_bar`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

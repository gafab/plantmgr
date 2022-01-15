-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 15-01-2022 a las 21:29:42
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `plantmgr`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `harvests`
--

DROP TABLE IF EXISTS `harvests`;
CREATE TABLE IF NOT EXISTS `harvests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `harvestTypeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `harvestTypeId` (`harvestTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `harvests`
--

INSERT INTO `harvests` (`id`, `quantity`, `createdAt`, `updatedAt`, `harvestTypeId`) VALUES
(2, 5, '2022-01-15 20:59:27', '2022-01-15 20:59:27', 4),
(3, 16, '2022-01-15 21:15:26', '2022-01-15 21:15:26', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `harvest_types`
--

DROP TABLE IF EXISTS `harvest_types`;
CREATE TABLE IF NOT EXISTS `harvest_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `harvest_types`
--

INSERT INTO `harvest_types` (`id`, `createdAt`, `updatedAt`, `type`) VALUES
(1, '2022-01-15 20:49:23', '2022-01-15 20:49:23', 'seed'),
(2, '2022-01-15 20:49:29', '2022-01-15 20:49:29', 'pods'),
(3, '2022-01-15 20:49:33', '2022-01-15 20:49:33', 'fruits'),
(4, '2022-01-15 20:49:39', '2022-01-15 20:49:39', 'leaves');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `histories`
--

DROP TABLE IF EXISTS `histories`;
CREATE TABLE IF NOT EXISTS `histories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `plantId` int(11) DEFAULT NULL,
  `harvestId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `plantId` (`plantId`),
  KEY `harvestId` (`harvestId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `histories`
--

INSERT INTO `histories` (`id`, `date`, `description`, `createdAt`, `updatedAt`, `plantId`, `harvestId`) VALUES
(1, '2021-04-02 00:00:00', 'Harvest of seed pods', '2022-01-15 20:32:32', '2022-01-15 20:54:06', 1, NULL),
(2, '2021-01-10 00:00:00', 'Growing well, first new leaves are visible', '2022-01-15 20:33:06', '2022-01-15 20:33:06', 1, NULL),
(3, '2021-02-15 00:00:00', 'First little seed pods', '2022-01-15 20:33:40', '2022-01-15 20:33:40', 1, NULL),
(5, '2021-04-02 00:00:00', 'Harvest of seed pods', '2022-01-15 20:34:22', '2022-01-15 21:22:48', 1, 3),
(6, '2021-03-25 00:00:00', 'Harvest of leaves', '2022-01-15 21:09:30', '2022-01-15 21:14:48', 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plants`
--

DROP TABLE IF EXISTS `plants`;
CREATE TABLE IF NOT EXISTS `plants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `taxonomyId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `taxonomyId` (`taxonomyId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `plants`
--

INSERT INTO `plants` (`id`, `description`, `createdAt`, `updatedAt`, `taxonomyId`) VALUES
(1, 'First generation of Arugula', '2022-01-15 20:05:32', '2022-01-15 20:07:53', 1),
(2, 'Basil bought at the \"feria\"', '2022-01-15 20:06:00', '2022-01-15 20:06:00', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taxonomies`
--

DROP TABLE IF EXISTS `taxonomies`;
CREATE TABLE IF NOT EXISTS `taxonomies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `genus` varchar(255) NOT NULL,
  `species` varchar(255) NOT NULL,
  `commonName` varchar(255) NOT NULL,
  `commonNameAlt` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `taxonomies_genus_species` (`genus`,`species`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `taxonomies`
--

INSERT INTO `taxonomies` (`id`, `genus`, `species`, `commonName`, `commonNameAlt`, `createdAt`, `updatedAt`) VALUES
(1, 'Eruca', 'vesicaria', 'Arugula', 'Rúcula', '2022-01-15 18:57:55', '2022-01-15 19:30:31'),
(2, 'Ocimum', 'basilicum', 'Basil', 'Albahaca', '2022-01-15 19:31:53', '2022-01-15 19:31:53');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `harvests`
--
ALTER TABLE `harvests`
  ADD CONSTRAINT `harvests_ibfk_1` FOREIGN KEY (`harvestTypeId`) REFERENCES `harvest_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_7` FOREIGN KEY (`plantId`) REFERENCES `plants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_8` FOREIGN KEY (`harvestId`) REFERENCES `harvests` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `plants`
--
ALTER TABLE `plants`
  ADD CONSTRAINT `plants_ibfk_1` FOREIGN KEY (`taxonomyId`) REFERENCES `taxonomies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

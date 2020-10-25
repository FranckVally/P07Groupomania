-- --------------------------------------------------------
-- Hôte :                        localhost
-- Version du serveur:           8.0.20 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour database_development_groupomania
CREATE DATABASE IF NOT EXISTS `database_development_groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `database_development_groupomania`;

-- Listage de la structure de la table database_development_groupomania. posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `attachement` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table database_development_groupomania.posts : ~4 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`id`, `userId`, `content`, `attachement`, `createdAt`, `updatedAt`) VALUES
	(18, 8, 'coucou les collègues !!', NULL, '2020-07-05 00:00:00', '2020-07-05 00:00:00'),
	(19, 8, 'Un autre post pour le test !', NULL, '2020-07-05 00:00:00', '2020-07-05 00:00:00'),
	(20, 8, 'coucou', 'http://localhost:3000/images/icon-left-font-monochrome-black.png1594131851931.png', '2020-07-07 14:24:11', '2020-07-07 14:24:11'),
	(21, 8, 'voila une autre image', 'http://localhost:3000/images/icon-left-font-monochrome-black1.png1594132349217.png', '2020-07-07 14:32:29', '2020-07-07 14:32:29');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Listage de la structure de la table database_development_groupomania. sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table database_development_groupomania.sequelizemeta : ~2 rows (environ)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20200703151721-create-user.js'),
	('20200703152039-create-post.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Listage de la structure de la table database_development_groupomania. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table database_development_groupomania.users : ~4 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `username`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
	(3, 'rafael@gmail.fr', 'Rafael', '$2b$10$lmAV3sv7QqUQwgWnnraMy.crwhbIrU65ZQRXBkUNCdBWmXPESA5nK', 0, '2020-07-04', '2020-07-04'),
	(4, 'nilah@gmail.fr', 'Nilah', '$2b$10$hc86c9MjR/JYA4qGSUyfa.uvlM5LK6Xe1oCSfBkx4lY79V5IJc2Cy', 0, '2020-07-04', '2020-07-04'),
	(8, 'jess735@hotmail.fr', 'Jessica', '$2b$10$TOi.PfNzaafkr4dn88xoGu2XmA/qnkxFGyHUD9fqrpz/kS5Pvg3di', 0, '2020-07-05', '2020-07-05'),
	(9, 'admin@admin.fr', 'Groupomania', '$2b$10$1BHyZ/hzofLfM1Daux.Y1OgVm2UPufdflEGMW0gzmr083b8xR8b0W', 1, '2020-07-07', '2020-07-07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

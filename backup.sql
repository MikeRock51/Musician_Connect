-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: mcc_db
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `mcc_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mcc_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `mcc_db`;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `event_type` varchar(128) NOT NULL,
  `event_date` datetime NOT NULL,
  `event_address` varchar(128) NOT NULL,
  `city_id` varchar(60) NOT NULL,
  `client_id` varchar(60) NOT NULL,
  `musician_id` varchar(60) NOT NULL,
  `completed` tinyint(1) NOT NULL,
  `id` varchar(60) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `city_id` (`city_id`),
  KEY `client_id` (`client_id`),
  KEY `musician_id` (`musician_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`musician_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES ('Birthday Surprise','2023-05-30 15:30:00','FFS Barrack, Area 10','30982a5a-b37c-413c-a188-e73613b55bfc','9f9f171a-84d2-4f2b-90a8-67762ec2c613','48c1ef94-71ab-46d2-b5fc-b79a6d37b7e7',0,'99f1e1fa-9be8-4272-8b6a-81ef04491880','2023-05-25 06:48:36','2023-05-25 06:55:28');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `name` varchar(128) NOT NULL,
  `state_id` varchar(60) NOT NULL,
  `id` varchar(60) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `state_id` (`state_id`),
  CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `states` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES ('Garki','69a38b4d-0633-4e03-bf07-fd46251aa4f0','30982a5a-b37c-413c-a188-e73613b55bfc','2023-05-25 06:24:43','2023-05-25 06:24:45'),('Maitama','69a38b4d-0633-4e03-bf07-fd46251aa4f0','4a580c58-3e5b-4e42-b52b-899eba59e1ba','2023-05-25 06:25:21','2023-05-25 06:25:22'),('Lugbe','69a38b4d-0633-4e03-bf07-fd46251aa4f0','64d54eb8-c33f-4652-86a1-9167f01a744f','2023-05-25 06:24:54','2023-05-25 06:24:56'),('Dutse-Alhaji','69a38b4d-0633-4e03-bf07-fd46251aa4f0','67dbd406-6f1e-4dd4-992d-cbf1c8429781','2023-05-25 06:24:02','2023-05-25 06:24:06'),('Gwarinpa','69a38b4d-0633-4e03-bf07-fd46251aa4f0','c570c39a-1ee1-430d-9548-ddd6bb3e8a44','2023-05-25 06:25:09','2023-05-25 06:25:10'),('Kubwa','69a38b4d-0633-4e03-bf07-fd46251aa4f0','e939420f-52b2-493e-803a-872d2f69fb75','2023-05-25 06:24:31','2023-05-25 06:24:33');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instruments`
--

DROP TABLE IF EXISTS `instruments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instruments` (
  `name` varchar(128) NOT NULL,
  `family` varchar(128) NOT NULL,
  `id` varchar(60) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instruments`
--

LOCK TABLES `instruments` WRITE;
/*!40000 ALTER TABLE `instruments` DISABLE KEYS */;
INSERT INTO `instruments` VALUES ('Viola','String','158c0b3b-6815-48f3-a190-6ca376ffdc3f','2023-05-25 06:33:18','2023-05-25 06:33:19'),('Cello','String','2893ce98-93cf-4314-a29e-7ac7f8196deb','2023-05-25 06:29:55','2023-05-25 06:29:56'),('Drums','Percussion','28d1101f-0125-4a02-80f0-4440cc92a9bb','2023-05-25 06:30:36','2023-05-25 06:30:36'),('Piano','Keyboard','6d05c288-733f-4032-a79b-b74f8e233062','2023-05-25 06:29:18','2023-05-25 06:29:21'),('Voice','Vocal/Wind','6d9c4253-c452-44db-af93-5b4c4947aa9a','2023-05-25 06:32:51','2023-05-25 06:32:52'),('Saxophone','Brass','7478ba21-4710-42d2-b94c-5e8706286c1e','2023-05-25 06:34:26','2023-05-25 06:34:27'),('Tuba','Brass','c3d1e2d7-15d0-45b5-b0ff-3b04d56bf110','2023-05-25 06:33:50','2023-05-25 06:33:51'),('Violin','String','d28cbd61-0ab2-4d67-ab29-68f7f87f31c1','2023-05-25 06:29:33','2023-05-25 06:29:34'),('Trumpet','Brass','e729cfd3-0ce0-4fd7-8de1-4b4c15c75aa6','2023-05-25 06:34:05','2023-05-25 06:34:08'),('Guitar','String','eeb59f2a-5dc0-48cb-81c6-99601a105510','2023-05-25 06:28:24','2023-05-25 06:28:30');
/*!40000 ALTER TABLE `instruments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musicianInstruments`
--

DROP TABLE IF EXISTS `musicianInstruments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musicianInstruments` (
  `user_id` varchar(60) NOT NULL,
  `instrument_id` varchar(60) NOT NULL,
  PRIMARY KEY (`user_id`,`instrument_id`),
  KEY `instrument_id` (`instrument_id`),
  CONSTRAINT `musicianInstruments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `musicianInstruments_ibfk_2` FOREIGN KEY (`instrument_id`) REFERENCES `instruments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musicianInstruments`
--

LOCK TABLES `musicianInstruments` WRITE;
/*!40000 ALTER TABLE `musicianInstruments` DISABLE KEYS */;
INSERT INTO `musicianInstruments` VALUES ('1b6123be-10b7-481b-8972-064eb338de85','6d05c288-733f-4032-a79b-b74f8e233062'),('48c1ef94-71ab-46d2-b5fc-b79a6d37b7e7','6d05c288-733f-4032-a79b-b74f8e233062'),('48c1ef94-71ab-46d2-b5fc-b79a6d37b7e7','6d9c4253-c452-44db-af93-5b4c4947aa9a'),('1b6123be-10b7-481b-8972-064eb338de85','c3d1e2d7-15d0-45b5-b0ff-3b04d56bf110'),('1b6123be-10b7-481b-8972-064eb338de85','d28cbd61-0ab2-4d67-ab29-68f7f87f31c1'),('48c1ef94-71ab-46d2-b5fc-b79a6d37b7e7','eeb59f2a-5dc0-48cb-81c6-99601a105510');
/*!40000 ALTER TABLE `musicianInstruments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `states` (
  `name` varchar(128) NOT NULL,
  `id` varchar(60) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES ('Abuja','69a38b4d-0633-4e03-bf07-fd46251aa4f0','2023-05-25 06:22:32','2023-05-25 06:22:48');
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userType` varchar(20) NOT NULL,
  `firstName` varchar(128) NOT NULL,
  `lastName` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `city_id` varchar(60) NOT NULL,
  `alias` varchar(128) DEFAULT NULL,
  `price_by_hour` int NOT NULL,
  `id` varchar(60) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `city_id` (`city_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Musician','Emmanuel','Mmaneme','ekene@gmail.com','ekeson','30982a5a-b37c-413c-a188-e73613b55bfc','Ekeson Music',30000,'1b6123be-10b7-481b-8972-064eb338de85','2023-05-25 06:43:29','2023-05-25 06:45:32'),('Musician','Michael','Adebayo','mike@gmail.com','password','30982a5a-b37c-413c-a188-e73613b55bfc','Mike Rock Music',50000,'48c1ef94-71ab-46d2-b5fc-b79a6d37b7e7','2023-05-25 06:35:51','2023-05-25 06:41:21'),('Client','Josephine','Azeez','azeez@gmail.com','jose','30982a5a-b37c-413c-a188-e73613b55bfc',NULL,0,'9f9f171a-84d2-4f2b-90a8-67762ec2c613','2023-05-25 06:26:32','2023-05-25 06:26:37');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-25  7:12:20

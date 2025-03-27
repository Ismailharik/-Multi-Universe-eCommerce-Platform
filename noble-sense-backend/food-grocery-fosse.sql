-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: food-grocery-fosse
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_order`
--

DROP TABLE IF EXISTS `_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_order` (
  `id` varchar(255) NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `order_status` enum('COMPLETED','CREATED','PROCESSING') DEFAULT NULL,
  `primary_dish_name` varchar(255) DEFAULT NULL,
  `salted` bit(1) NOT NULL,
  `total_price` float NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `site` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKprpwig2d34d265to98qdg694e` (`user_id`),
  CONSTRAINT `FKprpwig2d34d265to98qdg694e` FOREIGN KEY (`user_id`) REFERENCES `_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_order`
--

LOCK TABLES `_order` WRITE;
/*!40000 ALTER TABLE `_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_user`
--

DROP TABLE IF EXISTS `_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_user` (
  `id` varchar(255) NOT NULL,
  `active` bit(1) NOT NULL,
  `adherent` bit(1) NOT NULL,
  `balance` float NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `ladder` int NOT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','MANAGER','USER') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_k11y3pdtsrjgy8w9b6q4bjwrx` (`email`),
  UNIQUE KEY `UK_smv6iv0phvugvruh5upf10h08` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_user`
--

LOCK TABLES `_user` WRITE;
/*!40000 ALTER TABLE `_user` DISABLE KEYS */;
INSERT INTO `_user` VALUES ('6UVXWV7E',_binary '',_binary '\0',0,NULL,NULL,'Admin',0,'Admin','$2a$10$vXlQwlEI5BgcabytqNg58e1xCQetyxJTy/Ak7/NOrWqE1k3KM/2P2','0607080910','ADMIN'),('Egz4DSNz',_binary '',_binary '',69,'informatique','ismail@gmail.com','ismail',706764587,'harik','$2a$10$8pe8Fk/XRQ5UClkrH6KapOf/2kw462R/pWj.Qi0ExsbsEaSKOtJ1e','058473737','USER'),('hshkk8B8',_binary '',_binary '\0',0,NULL,NULL,'moustapha',0,'MM','$2a$10$PYghWgXpgeLaGdcutxMjROuCgEzth1iRaar.l1sZRk2JZ.OvEtGpG','04848427','MANAGER');
/*!40000 ALTER TABLE `_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `src` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Plats principaple desc','Plat Principale',NULL),(2,'Salades Desc','Les Salades',NULL),(3,'Les entr√©es','Les entr√©es',NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_product_products_item`
--

DROP TABLE IF EXISTS `daily_product_products_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_product_products_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `daily_products_id` bigint DEFAULT NULL,
  `primary_dishes_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf6tph6i9aqk0iivqi349vt4rn` (`daily_products_id`),
  KEY `FKoincbuvbfvh48il88vyprv2j` (`primary_dishes_id`),
  CONSTRAINT `FKf6tph6i9aqk0iivqi349vt4rn` FOREIGN KEY (`daily_products_id`) REFERENCES `daily_products` (`id`),
  CONSTRAINT `FKoincbuvbfvh48il88vyprv2j` FOREIGN KEY (`primary_dishes_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_product_products_item`
--

LOCK TABLES `daily_product_products_item` WRITE;
/*!40000 ALTER TABLE `daily_product_products_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `daily_product_products_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_products`
--

DROP TABLE IF EXISTS `daily_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` datetime(6) DEFAULT NULL,
  `expiration_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_products`
--

LOCK TABLES `daily_products` WRITE;
/*!40000 ALTER TABLE `daily_products` DISABLE KEYS */;
INSERT INTO `daily_products` VALUES (1,'2024-01-06 07:00:00.000000','2024-01-06 06:40:00.000000'),(2,'2024-10-01 07:00:00.000000','2024-01-10 10:30:00.000000');
/*!40000 ALTER TABLE `daily_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_products_primary_dishes`
--

DROP TABLE IF EXISTS `daily_products_primary_dishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_products_primary_dishes` (
  `daily_products_id` bigint NOT NULL,
  `primary_dishes_id` bigint NOT NULL,
  KEY `FKmwoy9ml93b5qcft53x14casw1` (`primary_dishes_id`),
  KEY `FKru9dkff2i0us7lq7aywf0ywlh` (`daily_products_id`),
  CONSTRAINT `FKmwoy9ml93b5qcft53x14casw1` FOREIGN KEY (`primary_dishes_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKru9dkff2i0us7lq7aywf0ywlh` FOREIGN KEY (`daily_products_id`) REFERENCES `daily_products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_products_primary_dishes`
--

LOCK TABLES `daily_products_primary_dishes` WRITE;
/*!40000 ALTER TABLE `daily_products_primary_dishes` DISABLE KEYS */;
INSERT INTO `daily_products_primary_dishes` VALUES (1,1),(1,2),(2,1),(2,2);
/*!40000 ALTER TABLE `daily_products_primary_dishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `priority` int NOT NULL,
  `quantity` int NOT NULL,
  `total_price` float NOT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKryn1sdluxcjfeu891k75myheu` (`order_id`),
  KEY `FK551losx9j75ss5d6bfsqvijna` (`product_id`),
  CONSTRAINT `FK551losx9j75ss5d6bfsqvijna` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKryn1sdluxcjfeu891k75myheu` FOREIGN KEY (`order_id`) REFERENCES `_order` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Plat traditionnel marocain compos√© de semoule de bl√© cuite √† la vapeur, servie avec des l√©gumes et de la viande mijot√©s','Couscous',45,0,1),(2,'Rago√ªt mijot√© √† feu doux avec de la viande (poulet, agneau ou b≈ìuf), des fruits, des l√©gumes et des √©pices marocaines, cuit dans un pot en argile traditionnel','Tagine',48,0,1),(3,'Tourte sal√©e-sucr√©e faite avec une p√¢te feuillet√©e, garnie de pigeon ou de poulet, d\'amandes, et assaisonn√©e d\'√©pices aromatiques.','Pastilla',48,0,1),(4,'Soupe riche et consistante √† base de tomates, lentilles, pois chiches et viande, typiquement servie pendant le Ramadan.','Harira',45,0,1),(5,'Boulettes de viande √©pic√©es cuites dans une sauce tomate et poivron, souvent servies avec des ≈ìufs poch√©s par-dessus.','Kefta Mkaouara',45,0,1),(6,'Salade d\'aubergines et de tomates fum√©es, aromatis√©e √† l\'ail, paprika, cumin et huile d\'olive','Zaalouk',0,0,2),(7,'Salade √† base de poivrons et de tomates grill√©s, assaisonn√©e d\'ail et d\'√©pices.','Taktouka',0,0,2),(8,'Salade de carottes √©pic√©e au cumin, paprika et herbes fra√Æches.','Salade de Carottes Marocaine',0,0,2),(9,'Petites p√¢tisseries marocaines triangulaires, farcies de viande, fromage ou l√©gumes','Briouats',0,0,3),(10,'Soupe nourrissante √† base de lentilles, l√©gumes et √©pices marocaines','Soupe de Lentilles Marocaine',0,0,3);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_urls`
--

DROP TABLE IF EXISTS `product_urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_urls` (
  `product_id` bigint NOT NULL,
  `urls` varchar(255) DEFAULT NULL,
  KEY `FK92142hv6ujbpu1uoj1rt9rt3y` (`product_id`),
  CONSTRAINT `FK92142hv6ujbpu1uoj1rt9rt3y` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_urls`
--

LOCK TABLES `product_urls` WRITE;
/*!40000 ALTER TABLE `product_urls` DISABLE KEYS */;
INSERT INTO `product_urls` VALUES (1,'b16569f7-a71c-4425-8dd7-793c3a22aa7a.jpg'),(1,'10becc94-793b-456f-ae03-64ed027a3bf0.png'),(2,'31f79184-a18e-49ca-a1bd-82bd9900aefe.png'),(2,'4ba0ed88-9cd8-4dd7-b432-41313219307a.png'),(3,'e116dbd9-fe98-4a13-8c1d-a000a61b5754.png'),(5,'ed64bbc4-efa7-4090-ae26-e4888c440fce.jpg'),(4,'8ddb7535-c1c9-452d-a8df-b17cc049fba8.png'),(7,'a16194b9-8bef-47df-bec7-53dc3661de29.png'),(8,'4c13b225-c493-4098-bf9a-da935f39756c.png'),(6,'7ea35152-bd8f-49f9-94c7-9c4b99f57e3d.png'),(10,'5547bc0c-10bd-475d-b178-7a8be1de34ef.png'),(9,'9f956db9-1fbc-4f69-878b-8079abc6b746.png');
/*!40000 ALTER TABLE `product_urls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensitives_logs`
--

DROP TABLE IF EXISTS `sensitives_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensitives_logs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `responsible_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensitives_logs`
--

LOCK TABLES `sensitives_logs` WRITE;
/*!40000 ALTER TABLE `sensitives_logs` DISABLE KEYS */;
INSERT INTO `sensitives_logs` VALUES (1,'harik ismail','2024-01-06 12:58:45.965000','updating balance from 0,00 to 58,00 ','MM moustapha'),(2,'harik ismail','2024-01-06 13:10:45.217000','√† modifer le solde de  58,00 √† 69,00 ','MM moustapha');
/*!40000 ALTER TABLE `sensitives_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` binary(16) NOT NULL,
  `expired` bit(1) NOT NULL,
  `revoked` bit(1) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_type` enum('BEARER') DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_pddrhgwxnms2aceeku9s2ewy5` (`token`),
  KEY `FKiblu4cjwvyntq3ugo31klp1c6` (`user_id`),
  CONSTRAINT `FKiblu4cjwvyntq3ugo31klp1c6` FOREIGN KEY (`user_id`) REFERENCES `_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (_binary 'Ü\Î¢@\“M–ëNX\–\\}ã©',_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwic3ViIjoiMDYwNzA4MDkxMCIsImlhdCI6MTcwNDU0MjE0NCwiZXhwIjoxNzA0NjI4NTQ0fQ.0weoUxZZ2wdHJshL9fBnFl_txaqWjRoLsJ0JBChG4qQ','BEARER','6UVXWV7E'),(_binary '<è”•\ƒÒHÓö´QoqIØ',_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwic3ViIjoiMDYwNzA4MDkxMCIsImlhdCI6MTcwNDU0MzE0NiwiZXhwIjoxNzA0NjI5NTQ2fQ.AGbZRITz2GYbhIiGk0j1HgcVoe0J5RkFNqCHZ7DoHo8','BEARER','6UVXWV7E'),(_binary 'I0â˜ùXLµ\Œˆ\ƒ\'¥ñ≤',_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwic3ViIjoiMDYwNzA4MDkxMCIsImlhdCI6MTcwNDU0MzA3NSwiZXhwIjoxNzA0NjI5NDc1fQ.0rEt9tDM6bWtRH70_84g9htwlxkg-MJ5P_WHNM0dbC8','BEARER','6UVXWV7E'),(_binary 'ã\»≈†ÒH∫dò◊∞~\◊',_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiTUFOQUdFUiIsImZ1bGxOYW1lIjoiTU0gbW91c3RhcGhhIiwic3ViIjoiMDQ4NDg0MjciLCJpYXQiOjE3MDQ1NDMxMjMsImV4cCI6MTcwNDYyOTUyM30.rRmUW3EqKO4cpcnQ3NolktTVliLoVhcpos5nFXgRHqQ','BEARER','hshkk8B8'),(_binary 'é&	îBCÀú®öª3X˘™',_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiTUFOQUdFUiIsImZ1bGxOYW1lIjoiTU0gbW91c3RhcGhhIiwic3ViIjoiMDQ4NDg0MjciLCJpYXQiOjE3MDQ1NDMyNTMsImV4cCI6MTcwNDYyOTY1M30.mclku7U04dpxE_HjrRaPZg_v-9QaJOxVLf7PpxxQfII','BEARER','hshkk8B8'),(_binary 'ûŒπïTIG˘É\Á8\Î\‹\›8',_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImZ1bGxOYW1lIjoiaGFyaWsgaXNtYWlsIiwic3ViIjoiMDU4NDczNzM3IiwiaWF0IjoxNzA0NTQzNDc3LCJleHAiOjE3MDQ2Mjk4Nzd9.tg6LN38a0_pGBmRbi-GiHrKnxz3R3s7o8cOtlAFkhZY','BEARER','Egz4DSNz'),(_binary 'ü\·Ü\\,FØ\„ƒô\◊j',_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwic3ViIjoiMDYwNzA4MDkxMCIsImlhdCI6MTcwNDU0MzI0MSwiZXhwIjoxNzA0NjI5NjQxfQ.GeYe4xeoVJr8kATDXT_uWjBuM-h958goqo5QOlI18NE','BEARER','6UVXWV7E'),(_binary 'ßÕ¥ﬂîÉCtÑ*\ÈΩ@ﬂ¥',_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiTUFOQUdFUiIsImZ1bGxOYW1lIjoiTU0gbW91c3RhcGhhIiwic3ViIjoiMDQ4NDg0MjciLCJpYXQiOjE3MDQ1NDMwNDAsImV4cCI6MTcwNDYyOTQ0MH0.Tc9mexkTYVNDOian38LaxXw-mBHpqnds4Ar3NScd1Bk','BEARER','hshkk8B8'),(_binary '©ôolqO?£2ÜA;ıq',_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiTUFOQUdFUiIsImZ1bGxOYW1lIjoiTU0gbW91c3RhcGhhIiwic3ViIjoiMDQ4NDg0MjciLCJpYXQiOjE3MDQ1NDIzMTUsImV4cCI6MTcwNDYyODcxNX0.N3LdTHtxe8YzDjAPNOf_Nd2OR2TDvw7zuWVQQkVE4gk','BEARER','hshkk8B8'),(_binary '\Ó±O¥®âOº∑]\◊<\‚ÅI',_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJmdWxsTmFtZSI6IkFkbWluIEFkbWluIiwic3ViIjoiMDYwNzA4MDkxMCIsImlhdCI6MTcwNDU0MjM1MCwiZXhwIjoxNzA0NjI4NzUwfQ.W8CVUj7qMq5FsLJ4GPZU79OcM-4bWuqZwRvJRE2zNaU','BEARER','6UVXWV7E');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-06 14:06:31

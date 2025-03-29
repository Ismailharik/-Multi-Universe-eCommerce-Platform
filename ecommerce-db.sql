-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce-db
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
  `address` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `order_note` varchar(255) DEFAULT NULL,
  `order_status` enum('COMPLETED','CREATED','PROCESSING') DEFAULT NULL,
  `ship_cost` double NOT NULL,
  `total_price` double NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
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
INSERT INTO `_order` VALUES ('O8yvb3Xz','Paris 13','France','2025-03-28 17:47:13.815000','','PROCESSING',0,296,'LhpnBBO5'),('rV9nhB80','casablanca sbata','Morocco','2025-03-28 17:43:06.076000','please call me first','COMPLETED',0,340,'UiU8cbxL'),('TD4F4v0z','Ouelfa casablanca','Morocco','2025-03-28 17:45:11.314000','I need a fast delivery pls','PROCESSING',0,340,'G2nAIBiU'),('yjC5aepq','Casablanca Sbata','Morocco','2025-03-28 18:17:54.608000','Please call ASAP','CREATED',0,291,'ihqQbpCb');
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
  `active` bit(1) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','MANAGER','USER') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_smv6iv0phvugvruh5upf10h08` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_user`
--

LOCK TABLES `_user` WRITE;
/*!40000 ALTER TABLE `_user` DISABLE KEYS */;
INSERT INTO `_user` VALUES ('DWdiheCG',_binary '','casablanca maarif','hicham@gmail.com','Hicham Assid','$2a$10$P1holovTVEKAF6LfO755ouo0XZolbVuqZSQT3Pfcuksd4KBg46Aj2','0694893832','USER'),('eqxekgZK',_binary '',NULL,'ismail@gmail.com','ismail admin','$2a$10$pJNHZdFos8RHZmwbbfLtquLnEvARRI0lsu8wLo9p/Wv2HapYltk4W','049483838','ADMIN'),('G2nAIBiU',_binary '','Ouelfa casablanca','yasine@gmail.com','yassine',NULL,'052922828','USER'),('ihqQbpCb',_binary '','Casablanca Sbata','ismailharikov@gmail.com','ismailov Harik',NULL,'049333838','USER'),('iq6m0CJU',_binary '',NULL,NULL,'Admin','$2a$10$6ydXsP/8YH/Fl61HdrMO8uVYWwWD05kNAon9cszy7a3IaDuwEP26m','1111','ADMIN'),('LhpnBBO5',_binary '','Paris 13','khbabez@gmail.com','Ahmed KHb',NULL,'06493838','USER'),('lVPxIQZg',_binary '','sbata','ismail@gmail.com','ismail harik','$2a$10$ayBzt1UzAGBkEKzORnVtpe1SvLApiJqFRXIQRT4DGkdn3OnpbiJm2','06393938','USER'),('n6cZ31uO',_binary '',NULL,'yahya@gmail.com','yahya FR','$2a$10$PAO.hsoPjk3eWAsh0HH1UOwU4ivnn8utcXCzWmis3Lya45dGKN7PS','093838293','ADMIN'),('QgJf91wt',_binary '','Maarif','yassir@gmail.com','yassir','$2a$10$Fpwg1A64AvU7RMsX9wV.PeCKHQItVM1ogTtfbryYD1V963ku80n/u','059483828','USER'),('UiU8cbxL',_binary '','casablanca sbata','ismailhk1@gmail.com','ISMAIL HARIK',NULL,'0706764587','USER');
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
  `img` varchar(100) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `number_of_products` int NOT NULL,
  `parent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'Oil description','http://localhost:8085/5e474eea-8c42-485d-baed-dcf21edb7349.png','Oil',4,'produits-alimentaires'),(3,'coffee description','http://localhost:8085/5e390c76-9e25-4fe0-a2bb-813f30febc6f.png','Coffee',2,'produits-alimentaires'),(4,'honey description','http://localhost:8085/0916b1b4-89a4-4b40-b5f6-70c8d9a70b82.png','Honey',3,'produits-alimentaires');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_slider`
--

DROP TABLE IF EXISTS `home_slider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_slider` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `background_color` varchar(255) DEFAULT NULL,
  `background_img` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `parent` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `percent` int DEFAULT NULL,
  `text1` varchar(255) DEFAULT NULL,
  `text2` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_slider`
--

LOCK TABLES `home_slider` WRITE;
/*!40000 ALTER TABLE `home_slider` DISABLE KEYS */;
INSERT INTO `home_slider` VALUES (1,'#115061',NULL,'http://localhost:8085/e4cef9a9-ec8a-4061-9f35-f8bd12144f32.png','produis-alimentaires',24,'starting at',29,'exclusive offer ','of this week','honey product 1'),(2,'rgb(237 178 107)',NULL,'http://localhost:8085/0f57a93b-b8b9-4ab7-9812-d759884b0b8a.png','produis-alimentaires',77,'starting at',22,'Exclusive offer ','of this week','Chamomile Honey Tea'),(3,'rgb(201 115 11)',NULL,'http://localhost:8085/aae1ee7e-4c16-4778-b3b9-782cfcb36fc9.png','produis-alimentaires',30,'starting at',24,'Exclusive Oferer ','of this week','greek honey'),(4,'','http://localhost:8085/df2b4b62-342b-44a7-83fe-f15d8f274bd8.jpg',NULL,'produis-alimentaires',39,'Starting at',34,'Exclusive Offer ','Of this month','Moroccan Coconut Oil');
/*!40000 ALTER TABLE `home_slider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `total_price` double NOT NULL,
  `order_id` varchar(255) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKryn1sdluxcjfeu891k75myheu` (`order_id`),
  KEY `FK551losx9j75ss5d6bfsqvijna` (`product_id`),
  CONSTRAINT `FK551losx9j75ss5d6bfsqvijna` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKryn1sdluxcjfeu891k75myheu` FOREIGN KEY (`order_id`) REFERENCES `_order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,1,340,'rV9nhB80',6),(2,1,340,'TD4F4v0z',6),(3,1,264,'O8yvb3Xz',7),(4,1,32,'O8yvb3Xz',5),(5,1,35,'yjC5aepq',3),(6,8,256,'yjC5aepq',5);
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
  `additional_information` text,
  `description` text,
  `discount` double NOT NULL,
  `featured` bit(1) NOT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  `parent` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `sell_count` int NOT NULL,
  `sizes` text,
  `sku` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `video_id` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'[{\"key\":\"Standing screen display size\",\"value\":\"Screen display Size 20.2\"}]','Smooth ground coffee infused with natural vanilla flavor.',10,_binary '','2025-03-30 00:00:00.000000','2025-03-26 00:00:00.000000','produits-alimentaires',239,'Cofee',1203,20,'[\"1KG\",\"3.5KG\",\"5KG\"]','NS-003','in-stock','Vanilla Latte','https://www.youtube.com/watch?v=9M4TiXjNZQE',3),(2,'[{\"key\":\"Origin\",\"value\":\"galley of type and scrambled it to make a type specimen book.\"}]','Description Arabica Coffee BeansIt was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',0,_binary '\0',NULL,NULL,'produits-alimentaires',45,'Coffee',2356,356,'[\"2KG\",\"5KG\",\"7.5KG\"]','NS-002','in-stock','Arabica Coffee','https://www.youtube.com/watch?v=9M4TiXjNZQE',3),(3,'[{\"key\":\"Roast Level\",\"value\":\"Dark\"}]','A rich and bold espresso blend with notes of dark chocolate and caramel.',0,_binary '\0',NULL,NULL,'produits-alimentaires',35,'Coffee',5753,238,'[\"250G\",\"1.5 KG\",\"3.5 KG\"]','ESP-001','in-stock','Classic Espresso','https://www.youtube.com/watch?v=9M4TiXjNZQE',3),(4,'[{\"key\":\"Origin \",\"value\":\"Italy \"},{\"key\":\"Acidity Level\",\"value\":\"‚â§0.8%\"}]','Cold-pressed, premium extra virgin olive oil with fruity notes',67,_binary '','2025-03-31 00:00:00.000000','2025-03-18 00:00:00.000000','produits-alimentaires',432,'Oil',246,235,'[\"1L\",\"2L\",\"5L\"]','EVOO-001','in-sell','Extra Virgin Olive Oil','https://www.youtube.com/watch?v=9M4TiXjNZQE',2),(5,'[{\"key\":\"Certification\",\"value\":\"USDA Organic\"},{\"key\":\"Extraction Method\",\"value\":\" Cold-Pressed\"}]','Unrefined, organic coconut oil for cooking and skincare.',57,_binary '',NULL,NULL,'produits-alimentaires',89,'Oil',2571,235,'[\"1/2 L\",\"1 L\",\"3 L\"]','COCO-002','in-stock','Organic Coconut Oil','https://www.youtube.com/watch?v=9M4TiXjNZQE',2),(6,'[{\"key\":\"Flavor Profile\",\"value\":\"Floral, Mild\"},{\"key\":\"Source \",\"value\":\"Local Wildflowers\"}]','Unprocessed, unfiltered wildflower honey with natural pollen and enzymes.',0,_binary '',NULL,NULL,'produits-alimentaires',340,'Honey',3049,29,'[\"250ml\",\"1 L\",\"3.5 L\"]','HNY-001','in-stock','Raw Wildflower Honey',NULL,4),(7,'[]','Premium New Zealand Manuka honey with certified antibacterial properties.',29,_binary '\0','2025-03-31 00:00:00.000000','2025-03-19 00:00:00.000000','produits-alimentaires',293,'Honey',2039,309,'[\"1L\",\"2L\",\"4.5L\"]','MAN-002','on-sell','Manuka Honey MGO 100+',NULL,4),(8,'[{\"key\":\"Origin\",\"value\":\"Hungary \"},{\"key\":\"Sweetness Level\",\"value\":\"Mild \"}]','Light, clear organic acacia honey with a delicate floral taste.',25,_binary '\0',NULL,NULL,'produits-alimentaires',293,'Honey',29291,223,'[\"2 L\",\"5 L\",\"7 L\"]','ACA-003','out-of-stock','Organic Acacia Honey',NULL,4),(9,'[{\"key\":\"Ingredients \",\"value\":\"100% Pure Essential Oils \"},{\"key\":\"Uses \",\"value\":\"Diffuser, Massage, DIY \"}]','Therapeutic-grade essential oils for aromatherapy and skincare.',39,_binary '\0','2025-03-31 00:00:00.000000','2025-03-28 00:00:00.000000','produits-alimentaires',35,'Oil',3918,233,'[\"1L\",\"2L\",\"3L\"]','oil-003','in-stock','Essential Oil Set (Lavender, Tea Tree, Eucalyptus)',NULL,2);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_imageurls`
--

DROP TABLE IF EXISTS `product_imageurls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_imageurls` (
  `product_id` bigint NOT NULL,
  `imageurls` varchar(255) DEFAULT NULL,
  KEY `FKjnhkg7co7ysfrjuo1jf1q5eft` (`product_id`),
  CONSTRAINT `FKjnhkg7co7ysfrjuo1jf1q5eft` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_imageurls`
--

LOCK TABLES `product_imageurls` WRITE;
/*!40000 ALTER TABLE `product_imageurls` DISABLE KEYS */;
INSERT INTO `product_imageurls` VALUES (6,'http://localhost:8085/c34d36f0-9b10-4533-bc0e-678f82e13c61.png'),(7,'http://localhost:8085/ad6d7323-e250-4d53-8b27-bff4bf7a0962.png'),(8,'http://localhost:8085/39eabed4-cd97-4fda-af46-a227942929d5.png'),(1,'http://localhost:8085/996985ed-a607-4790-810f-88745312661f.png'),(2,'http://localhost:8085/9a3ae895-823f-4160-8e1c-7386afc3900e.png'),(3,'http://localhost:8085/e02b08ec-2d71-4666-bae7-fdd8df009911.png'),(5,'http://localhost:8085/6450d7c6-0b69-4eb6-b814-f6c3bf1bbd0b.png'),(4,'http://localhost:8085/190996e4-5d27-4b78-95fd-acc607ef9251.png'),(9,'http://localhost:8085/62c62854-05a0-47d0-b7a8-2efe474d8766.png'),(9,'http://localhost:8085/74d10154-4916-4deb-92a0-33c052d9e36f.png');
/*!40000 ALTER TABLE `product_imageurls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reclamation`
--

DROP TABLE IF EXISTS `reclamation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reclamation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `is_answered` bit(1) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reclamation`
--

LOCK TABLES `reclamation` WRITE;
/*!40000 ALTER TABLE `reclamation` DISABLE KEYS */;
INSERT INTO `reclamation` VALUES (1,'2025-03-28 17:38:54.873000','ismailov@gmail.com','ismail harik',_binary '\0','The Quality is very low and the price much expensive I wanna get back my money','03939481'),(2,'2025-03-28 18:21:20.771000','jhone@gmail.com','Jhone x',_binary '\0','the delivery Service is so slow please Harry up the proccess','093838821');
/*!40000 ALTER TABLE `reclamation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `is_approved` bit(1) NOT NULL,
  `stars_number` int NOT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiyof1sindb9qiqr9o8npj8klt` (`product_id`),
  CONSTRAINT `FKiyof1sindb9qiqr9o8npj8klt` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'2025-03-28 18:28:37.966000','Much delicious ','achraf@gmail.com','Achraf HK',_binary '',5,9),(2,'2025-03-28 18:29:53.434000','Good but delivery very slow','hk@gmail.com','ismail harik',_binary '',4,9);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
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
INSERT INTO `token` VALUES (_binary 'F˛9FI\Zà6|%ãf',_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJmdWxsTmFtZSI6ImlzbWFpbCBhZG1pbiIsInN1YiI6IjA0OTQ4MzgzOCIsImlhdCI6MTc0Mjc3Mzk2NywiZXhwIjoxNzc0MzA5OTY3fQ.lxvfoZ18V9nip4Nk7rNWSMV7KmilrkJesYTIhTBjeUY','BEARER','eqxekgZK'),(_binary 'JÀ¥:¯B{Ü!Ëåê',_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJmdWxsTmFtZSI6IkFkbWluIiwic3ViIjoiMTExMSIsImlhdCI6MTc0MzAzMzg0NiwiZXhwIjoxNzc0NTY5ODQ2fQ.nYqVx4MhOj0eJnxCaL3ruDc7e9kyQrS08zTN_3vNG6I','BEARER','iq6m0CJU'),(_binary '\\\ \ 6mGR®Ú\Àƒí\‰˛∏',_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImZ1bGxOYW1lIjoiaXNtYWlsIGhhcmlrIiwic3ViIjoiMDYzOTM5MzgiLCJpYXQiOjE3NDI3NzM4OTAsImV4cCI6MTc3NDMwOTg5MH0.Hsz8nVOu8E79sVUWJwBSrnBj-KQC4u9qOJi8UTjz2f0','BEARER','lVPxIQZg'),(_binary 'Ö}ÉÒ˘\ÃGMæ.6fvAÄ\‚',_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJmdWxsTmFtZSI6IkFkbWluIiwic3ViIjoiMTExMSIsImlhdCI6MTc0MzAzMzk0NCwiZXhwIjoxNzc0NTY5OTQ0fQ.JVlOjNdrhsNb044Q6fKc5_iaYxWvlqX0_FQwoACseqA','BEARER','iq6m0CJU'),(_binary '∑y?\≈@yÉπæYˆ∂«µ',_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImZ1bGxOYW1lIjoieWFzc2lyIiwic3ViIjoiMDU5NDgzODI4IiwiaWF0IjoxNzQyNzczOTI4LCJleHAiOjE3NzQzMDk5Mjh9.Lnj_N1NI3vx_RskTNCEK_IPb1B1mMkPdsIlW5421YSs','BEARER','QgJf91wt'),(_binary '\›\Êø÷éBLïtó™D6\÷\n',_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJmdWxsTmFtZSI6InlhaHlhIEZSIiwic3ViIjoiMDkzODM4MjkzIiwiaWF0IjoxNzQzMDMyNDI1LCJleHAiOjE3NzQ1Njg0MjV9.ZEZW5g9ko5UICgyWsc9zM1H5YTdgkMeozOvIc8z4quk','BEARER','n6cZ31uO'),(_binary 'Ê´ß§gA\Ôª?˜áöÊØì',_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImZ1bGxOYW1lIjoiSGljaGFtIEFzc2lkIiwic3ViIjoiMDY5NDg5MzgzMiIsImlhdCI6MTc0MzAxMjM3NCwiZXhwIjoxNzc0NTQ4Mzc0fQ.18Y2wVfwCRlqfg3fXEDTDlpfajzsp7Nm7sgGCAakgRw','BEARER','DWdiheCG');
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

-- Dump completed on 2025-03-29 14:36:13

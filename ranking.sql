-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ranking
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.30-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ranking`
--

DROP TABLE IF EXISTS `ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ranking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  `stars` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ranking`
--

LOCK TABLES `ranking` WRITE;
/*!40000 ALTER TABLE `ranking` DISABLE KEYS */;
INSERT INTO `ranking` VALUES (65,'abc',123,12),(66,'hhhhh',4,0),(67,'hhhhh',80,0),(68,'ll',6,0),(69,'kk',7,2),(70,'gggg',7,0),(71,';h',5,0),(72,'jh',6,0),(73,'fgfh',9,0),(74,'fdf',21,0),(75,'ghfghfg',5,0),(76,'hj',8,0),(77,'hjhg',5,1),(78,'hjgj',6,1),(79,'jjjj',5,1),(80,'gfhfghf',5,1),(81,'dfgds',3,1),(82,'thtr',5,0),(83,'vvv',9,3),(84,'dfg',4,0),(85,'jhgjg',4,1),(86,'hgf',3,0),(87,'gh',4,0),(88,'kk',3,0),(89,'hdhg',5,0),(90,'ghj',3,0),(91,'ghjhhhhh',5,1),(92,'ghjhhhhh',5,1),(93,'ghjgh',3,0),(94,'bbb',4,2),(95,'hgh',3,0),(96,'hg',4,0),(97,'cc',10,0),(98,'gf',4,0),(99,'gg',3,0),(100,'gyuj',5,0),(101,'aaa',5,1),(102,'jj',6,2),(103,'jjhh',6,2),(104,'jjhh',6,2),(105,'jjhh',3,0),(106,'jjhh',3,0),(107,'jjhh',3,0),(108,'gfh',9,0),(109,'ff',5,0),(110,'hjkhgk',10,0),(111,'vb',5,1),(112,'gj',5,2),(113,'gj',5,1),(114,'gj',5,1),(115,'gj',5,0),(116,'gj',5,0),(117,'gj',5,0),(118,'gj',8,0),(119,'gj',8,0),(120,'gj',8,0),(121,'gj',8,0),(122,'kk',6,0),(123,'hgj',5,1),(124,'uouyo',3,0),(125,'uouy',5,0),(126,'fgjfgjfg',6,1);
/*!40000 ALTER TABLE `ranking` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-26 20:41:23

CREATE DATABASE  IF NOT EXISTS `ironmadchess` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ironmadchess`;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loginUser` varchar(45) NOT NULL,
  `passwordUser` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `loginUser_UNIQUE` (`loginUser`),
  KEY `login_INDEX` (`loginUser`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

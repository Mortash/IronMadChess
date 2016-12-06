DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
  `idgame` int(11) NOT NULL AUTO_INCREMENT,
  `idUser1` int(11) NOT NULL,
  `idUser2` int(11) NOT NULL,
  `state` tinyint(1) NOT NULL COMMENT '-1 : partie demandée\n0  : partie en cours\n1 : Echec & Mat\n2 : Echec & Pat',
  `created` datetime NOT NULL,
  PRIMARY KEY (`idgame`),
  KEY `idUser1` (`idUser1`),
  KEY `idUser2` (`idUser2`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `gamestate`;
CREATE TABLE `gamestate` (
  `idGameState` int(11) NOT NULL AUTO_INCREMENT,
  `idGame` int(11) NOT NULL,
  `board` varchar(192) NOT NULL,
  `shifting` char(7) DEFAULT NULL,
  `played` datetime NOT NULL,
  PRIMARY KEY (`idGameState`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loginUser` varchar(45) NOT NULL,
  `passwordUser` varchar(45) NOT NULL,
  `lastAction` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `loginUser_UNIQUE` (`loginUser`),
  KEY `login_INDEX` (`loginUser`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

var mysql = require('mysql');
var param_sql = require('../../config/param').param_sql;
param_sql = new param_sql();
var pool = mysql.createPool({
    host     : param_sql.host,
    user     : param_sql.user,
    password : param_sql.password,
    database : param_sql.database
  });

var userRepo = require("../repository/UserRepository").UserRepository;

function GameRepository() {

  function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
  }

  Date.prototype.toMysqlFormat = function() {
    return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate()) + " " + 
              twoDigits(this.getHours()) + ":" + twoDigits(this.getMinutes()) + ":" + twoDigits(this.getSeconds());
  };

  this.askGame = function(logFrom, logTo, callback) {
    pool.getConnection(function(err, connection) {
      connection.query("INSERT INTO game (idUser1, idUser2, state, created) VALUES (?,?,?,?);",
                          [logFrom,logTo,-1,new Date().toMysqlFormat()], function(err, rows, fields) {
        try {
          connection.destroy();
          if (!err)
            callback("ok");
          else
            callback("ko");
        } catch(e) {
          callback("erreur mysql");
        }
      });
    });
  };

  this.getAllGameByState = function(log, state, callback) {
    pool.getConnection(function(err, connection) {
      
      if(state === 0) {
        connection.query("SELECT r.idgame, r.iduser, u.loginUser " +
                       "FROM (SELECT g.idgame, g.idUser1 as iduser from game g " +
                       "where idUser2 = " + log + " AND state = 0 " +
                       "UNION " +
                       "SELECT g.idgame, g.idUser2 as iduser from game g " +
                       "where idUser1 = " + log + " AND state = 0 " + 
                       ") as r JOIN user u ON u.id = r.iduser;", function(err, rows, fields) {
          try {
            connection.destroy();
            if (!err)
              callback(JSON.stringify(rows));
            else
              callback("ko");
          } catch(e) {
            callback("erreur mysql");
          }
        });
      } else {
        // Quand state = -1
        var tempPlay = "idUser2 = " + log;
        var st = " AND state = "+state;

        if(state === 1) {
          tempPlay = "(idUser2 = "+log+" OR idUser1 = "+log+")";
          st = " AND state IN (1,2)";
        }
        
        connection.query("SELECT g.idgame, g.idUser1 as iduser, u.loginUser from game g JOIN user u " + 
                         "ON g.idUser1 = u.id where "+ tempPlay + st + ";", function(err, rows, fields) {
          try {
            connection.destroy();
            if (!err)
              callback(JSON.stringify(rows));
            else
              callback("ko");
          } catch(e) {
            callback("erreur mysql");
          }
        });
      }
    });
  };

  this.acceptGame = function(id, callback) {
    pool.getConnection(function(err, connection) {
      connection.query("UPDATE game SET state=0 where idgame=?",
                                      [id], function(err, rows, fields) {
        try {
          connection.destroy();

          if (!err)
            callback('ok');
          else
            callback('ko');
        } catch(e) {
          callback("erreur mysql");
        }
      });
    });
  };

  this.updateStateGame = function(id, state, callback) {
    pool.getConnection(function(err, connection) {
      connection.query("UPDATE game SET state=? where idgame=?",
                                      [state, id], function(err, rows, fields) {
        try {
          connection.destroy();

          if (!err)
            callback('ok');
          else
            callback('ko');
        } catch(e) {
          callback("erreur mysql");
        }
      });
    });
  };

  //Nombre de partie 7 derniers mois
  this.getStatsNP7 = function(id, callback) {
    pool.getConnection(function(err, connection) {
      connection.query("SELECT CASE MONTH(g.created) WHEN 1 THEN 'janvier' WHEN 2 THEN 'février' WHEN 3 THEN 'mars' WHEN 4 THEN 'avril' WHEN 5 THEN 'mai' WHEN 6 THEN 'juin' WHEN 7 THEN 'juillet' WHEN 8 THEN 'août' WHEN 9 THEN 'septembre' WHEN 10 THEN 'octobre' WHEN 11 THEN 'novembre' ELSE 'décembre' END AS mois, COUNT(g.idgame) as nbGame FROM game g WHERE (g.idUser1 = ?  OR g.idUser2 = ?) AND DATEDIFF(NOW(), g.created) <= 210 GROUP BY MONTH(g.created) ORDER BY g.created;",
                      [id, id], function(err, rows, fields) {
        try {
          connection.destroy();
          if (!err)
            callback(JSON.stringify(rows));
          else
            callback('ko');
        } catch(e) {
          callback("erreur mysql");
        }
      });
    });
  };

  // NB partie gagnée/perdue
  this.getStatsPGP = function(id, callback) {
    pool.getConnection(function(err, connection) {
      connection.query("SELECT g.state, count(state) as nb FROM game g WHERE g.idUser1 = 32 OR g.idUser2 = 32 GROUP BY g.state ORDER BY g.state;",
                      [id], function(err, rows, fields) {
        try {
          connection.destroy();
          if (!err)
            callback(JSON.stringify(rows));
          else
            callback('ko');
        } catch(e) {
          callback("erreur mysql");
        }
      });
    });
  };

}

exports.GameRepository = GameRepository;
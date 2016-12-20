var p = require('pg');
var url = require('url')
p.defaults.ssl = true;

var params = url.parse(process.env.DATABASE_URL);
var auth = params.auth.split(':');

var config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: 15,
  ssl: true
};

var pg = new p.Pool(config);

function GameRepository() {

  function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
  }

  Date.prototype.toSqlFormat = function() {
    return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate()) + " " + 
              twoDigits(this.getHours()) + ":" + twoDigits(this.getMinutes()) + ":" + twoDigits(this.getSeconds());
  };

  this.askGame = function(logFrom, logTo, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("INSERT INTO game (idUser1, idUser2, state, created) VALUES ($1,$2,$3,$4) RETURNING idgame;",
                          [logFrom,logTo,-1,new Date().toSqlFormat()], function(err, rows) {

        client.release();
        
        try {
          if (!err)
            callback(JSON.stringify(rows.rows));
          else
            callback("ko");
        } catch(e) {
        }
      });
    });
  };

  this.getAllGameByState = function(log, state, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;
      
      if(state === 0) {
        client.query("SELECT r.idgame, r.iduser, u.loginUser " +
                       "FROM (SELECT g.idgame, g.idUser1 as iduser from game g " +
                       "where idUser2 = " + log + " AND state = 0 " +
                       "UNION " +
                       "SELECT g.idgame, g.idUser2 as iduser from game g " +
                       "where idUser1 = " + log + " AND state = 0 " + 
                       ") as r JOIN users u ON u.id = r.iduser;", function(err, rows) {
          client.release();

          try {
            if (!err)
              callback(JSON.stringify(rows.rows));
            else
              callback("ko");
          } catch(e) {
          }
        });
      } else {
        // Quand state = -1
        var tempPlay = "idUser2 = " + log;
        var st = " AND state = " + state;

        if(state === 1) {
          tempPlay = "(idUser2 = "+log+" OR idUser1 = "+log+")";
          st = " AND state IN (1,2)";
        }
        
        client.query("SELECT g.idgame, g.idUser1 as iduser, u.loginUser from game g JOIN users u ON g.idUser1 = u.id where " + tempPlay + st + ";", 
                        function(err, rows) {
          if(err) console.log(err);
          client.release();

          try {
            if (!err)
              callback(JSON.stringify(rows.rows));
            else
              callback("ko");
          } catch(e) {
          }
        });
      }
    });
  };

  this.acceptGame = function(id, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("UPDATE game SET state=0 where idgame=$1",
                                      [id], function(err, rows) {
        client.release();

        try {
          if (!err)
            callback('ok');
          else
            callback('ko');
        } catch(e) {
        }
      });
    });
  };

  this.updateStateGame = function(id, state, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("UPDATE game SET state=$1 where idgame=$2",
                                      [state, id], function(err, rows) {
        client.release();

        try {
          if (!err)
            callback('ok');
          else
            callback('ko');
        } catch(e) {
        }
      });
    });
  };

  //Nombre de partie 7 derniers mois
  this.getStatsNP7 = function(id, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("SELECT CASE MONTH(g.created) WHEN 1 THEN 'janvier' WHEN 2 THEN 'février' WHEN 3 THEN 'mars' WHEN 4 THEN 'avril' WHEN 5 THEN 'mai' WHEN 6 THEN 'juin' WHEN 7 THEN 'juillet' WHEN 8 THEN 'août' WHEN 9 THEN 'septembre' WHEN 10 THEN 'octobre' WHEN 11 THEN 'novembre' ELSE 'décembre' END AS mois, COUNT(g.idgame) as nbGame FROM game g WHERE (g.idUser1 = $1  OR g.idUser2 = $2) AND DATEDIFF(NOW(), g.created) <= 210 GROUP BY MONTH(g.created) ORDER BY g.created;",
                      [id, id], function(err, rows) {
        client.release();

        try {
          if (!err)
            callback(JSON.stringify(rows.rows));
          else
            callback('ko');
        } catch(e) {
        }
      });
    });
  };

  // NB partie gagnée/perdue
  this.getStatsPGP = function(id, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("SELECT g.state, count(state) as nb FROM game g WHERE g.idUser1 = $1 OR g.idUser2 = $2 GROUP BY g.state ORDER BY g.state;",
                      [id, id], function(err, rows) {
        client.release();

        try {
          if (!err)
            callback(JSON.stringify(rows.rows));
          else
            callback('ko');
        } catch(e) {
        }
      });
    });
  };

}

exports.GameRepository = GameRepository;
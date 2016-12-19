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

var gameRepo = require("./GameRepository").GameRepository;

function GameStateRepository() {

  function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
  }

  Date.prototype.toSqlFormat = function() {
    return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate()) + " " +
              twoDigits(this.getHours()) + ":" + twoDigits(this.getMinutes()) + ":" + twoDigits(this.getSeconds());
  };

  this.initGame = function(id, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      // BLANC
      var board = "A1:TB,B1:CB,C1:FB,D1:RB,E1:KB,F1:FB,G1:CB,H1:TB,";
         board += "A2:PB,B2:PB,C2:PB,D2:PB,E2:PB,F2:PB,G2:PB,H2:PB,";      // Pion

      // NOIR
         board += "A8:TN,B8:CN,C8:FN,D8:RN,E8:KN,F8:FN,G8:CN,H8:TN,";
         board += "A7:PN,B7:PN,C7:PN,D7:PN,E7:PN,F7:PN,G7:PN,H7:PN";      // Pion

      client.query("INSERT INTO gamestate (idGame, board, played) VALUES ($1,$2,$3);",
                          [id, board, new Date().toSqlFormat()], function(err, rows) {
        client.release();

        try {
          if (!err)
            callback("ok");
          else
            callback("ko");
        } catch(e) {
        }
      });
    });
  };

  this.saveAGame = function(id, shift, state, callback) {
    new GameStateRepository().getAGame(id, function(oldBoard){
      pg.connect(function(err, client) {
        if (err) throw err;
        console.log("connection ok");

        var newBoard = "";
        var splBoa = (JSON.parse(oldBoard)[0]).board.split(',');

        splBoa.forEach(function(element,index,array){
          if(element.slice(0,2) !== shift.slice(3,5) && element.slice(0,2) !== shift.slice(6)) {
            newBoard += element + ',';
          }
        });

        newBoard += shift.slice(6)+':'+shift.slice(0,2);
        client.query("INSERT INTO gamestate (idGame, board, shifting, played) VALUES ($1,$2,$3,$4);",
                            [id, newBoard, shift, new Date().toSqlFormat()], function(err, rows) {
          client.release();
          console.log(err, rows);

          try {
            if (!err) {
              new gameRepo().updateStateGame(id,state,function(retvalue) {
                console.log("GR "+retvalue);
                callback(retvalue);
              })
            } else {
              callback("ko");
            }
          } catch(e) {
          }
        });
      });
    });
  };

  this.getAGame = function(id, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("SELECT gs.board, gs.shifting, u1.loginUser as user1, u2.loginUser as user2 FROM gamestate gs JOIN game g ON g.idGame = gs.idgame JOIN users u1 ON g.idUser1 = u1.id JOIN users u2 ON g.idUser2 = u2.id WHERE gs.idGame = $1 ORDER BY gs.idGameState DESC LIMIT 1;",
                                      [id], function(err, rows) {

        client.release();

        if(err) console.log(err);

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

  this.getAllOfGame = function(id, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("SELECT gs.board, g.created, gs.played, gs.shifting, u1.loginUser as user1, u2.loginUser as user2 "+
                       "FROM gamestate gs JOIN game g ON g.idGame = gs.idgame JOIN users u1 ON g.idUser1 = u1.id " +
                       "JOIN users u2 ON g.idUser2 = u2.id WHERE gs.idGame = $1 ORDER BY gs.idGameState DESC;",
                                      [id], function(err, rows) {
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

    //Nombre de coup par partie
    this.getStatsCPP = function(id, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("SELECT * FROM (SELECT g.idgame, COUNT(*) AS shots FROM game g JOIN gamestate gs ON g.idgame = gs.idGame WHERE g.idUser1 = $1 OR g.idUser2 = $2 GROUP BY g.idgame  ORDER BY g.idgame DESC LIMIT 10) AS r ORDER BY r.idgame",
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

    // Pions tués par parties
    this.getStatsPTP = function(id, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("SELECT 1;",
                        [id], function(err, rows) {
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

exports.GameStateRepository = GameStateRepository;

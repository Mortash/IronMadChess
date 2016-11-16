var mysql = require('mysql');
var gameRepo = require("./GameRepository").GameRepository;
var param_sql = require('../../config/param').param_sql;
param_sql = new param_sql();
var pool = mysql.createPool({
    host     : param_sql.host,
    user     : param_sql.user,
    password : param_sql.password,
    database : param_sql.database
  });

function GameStateRepository() {

  function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
  }

  Date.prototype.toMysqlFormat = function() {
    return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate()) + " " + 
              twoDigits(this.getHours()) + ":" + twoDigits(this.getMinutes()) + ":" + twoDigits(this.getSeconds());
  };

  this.initGame = function(id, callback) {
    pool.getConnection(function(err, connection) {
      // BLANC
      var board = "A1:TB,B1:CB,C1:FB,D1:RB,E1:KB,F1:FB,G1:CB,H1:TB,";
         board += "A2:PB,B2:PB,C2:PB,D2:PB,E2:PB,F2:PB,G2:PB,H2:PB,";      // Pion

      // NOIR
         board += "A8:TN,B8:CN,C8:FN,D8:RN,E8:KN,F8:FN,G8:CN,H8:TN,";
         board += "A7:PN,B7:PN,C7:PN,D7:PN,E7:PN,F7:PN,G7:PN,H7:PN";      // Pion

      connection.query("INSERT INTO gamestate (idGame, board, played) VALUES (?,?,?);",
                          [id, board, new Date().toMysqlFormat()], function(err, rows, fields) {
        try {
          connection.destroy();
          
          if (!err)
            callback("ok");
          else
            callback("ko");
        } catch(e) {
          console.log("erreur mysql", e);
        }
      });
    });
  };

  this.saveAGame = function(id, shift, state, callback) {
    new GameStateRepository().getAGame(id, function(oldBoard){
      pool.getConnection(function(err, connection) {
        var newBoard = "";
        var splBoa = (JSON.parse(oldBoard)[0]).board.split(',');
        
        splBoa.forEach(function(element,index,array){
          if(element.slice(0,2) !== shift.slice(3,5) && element.slice(0,2) !== shift.slice(6)) {
            newBoard += element + ',';
          }
        });

        //if((JSON.parse(oldBoard)[0]).board != newBoard) {
          console.log("Modif");
          newBoard += shift.slice(6)+':'+shift.slice(0,2);

          connection.query("INSERT INTO gamestate (idGame, board, shifting, played) VALUES (?,?,?,?);",
                              [id, newBoard, shift, new Date().toMysqlFormat()], function(err, rows, fields) {
            try {
              if (!err) { 
                var gR = new gameRepo();  

                gR.updateStateGame(id,state,function(retvalue) {
                  connection.destroy();
                  callback(retvalue);
                })
              } else {
                connection.destroy();
                console.log(err);
                callback("ko");
              }
            } catch(e) {
              console.log("erreur mysql", e);
            }
          });
        //}
      });
    });
  };

  this.getAGame = function(id, callback) {
    pool.getConnection(function(err, connection) {
      connection.query("SELECT gs.board, gs.shifting, u1.loginUser as user1, u2.loginUser as user2 "+
                       "FROM ironmadchess.gamestate gs  JOIN game g ON g.idGame = gs.idgame JOIN user u1 ON g.idUser1 = u1.id " +
                       "JOIN user u2 ON g.idUser2 = u2.id WHERE gs.idGame = ? ORDER BY gs.idGameState DESC LIMIT 1;",
                                      [id], function(err, rows, fields) {
        try {
          connection.destroy();
          if (!err)
            callback(JSON.stringify(rows));
          else
            callback("ko");
        } catch(e) {
          console.log(e);
        }
      });
    });
  };

  this.getAllOfGame = function(id, callback) {
    pool.getConnection(function(err, connection) {
      connection.query("SELECT gs.board, g.created, gs.played, gs.shifting, u1.loginUser as user1, u2.loginUser as user2 "+
                       "FROM ironmadchess.gamestate gs  JOIN game g ON g.idGame = gs.idgame JOIN user u1 ON g.idUser1 = u1.id " +
                       "JOIN user u2 ON g.idUser2 = u2.id WHERE gs.idGame = ? ORDER BY gs.idGameState DESC;",
                                      [id], function(err, rows, fields) {
        try {
          connection.destroy();
          if (!err)
            callback(JSON.stringify(rows));
          else
            callback("ko");
        } catch(e) {
          console.log(e);
        }
      });
    });
  };
}

exports.GameStateRepository = GameStateRepository;
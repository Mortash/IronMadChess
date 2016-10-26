var mysql = require('mysql');
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
      var board = "aa";
      connection.query("INSERT INTO gamestate (idGame, board) VALUES (?,?);",
                          [id, board], function(err, rows, fields) {
        try {
          connection.destroy();
          console.log(err);
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

  this.getAGame = function(id, callback) {
    pool.getConnection(function(err, connection) {
      
      connection.query("SELECT * FROM gamestate g where idGame = ?;",
                                      [id], function(err, rows, fields) {
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
    });
  };
}

exports.GameStateRepository = GameStateRepository;
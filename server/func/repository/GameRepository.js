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
      
      var tempPlay = "idUser2 = ?";
      if(state === 0) {
        tempPlay = "(idUser2 = ? OR idUser1 = "+log+")";
      }

      connection.query("SELECT g.idgame, g.idUser1, u.loginUser from game g JOIN user u " + 
                       "ON g.idUser1 = u.id where "+ tempPlay +" AND state=?;",
                                      [log,state], function(err, rows, fields) {
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
}

exports.GameRepository = GameRepository;
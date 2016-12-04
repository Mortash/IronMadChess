var mysql = require('mysql');
var param_sql = require('../../config/param').param_sql;
param_sql = new param_sql();

function UserRepository() {
  pool = mysql.createPool({
    host     : param_sql.host,
    user     : param_sql.user,
    password : param_sql.password,
    database : param_sql.database
  });

  function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
  }

  Date.prototype.toMysqlFormat = function() {
    return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate()) + " " +
              twoDigits(this.getHours()) + ":" + twoDigits(this.getMinutes()) + ":" + twoDigits(this.getSeconds());
  };

  this.majTime = function(id, callback) {
    pool.getConnection(function(err, connection) {
      connection.query("UPDATE user SET lastAction=? where id=?",
        [new Date().toMysqlFormat(),id], function(err, rows, fields) {
          try {
            connection.destroy();
            if (!err)
              callback(id);
            else
              callback("ko");
          } catch(e) {
            callback("erreur mysql");
          }
        });
    });
  }

  this.findOne = function(log, pass, callback) {
    pool.getConnection(function(err, connection) {
      connection.query("SELECT id from user where loginUser=? and passwordUser=?;", [log, pass], function(err, rows, fields) {
        try {
          connection.destroy();
          if (rows.length>0)
            new UserRepository().majTime(rows[0].id, callback);
          else
            callback("ko");
        } catch(e) {
          callback("erreur mysql");
        }
      });
    });
  };

  this.addOne = function(log, pass, callback) {
    pool.getConnection(function(err, connection) {
      connection.query("INSERT INTO user (loginUser, passwordUser, lastAction) VALUES (?,?,?);",
                    [log,pass,new Date().toMysqlFormat()], function(err, rows, fields) {
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

  this.getAll = function(log, callback) {
    pool.getConnection(function(err, connection) {
      connection.query("SELECT id,loginUser from user where lastAction >= DATE_SUB(NOW(), INTERVAL 5 MINUTE) AND loginUser != ?;",
                                      [log], function(err, rows, fields) {
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

  this.getIdByLogin = function(log, callback) {
    pool.getConnection(function(err, connection) {
      connection.query("SELECT id from user where loginUser = ?;",
                                      [log], function(err, rows, fields) {
        try {
          connection.destroy();
          if (!err)
            callback(rows[0].id.toString());
          else
            callback("ko");
        } catch(e) {
      console.log(e);
          callback("erreur mysql");
        }
      });
    });
  };

//      FRANCK ///
  this.getStats = function(id, callback) {
    pool.getConnection(function(err, connection) {

      //requete SQL : à partir de l'iduser --> trouver les parties ou il a joué
      //et récupérer les infos de ses parties.
    //Dans game : la liste de toutes les games avec leur état (demandée, en cours, terminé)
    //Dans gamestate : les etats des parties

    // test requete "SELECT * FROM game where idUser1=?"[id]" or idUser2=?"[id]
      connection.query("SELECT * FROM game where idgame=?",
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

  //      FRANCK ///
}

exports.UserRepository = UserRepository;

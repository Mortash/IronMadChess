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

  this.getAllInfos = function (id, callback){
    pool.getConnection(function(err, connection){
      connection.query("SELECT id, loginUser, name, lastname, mail, country, birthday FROM user WHERE id=?;",
      [id], function(err, rows, fields){
        try {
          console.log(err);

          connection.destroy();
          if (!err)
          callback(JSON.stringify(rows));
          else
          callback("ko");
        } catch(e) {
          //callback("erreur mysql");
        }
      });
    });
  };

  this.setAllInfos = function (id, name, lastname, mail, home, birthday, password,callback){
    console.log(id, name, lastname, mail,home, birthday,password);

    var req = "UPDATE user SET name=?, lastname=?, mail=?, country=?, birthday=?";
    var param = [];

    (name!="") ? param.push(name) : param.push(null);
    (lastname!="") ? param.push(lastname) : param.push(null);
    (mail!="") ? param.push(mail) : param.push(null);
    (home!="") ? param.push(home) : param.push(null);
    (birthday!="") ? param.push(birthday) : param.push(null);

    if(password != "") {
      req += ", passwordUser=?";
      param.push(password);
    }

    param.push(id);
    req += " WHERE id=?;";

    pool.getConnection(function(err, connection){
      connection.query({
          sql: req,
          timeout: 40000, // 40s
          values: param
        }, function(err, rows, fields){
            console.log(err);
          try {
            connection.destroy();
            if (!err)
            callback("ok");
            else
            callback("ko");
          } catch(e) {
            //callback("erreur mysql");
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
          //callback("erreur mysql");
        }
      });
    });
  };



}

exports.UserRepository = UserRepository;

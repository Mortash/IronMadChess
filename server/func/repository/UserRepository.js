var mysql = require('mysql');
var param_sql = require('../../config/param').param_sql;
param_sql = new param_sql();

function UserRepository() {
  connection = mysql.createConnection({
      host     : param_sql.host,
      user     : param_sql.user,
      password : param_sql.password,
      database : param_sql.database
  });

  this.findOne = function(log, pass, callback) {
    connection.connect();

    var query = connection.query("SELECT * from user where loginUser=? and passwordUser=?;", [log, pass], function(err, rows, fields) {
      connection.end();
      
      if (rows.length>0)
        callback("ok");
      else
        callback("ko");
    });

  };

  this.addOne = function(log, pass, callback) {
    connection.connect();

    var query = connection.query("INSERT INTO user (loginUser, passwordUser) VALUES (?,?);", [log,pass], function(err, rows, fields) {
      connection.end();
      if (!err)
        callback("ok");
      else
        callback("ko");
    });
  };
}

exports.UserRepository = UserRepository;
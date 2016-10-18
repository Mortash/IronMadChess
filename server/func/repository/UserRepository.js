var mysql = require('mysql');
var connection = require('../config/param').connection;

function UserRepository() {

  this.findOne = function(log, pass, callback) {
    connection.connect();

    var query = connection.query("SELECT * from user where loginUser=? and passwordUser=?;", [log, pass], function(err, rows, fields) {
      connection.end();
      
      if (!err)
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
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

function UserRepository() {

  function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
  }

  Date.prototype.toSqlFormat = function() {
    return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate()) + " " +
    twoDigits(this.getHours()) + ":" + twoDigits(this.getMinutes()) + ":" + twoDigits(this.getSeconds());
  };

  this.majTime = function(id, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("UPDATE users SET lastAction=$1 where id=$2",
      [new Date().toSqlFormat(),id], function(err, rows) {

        client.release();

        if (!err)
          callback(id);
        else
          callback("ko");
      });
    });
  }

  this.findOne = function(log, pass, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("SELECT id from users where loginUser=$1 and passwordUser=$2;", [log, pass], function(err, rows) {
        
        client.release();

        if (rows.rowCount>0)
          new UserRepository().majTime(rows.rows[0].id, callback);
        else
          callback("ko");
      });
    });
  };

  this.addOne = function(log, pass, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query('INSERT INTO users (loginUser, passwordUser, lastAction) VALUES ($1,$2,$3);',
          [log, pass, new Date().toSqlFormat()], function(err, rows) {
            if (err) throw err;
            client.release();

            callback("ok");
        });
    });
  };

  this.getAllInfos = function (id, callback){
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("SELECT id, loginUser, name, lastname, mail, country, birthday FROM users WHERE id=$1;",
      [id], function(err, rows){
        client.release();

        if (!err)
          callback(JSON.stringify(rows.rows[0]));
        else
          callback("ko");
      });
    });
  };

  this.setAllInfos = function (id, name, lastname, mail, home, birthday, callback){
    var req = "UPDATE users SET name=$1, lastname=$2, mail=$3, country=$4, birthday=$5";
    var param = [];

    (name!="") ? param.push(name) : param.push(null);
    (lastname!="") ? param.push(lastname) : param.push(null);
    (mail!="") ? param.push(mail) : param.push(null);
    (home!="") ? param.push(home) : param.push(null);
    (birthday!="") ? param.push(birthday) : param.push(null);

    param.push(id);
    req += " WHERE id=$6;";
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query({
          sql: req,
          timeout: 40000, // 40s
          values: param
        }, function(err, rows){
            if(err) console.log(err);

            client.release();

            if (!err)
              callback("ok");
            else
              callback("ko");
      });
    });
  };

  this.getAll = function(log, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("SELECT id, loginUser from users where lastAction >= (CURRENT_TIMESTAMP - INTERVAL '10 MINUTE') AND loginUser != $1;",
      [log], function(err, rows) {
        if(err) console.log(err);

        client.release();

        if (!err)
          callback(JSON.stringify(rows.rows));
        else
          callback("ko");
      });
    });
  };

  this.getIdByLogin = function(log, callback) {
    pg.connect(function(err, client) {
      if (err) throw err;

      client.query("SELECT id from users where loginUser = $1;",
      [log], function(err, rows) {
        client.release();

        if (!err)
          callback(rows.rows[0].id);
        else
          callback("ko");

      });
    });
  };
}

exports.UserRepository = UserRepository;

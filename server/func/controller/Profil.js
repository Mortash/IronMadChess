var url = require('url');
var querystring = require('querystring');

var userRepo = require("../repository/UserRepository").UserRepository;

exports.getUserInfos = function (loginUser, callback){
  var usr = new userRepo();

  usr.getIdByLogin(loginUser, function(retId){
    usr.getAllInfos(retId, function(retValue){
      callback(retValue);
    });
  })
}

exports.setUserInfos = function(params, callback){
  var usr = new userRepo();
  usr.getIdByLogin(loginUser, function(retId){
    usr.setAllInfos(retId, params.name, params.lastname, params.mail, params.home, params.birthday, params.password, function(retValue){
      callback(retValue);
    });
  });
}

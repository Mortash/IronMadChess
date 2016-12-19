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

exports.setUserInfos = function(req, callback){
  var usr = new userRepo();
  usr.getIdByLogin(req.params.loginUser, function(retId){
    req = req.body;
    usr.setAllInfos(retId, req.name, req.lastname, req.mail, req.home, req.birthday, function(retValue){
      callback(retValue);
    });
  });
}

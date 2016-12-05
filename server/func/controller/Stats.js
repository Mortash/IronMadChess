var url = require('url');
var querystring = require('querystring');

var gameStateRepo = require("../repository/GameStateRepository").GameStateRepository;
var userRepo = require("../repository/UserRepository").UserRepository;


exports.getStats = function(loginUser, type, callback){
    var gSR = new gameStateRepo();
    var usr = new userRepo();

    usr.getIdByLogin(loginUser, function(retId){
      switch (type) {
        case 1:
        //coup par partie
        gSR.getStatsCPP(retId, function(retValue) {
                callback(retValue);
            });
          break;
          case 2:
          gSR.getStatsNP7(retId, function(retValue) {
                  callback(retValue);
              });
            break;
            case 3:
            gSR.getStatsPGP(retId, function(retValue) {
                    callback(retValue);
                });
              break;
              case 4:
              gSR.getStatsPTP(retId, function(retValue) {
                      callback(retValue);
                  });
                break;
      }
    })
}

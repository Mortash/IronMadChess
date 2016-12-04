var url = require('url');
var querystring = require('querystring');

var userRepo = require("../repository/UserRepository").UserRepository;


exports.getStats = function(id, shift, callback){
    var gSR = new userRepo();

    gSR.getStats(id, shift, function(retValue) {
        callback(retValue);
    });
}

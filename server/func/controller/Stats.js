var url = require('url');
var querystring = require('querystring');

var userRepo = require("../repository/UserRepository").UserRepository;


exports.majChart = function(id, shift, callback){
    var gSR = new userRepo();

    gSR.majChart(id, shift, function(retValue) {
        callback(retValue);
    });
}

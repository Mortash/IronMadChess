var url = require('url');
var querystring = require('querystring');

var gameStateRepo = require("../repository/GameStateRepository").GameStateRepository;

exports.getAGame = function(id, callback){
    var gSR = new gameStateRepo();
    gSR.getAGame(id, function(retValue) {
        callback(retValue);
    });
}

exports.saveAGame = function(id, shift, callback){
    var gSR = new gameStateRepo();
    
    gSR.saveAGame(id, shift, function(retValue) {
        callback(retValue);
    });
}

exports.getAllOfGame = function(id, shift, callback){
    var gSR = new gameStateRepo();
    
    gSR.getAllOfGame(id, shift, function(retValue) {
        callback(retValue);
    });
}

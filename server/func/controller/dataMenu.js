var url = require('url');
var querystring = require('querystring');

var userRepo = require("../repository/UserRepository").UserRepository;
var gameRepo = require("../repository/GameRepository").GameRepository;
var gameStateRepo = require("../repository/GameStateRepository").GameStateRepository;

exports.getallconnectuser = function(log, callback){
    var uR = new userRepo();
    uR.getAll(log, function(retValue) {
        callback(retValue);
    });
}

exports.getAllGame = function(log, state, callback){
    var gR = new gameRepo();
    var uR = new userRepo();

    uR.getIdByLogin(log, function(retValue1) {
        if(retValue1 !== "ko") {
            gR.getAllGameByState(retValue1, state, function(retValue) {
                callback(retValue);
            });
        } else
            callback(retValue1);
    });
}

exports.askNewGame = function(logFrom, logTo, callback){
    var gR = new gameRepo();
    var uR = new userRepo();

    uR.getIdByLogin(logFrom, function(retValue1) {
    	if(retValue1 !== "ko") {
		    gR.askGame(retValue1,logTo, function(retValue) {
		    	callback(retValue);
		    });
    	} else
    		callback(retValue1);
    });

}

exports.acceptGame = function(id, callback){
    var gR = new gameRepo();
    gR.acceptGame(id, function(retValue) {
        if(retValue==='ok') {
            var gSR = new gameStateRepo();
            gSR.initGame(id, function(retValue) {
                callback(retValue); 
            });
        } else
            callback(retValue);
    });
}
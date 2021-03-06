	var url = require('url');
var querystring = require('querystring');

var userRepo = require("../repository/UserRepository").UserRepository;

exports.signin = function(req, res){
	var params = req.body;

	// Si les deux identifiants sont renseignés
	if ('login' in params && 'password' in params) {
	    var uR = new userRepo();
	    var conn = uR.addOne(params["login"], params["password"], function(retValue) {
	        if(retValue=="ok") {
	            res.setHeader('Content-Type', 'text/plain');
  				res.status(204).send();
	        } else {
	            res.setHeader('Content-Type', 'text/plain');
  				res.status(500).send();
	        }
	    });
	} else {
	    res.setHeader('Content-Type', 'text/plain');
	    res.status(400).send();
	}
}
var url = require('url');
var express = require('express');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var userRepo = require("./func/repository/UserRepository").UserRepository;
var signinC = require("./func/controller/Signin").signin;

var app = express();
/*
 * Permets de savoir si l'utilisateur a droit à la page associer (+/- systeme de connexion)
 */
passport.use(new BasicStrategy(
  function(user, password, done) {
    var uR = new userRepo();
    var conn = uR.findOne(user, password, function(retValue) {
        if(retValue=="ok") {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
  }
));


app.get('/', function(req, res) {
    res.sendFile("index.html", { root: '../client/'});
})
.get('/login', passport.authenticate('basic', {session: false}), function(req, res) {
    console.log("login");

    console.log(req.user);
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('Ok');
})
.get('/signin', function(req, res) {
    console.log("signin");
    signinC(req, res);
})
.get('/menu', passport.authenticate('basic', {session: false}), function(req, res) {
    console.log("menu");

    console.log(req.user);
    res.sendFile("main.html", { root: '../client/public/'});
})
.get('/favicon.ico', function(req, res) {
})
.get(/\/css.*/, function(req, res) {
    //console.log(url.parse(req.url).pathname);
    res.sendFile(url.parse(req.url).pathname, { root: '../client/'});
})
.get(/\/js.*/, function(req, res) {
    //console.log("js/"+req.params.link);
    res.sendFile(url.parse(req.url).pathname, { root: '../client/'});
})
.use(function(req, res, next){
    console.log("aucune correspondance");
    var page = url.parse(req.url).pathname;
    console.log(page);

    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);
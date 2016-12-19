var url = require('url');
var express = require('express');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var userRepo = require("./func/repository/UserRepository").UserRepository;
var signinC = require("./func/controller/Signin").signin;
var dataMenu = require("./func/controller/dataMenu");
var game = require("./func/controller/Game");
var stats = require("./func/controller/Stats");
var profil = require("./func/controller/Profil");


var querystring = require('querystring');
var bodyParser = require("body-parser");

var app = express();
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));

/*
* Permets de savoir si l'utilisateur a droit à la page associer (+/- systeme de connexion)
*/
passport.use(new BasicStrategy(
  function(user, password, done) {
    var uR = new userRepo();

    uR.findOne(user, password, function(retValue) {
      if(retValue!="ko") {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }
));


app.get('/', function(req, res) {
  console.log("page login")

  res.sendFile("index.html", { root: './client/'});
})
.get('/menu', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("menu");

  res.sendFile("main.html", { root: './client/public/'});
})
.get('/playGame/:id', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("get a game " + req.params.id);

  res.sendFile("game.html", { root: './client/public/'});
})
.get('/stats', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("get stats");

  res.sendFile("stat.html", { root: './client/public/'});
})
.get('/profil/:loginUser', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("get profil");

  res.sendFile("profil.html", { root: './client/public/'});
})
.get('/favicon.ico', function(req, res) {
  res.sendFile("favicon.ico", { root: './client/picts/'});
})
.get('/login', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("login");

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send('Ok');
})
.post('/signin', function(req, res) {
  console.log("signin");

  signinC(req, res);
})
.post('/newGame/:iduser', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("get all connected user");

  res.setHeader('Content-Type', 'text/plain');
  dataMenu.askNewGame(req.user, req.params.iduser, function(retValue) {
    res.end(retValue);
  });
})
.get('/acceptGame/:idgame', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("accept game " + req.params.idgame);

  res.setHeader('Content-Type', 'text/plain');
  dataMenu.acceptGame(req.params.idgame, function(retValue) {
    res.status(200).send(retValue);
  });
})
.get('/getStats/:loginUser/:type', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("Stats " + req.params.loginUser);

  res.setHeader('Content-Type', 'text/json');

  stats.getStats(req.params.loginUser, parseInt(req.params.type), function(retValue) {
    res.status(200).send(retValue);
  });
})

.get('/getUserInfos/:loginUser', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("Profil " + req.params.loginUser);

  res.setHeader('Content-Type', 'text/json');

  profil.getUserInfos(req.params.loginUser, function(retValue) {
    res.status(200).send(retValue);
  });
})

.post('/setUserInfos/:loginUser', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("Profil " + req.params.loginUser);

  res.setHeader('Content-Type', 'text/json');

  profil.setUserInfos(req, function(retValue) {
    console.log(retValue);
    res.status(200).send(retValue);
  });
})
.get('/getallconnectuser', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("get all connected user");

  res.setHeader('Content-Type', 'text/json');
  dataMenu.getallconnectuser(req.user, function(retValue) {
    res.end(retValue);
  });
})
.get('/requestedGame', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("get all request game");

  res.setHeader('Content-Type', 'text/json');
  dataMenu.getAllGame(req.user, -1, function(retValue) {
    res.end(retValue);
  });
})
.get('/curplayinggame', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("get all currently playing game");

  res.setHeader('Content-Type', 'text/json');
  dataMenu.getAllGame(req.user, 0, function(retValue) {
    res.end(retValue);
  });
})
.get('/finishedgame', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("get all finished game");

  res.setHeader('Content-Type', 'text/json');
  dataMenu.getAllGame(req.user, 1, function(retValue) {
    res.end(retValue);
  });
})
.get('/infoGame/:id', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("get a game " + req.params.id);

  res.setHeader('Content-Type', 'text/json');
  game.getAGame(req.params.id, function(retValue) {
    res.end(retValue);
  });
})
.get('/getAllShift/:id', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("get all info game " + req.params.id);

  res.setHeader('Content-Type', 'text/json');
  game.getAllOfGame(req.params.id, function(retValue) {
    res.end(retValue);
  });
})
.post('/makeMove/', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("make move ");
  var bd = req.body;

  res.setHeader('Content-Type', 'text/json');
  game.saveAGame(bd.id, bd.shift, parseInt(bd.state), function(retValue) {
    res.status(200).send(retValue);
  });
})
.get('/link/:type', function(req, res) {
  console.log("get link " + req.params.type );

  var str = "";

  res.setHeader('Content-Type', 'text/json');
  switch(req.params.type) {
    case "login":
    str = '{ "links" : [' +
    '{"rel" : "login","href" : "login/"},' +
    '{"rel" : "menu","href" : "menu/"},' +
    '{"rel" : "signin","href" : "signin/"}' +
    ']}';
    break;
    case "menu":
    str = '{ "links" : [' +
    '{"rel" : "getACU","href" : "getallconnectuser/"},' +
    '{"rel" : "getRG","href" : "requestedGame/"},' +
    '{"rel" : "getCPG","href" : "curplayinggame/"},' +
    '{"rel" : "getFG","href" : "finishedgame/"},' +
    '{"rel" : "newGame","href" : "newGame/"},' +
    '{"rel" : "profilUser","href" : "profil/"},' +
    '{"rel" : "acceptGame","href" : "acceptGame/"},' +
    '{"rel" : "playGame","href" : "playGame/"},' +
    '{"rel" : "stats", "href" : "stats/"}' +
    ']}';
    break;
    case "game":
    str = '{ "links" : [' +
    '{"rel" : "menu","href" : "menu/"},' +
    '{"rel" : "infoGame","href" : "infoGame/"},' +
    '{"rel" : "makeMove","href" : "makeMove/"},' +
    '{"rel" : "getAllShift","href" : "getAllShift/"},' +
    '{"rel" : "stats", "href" : "stats/"},' +
    '{"rel" : "profil", "href" : "profil/"}' +
    ']}';
    break;
    case "profil":
    str = '{ "links" : [' +
    '{"rel" : "menu","href" : "menu"},' +
    '{"rel" : "logout","href" : "logout/"},' +
    '{"rel" : "stats", "href" : "stats/"},' +
    '{"rel" : "profil", "href" : "profil/"},' +
    '{"rel" : "getUserInfos", "href" : "getUserInfos/"},' +
    '{"rel" : "setUserInfos", "href" : "setUserInfos/"}' +
    ']}';
    break;
    case "stats":
    str = '{ "links" : [' +
    '{"rel" : "menu","href" : "menu"},' +
    '{"rel" : "logout","href" : "logout/"},' +
    '{"rel" : "stats", "href" : "stats/"},' +
    '{"rel" : "getStats", "href" : "getStats/"},' +
    '{"rel" : "profil", "href" : "profil/"}' +
    ']}';
    break;
  }

  res.status(200).send(str);
})
.use(function(req, res, next){
  console.log("aucune correspondance");
  var page = url.parse(req.url).pathname;
  console.log(page);

  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});

var port = process.env.PORT || "8080";
app.listen(port);
console.log("Server launched on "+port);

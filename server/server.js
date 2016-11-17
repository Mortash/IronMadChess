var url = require('url');
var express = require('express');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var userRepo = require("./server/func/repository/UserRepository").UserRepository;
var signinC = require("./server/func/controller/Signin").signin;
var dataMenu = require("./server/func/controller/dataMenu");
var game = require("./server/func/controller/game");

var querystring = require('querystring');

var app = express();
/*
* Permets de savoir si l'utilisateur a droit à la page associer (+/- systeme de connexion)
*/
passport.use(new BasicStrategy(
  function(user, password, done) {
    var uR = new userRepo();

    uR.findOne(user, password, function(retValue) {
      if(retValue=="ok") {
        return done(null, user);
      } else {
        return done("connexion refused");
      }
    });
  }
));


app.get('/', function(req, res) {
  console.log("page accueil")

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
  console.log("get all stats");

  res.sendFile("stat.html", { root: './client/public/'});

})
.get('/login', passport.authenticate('basic', {session: false}), function(req, res) {
  console.log("login");

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send('Ok');
})
.get('/logout', function(req, res) {
  console.log("logout");

  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send('Ok');
})
.get('/signin', function(req, res) {
  console.log("signin");

  signinC(req, res);
})
.get('/newGame/:iduser', passport.authenticate('basic', {session: false}), function(req, res) {
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
 .get('/makeMove/', passport.authenticate('basic', {session: false}), function(req, res) {
    console.log("make move ");

    var params = querystring.parse(url.parse(req.url).query);

    res.setHeader('Content-Type', 'text/json');
    game.saveAGame(params.id, params.shift, parseInt(params.state), function(retValue) {
        res.status(200).send(retValue);
    });
})
.get('/link/:type', function(req, res) {
  console.log("get link " + req.params.type );

  var str = "";

  res.setHeader('Content-Type', 'text/json');
  switch(req.params.type) {
    case "login":
    break;
    case "menu":
      str = '{ "links" : [' +
      '{"rel" : "getACU","href" : "getallconnectuser/"},' +
      '{"rel" : "getRG","href" : "requestedGame/"},' +
      '{"rel" : "getCPG","href" : "curplayinggame/"},' +
      '{"rel" : "getFG","href" : "finishedgame/"},' +
      '{"rel" : "logout","href" : "logout/"},' +
      '{"rel" : "newGame","href" : "newGame/"},' +
      '{"rel" : "profilUser","href" : "profilUser/"},' +
      '{"rel" : "acceptGame","href" : "acceptGame/"},' +
      '{"rel" : "playGame","href" : "playGame/"},' +
      '{"rel" : "stats", "href" : "stats/"}' +
      ']}';
    break;
    case "game":
      str = '{ "links" : [' +
      '{"rel" : "logout","href" : "logout/"},' +
      '{"rel" : "infoGame","href" : "infoGame/"},' +
      '{"rel" : "makeMove","href" : "makeMove/"},' +
      '{"rel" : "getAllShift","href" : "getAllShift/"},' +
      '{"rel" : "stats", "href" : "stats"}' +
      ']}';
    break;
    case "profil":
    break;
    case "stats":
      str = '{ "links" : [' +
      '{"rel" : "menu","href" : "menu"},' +
      '{"rel" : "logout","href" : "logout/"},' +
      '{"rel" : "stats", "href" : "stats"}' +
      ']}';
    break;
  }

  res.status(200).send(str);
})
.get('/favicon.ico', function(req, res) {
})
.get(/\/css.*/, function(req, res) {
  //console.log(url.parse(req.url).pathname);
  res.sendFile(url.parse(req.url).pathname, { root: './client/'});
})
.get(/\/js.*/, function(req, res) {
  //console.log("js/"+req.params.link);
  res.sendFile(url.parse(req.url).pathname, { root: './client/'});
})
.use(function(req, res, next){
  console.log("aucune correspondance");
  var page = url.parse(req.url).pathname;
  console.log(page);

  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});

app.listen(8080);
console.log("Server launched on http://localhost:8080");
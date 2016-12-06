// The root URL for the RESTful services
var ht = "http://";
var rootURL = "localhost:8080/";
var links = {};
var user;
var pass;

window.onload = function init() {
  var cook = document.cookie.split(';');
  cook.forEach(function(element,index) {
    element=element.replace(' ', '');
    if(element.slice(0,5) === "login"){
      user = element.slice(6);
      //document.querySelector("#user").innerHTML = user;
    }
    else if(element.slice(0,4) === "pass"){
      pass = element.slice(5);
    }
  });
  getLink();
};

function getLink(){
  $.ajax({
    type: 'GET',
    url: ht+rootURL + "link/stats",
    dataType: "json",
    success: function(data, statut){
      data.links.forEach(function(element, index, array){
        links[element.rel] = element.href;
      });
      document.querySelector("#menu").href = "../"+links.menu;
      document.querySelector("#profil").href = "../" + links.profil;

      majCPP();
      majNP7();
      majPGP();
      majPTP()
      },
      error: function(data, statut, erreur) {
        console.log(links.menu);
      }
    });
}

function majCPP(){
  $.ajax({
    type: 'GET',
    url: "../" + links.getStats + user + "/1",
    username: user,
    password: pass,
    dataType: "json",
    success: function(data, statut){
      var ctx = document.getElementById("chart1");
      var x = []; var y = []; var xCpt = 1;
      data.forEach(function(element, index, array) {
        x.push("Partie " + xCpt);
        y.push(parseInt(element.shots));
        xCpt++;
      });

      var myChart = new Chart(ctx, {
       type: 'line',
       data: {
         labels: x,
         datasets: [{
           label: 'Coups par parties',
                   //travail ici !!!
                   data: y,
                   backgroundColor: [
                   'rgba(255, 99, 132, 0.2)',
                   ],
                   borderWidth: 1,
                 }]
               },

             });
    },
    error:function(data, err, statut){
      console.log(data, err, statut);
    }
  });
}

function majPGP(){
  $.ajax({
    type: 'GET',
    url: "../" + links.getStats + user + "/3",
    username: user,
    password: pass,
    dataType: "json",
    success: function(data, statut){
      var y = new Array();
      y[0] = 0;
      y[1] = 0;
      y[2] = 0;
      y[3] = 0;
      data.forEach(function(element, index, array) {
        y[element.state] = parseInt(element.nb);
      });

      var ctx = document.getElementById("chart3");
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
         labels: [
         "En Cours",
         "Gagnée Mat",
         "Gagnée Pat",
         "Perdue"
         ],
         datasets: [
         {
           data: y,
           backgroundColor: [
           "#36A2EB",
           "#FFCE56",
           "#FFCE56",
           "#FF6384"
           ],
           hoverBackgroundColor: [
           "#36A2EB",
           "#FFCE56",
           "#FFCE56",
           "#FF6384"
           ]
         }]
       },

     });
    },
    error:function(data, err, statut){
      console.log(data, err, statut);
    }
  });
}

function majNP7(){
  $.ajax({
    type: 'GET',
    url: "../" + links.getStats + user + "/2",
    username: user,
    password: pass,
    dataType: "json",
    success: function(data, statut){
      var x = []; var y = [];
      data.forEach(function(element, index, array) {
        x.push(element.mois);
        y.push(parseInt(element.nbGame));
      });

      var ctx = document.getElementById("chart2");
      new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: x,
          datasets: [{
            label: "Partie par mois",
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            data: y,
          }]
        },
      });
    },
    error:function(data, err, statut){
      console.log(data, err, statut);
    }
  });
}

function majPTP(){
  $.ajax({
    type: 'GET',
    url: "../" + links.getStats + user + "/4",
    username: user,
    password: pass,
    dataType: "json",
    success: function(data, statut){
      var x = []; var y = [];
      data.forEach(function(element, index, array) {
        x.push(element.mois);
        y.push(parseInt(element.nbGame));
      });
      
      var ctx = document.getElementById("chart4");
      var myChart = new Chart(ctx, {
       type: 'bar',
       data: {
         labels: ["Partie 1", "Partie 2", "Partie 3", "Partie 4", "Partie 5", "Partie N"],
         datasets: [{
           label: 'Nombres de pions tués par partie',
                 //travail ici !!!
                 data: [8, 4,5, 9, 7, 4],
                 backgroundColor: [
                 "#FF6384",
                 "#36A2EB",
                 "#FFCE56",
                 "#FFCE56"
                 ],
                 hoverBackgroundColor: [
                 "#FF6384",
                 "#36A2EB",
                 "#FFCE56",
                 "#FFCE56"
                 ],
                 borderWidth: 1,
               }]
             },
           });
    },
    error:function(data, err, statut){
      console.log(data, err, statut);
    }
  });
}

//Structure Data for Donuts
var dataDonuts = {

};

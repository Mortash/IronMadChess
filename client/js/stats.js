// The root URL for the RESTful services
var ht = "http://";
var rootURL = "localhost:8080/";
var links = {};
var user;
var pass;

//var user;
console.log(links);
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

  function majCPP(){
    $.ajax({
      type: 'GET',
      url: "../" + links.getStats + user + "/1",
      username: user,
      password: pass,
      dataType: "json",
      success: function(data, statut){
        console.log("Ici : " ,data)
      var ctx = document.getElementById("chart1");
      var myChart = new Chart(ctx, {
           type: 'line',
           data: {
             labels: ["Partie 1", "Partie 2", "Partie 3", "Partie 4", "Partie 5", "Partie N"],
               datasets: [{
                 label: 'Coups par parties',
                   //travail ici !!!
                   data: [12, 19, 3, 5, 2, 3],
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
      console.log("Ici : " ,data)
    var ctx = document.getElementById("chart3");
    var myChart = new Chart(ctx, {
      type: 'doughnut',
         data: {
           labels: [
               "En Cours",
               "Perdue",
               "Gagnée Mat",
               "Gagnée Pat"
           ],
           datasets: [
               {
                   data: [3, 18, 10, 30],
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
      console.log("Ici : " ,data)
    var ctx = document.getElementById("chart2");
    new Chart(ctx, {
      type: 'horizontalBar',
        data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
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
                data: [5, 9, 8, 12, 15, 5, 20],
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
      console.log("Ici : " ,data)
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
  function getLink(){
    $.ajax({
      type: 'GET',
      url: ht+rootURL + "link/stats",
      dataType: "json",
      success: function(data, statut){
        data.links.forEach(function(element, index, array){
          links[element.rel] = element.href;
        });
        //majUserConnected();
        //majRequested();
        //majCurrently();
        //majFinished();
        majCPP();
        majNP7();
        majPGP();
        majPTP()
        document.querySelector("#menu").href = "../"+links.menu;
        document.querySelector("#profil").href = "../" + links.profil;

        console.log(links.menu);

      },
      error: function(data, statut, erreur) {
        console.log(links.menu);
      }
    });
  }
  getLink();
};

// Structure des données pour Data Bar



//Structure Data for Donuts
var dataDonuts = {

};

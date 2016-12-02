// The root URL for the RESTful services
var ht = "http://";
var rootURL = "localhost:8080/";
var links = {};

//var user;
console.log(links);
window.onload = function init() {

  function majChart(){
    $.ajax({
      type: 'GET',
      url: "../" + links.getStats,
      username: user,
      password: pass,
      dataType: "json",
      success: function(data, statut){
      var ctx = document.getElementById("chart1");
      var myChart = new Chart(ctx, {
           type: 'line',

           data: {
               labels: ["Partie 1", "Partie 2", "Yellow", "Green", "Purple", "Orange"],
               datasets: [{
                   //label: '# of Votes',
                   data: [12, 19, 3, 5, 2, 3],
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
               }]
           },

       });
    })
  }
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


// var ctx = document.getElementById("chart1");
// var myChart = new Chart(ctx, {
//      type: 'line',
//
//      data: {
//          labels: ["Partie 1", "Partie 2", "Yellow", "Green", "Purple", "Orange"],
//          datasets: [{
//              //label: '# of Votes',
//              data: [12, 19, 3, 5, 2, 3],
//              backgroundColor: [
//                  'rgba(255, 99, 132, 0.2)',
//                  'rgba(54, 162, 235, 0.2)',
//                  'rgba(255, 206, 86, 0.2)',
//                  'rgba(75, 192, 192, 0.2)',
//                  'rgba(153, 102, 255, 0.2)',
//                  'rgba(255, 159, 64, 0.2)'
//              ],
//              borderColor: [
//                  'rgba(255,99,132,1)',
//                  'rgba(54, 162, 235, 1)',
//                  'rgba(255, 206, 86, 1)',
//                  'rgba(75, 192, 192, 1)',
//                  'rgba(153, 102, 255, 1)',
//                  'rgba(255, 159, 64, 1)'
//              ],
//              borderWidth: 1,
//          }]
//      },
//
//  });


// Structure des données pour Data Bar
 var dataBar = {
     labels: ["January", "February", "March", "April", "May", "June", "July"],
     datasets: [
         {
             label: "My First dataset",
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
             data: [65, 59, 80, 81, 56, 55, 40],
         }
     ]
 };
var ctx2 = document.getElementById("chart2");
new Chart(ctx2, {
  type: 'horizontalBar',
    data: dataBar,
});

//Structure Data for Donuts
var dataDonuts = {
    labels: [
        "Red",
        "Blue",
        "Yellow"
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
};
 var ctx3 = document.getElementById("chart3");
 new Chart(ctx3, {
   type: 'doughnut',
    data: dataDonuts,
 });

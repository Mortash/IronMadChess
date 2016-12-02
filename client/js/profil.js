// The root URL for the RESTful services
var ht = "http://";
var rootURL = "localhost:8080/";
var links = {};
//var user;
console.log(links);
window.onload = function init() {

  var Name = "Test querySelector";
  var LastName ="";
  var mail = "";

 document.querySelector('#name').value = Name;
 document.querySelector('#prenom').value = LastName;
 document.querySelector('#mail').value = mail;



  function getLink(){
    $.ajax({
      type: 'GET',
      url: ht+rootURL + "link/profil",
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
        console.log(links.menu);

      },
      error: function(data, statut, erreur) {
        console.log(links.menu);
      }
    });
  }
  getLink();
};

//Structure Data for Donuts

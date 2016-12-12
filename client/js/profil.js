// The root URL for the RESTful services
var ht = "http://";
var rootURL = "localhost:8080/";
var links = {};
//var user;
console.log(links);


var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function edit(){
  console.log("You get update your profil");
  modal.style.display = "block";


}

function update(){
  console.log("You have update your profil !");
}

window.onload = function init() {

  var Name = "FORET";
  var LastName = "Franck";
  var mail = "john.doe@gmail.com";
  var home = "Paris, FRANCE";
  var birthday = "22-12-1985";


 //document.querySelector('#name').value = Name;
 document.querySelector('#all_Name').innerHTML = Name + " " + LastName;
 //document.querySelector('#prenom').value = LastName;
 document.querySelector('#mail').innerHTML = mail;
 document.querySelector('#home').innerHTML = home;
 document.querySelector('#birthday').innerHTML = birthday;




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
        document.querySelector("#profil").href = "../"+links.profil;
        document.querySelector("#stats").href = "../"+links.stats;
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

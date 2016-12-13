// The root URL for the RESTful services
var ht = "http://";
var rootURL = "localhost:8080/";
var links = {};
var user;
var pass;

//var user;
console.log(links);



// Get the button that opens the modal

function ModalUpdate(){
  document.querySelector('#update').addEventListener("click", function(){
    $('#myModal').modal({
      //keyboard: false,
      //backdrop: "static",
      show: false
    });
    $('#ModalSuccess').modal({
      //keyboard: false,
      //backdrop: "static",
      show: true
    });
  });
}

document.querySelector('#editbtn').addEventListener("click", function(){
  $('#myModal').modal({
    //keyboard: false,
    //backdrop: "static",
    show: true
  });
});


document.querySelector('#update').addEventListener("click", function(){
    console.log("You have update your profil !");
    updateInfo();
    //ModalUpdate();
}

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


  function showInfo(){
    $.ajax({
      type: 'GET',
      url: "../" + links.getUserInfos + user,
      username: user,
      password: pass,
      dataType: "json",
      success: function(data, statut){
        console.log("Data dans showInfo " ,data);
        var Name = data[0].loginUser;
        var LastName = "";
        var mail = "";
        var home = "";
        var birthday = "";

        //document.querySelector('#name').value = Name;
        document.querySelector('#all_Name').innerHTML = Name + " " + LastName;
        //document.querySelector('#prenom').value = LastName;
        document.querySelector('#mail').innerHTML = mail;
        document.querySelector('#home').innerHTML = home;
        document.querySelector('#birthday').innerHTML = birthday;


      },
      error:function(data, err, statut){
        console.log(data, err, statut);
      }
    });
  }

  function updateInfo(){
    var name = document.querySelector('#inputName').value;
    var LastName = document.querySelector('#inputLastname').value;
    var mail = document.querySelector('#inputMail').value;
    var home = document.querySelector('#inputHome').value;
    var birthday = document.querySelector('#inputBirthday').value;
    var password = document.querySelector('#inputPassword').value;

    $.ajax({
      type: 'GET',
      url: "../" + links.setUserInfos + user,
      username: user,
      password: pass,
      dataType: "json",
      data : {
        name: name,
        lastname: LastName,
        mail: mail,
        home: home,
        birthday: birthday,
        password: password
      },
      success: function(data, statut){
        ModalUpdate();
        //  console.log("Data dans showInfo " ,data);
        // afficher Modal success
      },
      error:function(data, err, statut){
        console.log(data, err, statut);
      }
    });
  }


  function getLink(){
    $.ajax({
      type: 'GET',
      url: ht+rootURL + "link/profil",
      dataType: "json",
      success: function(data, statut){
        data.links.forEach(function(element, index, array){
          links[element.rel] = element.href;
        });
        document.querySelector("#menu").href = "../"+links.menu;
        document.querySelector("#profil").href = "../"+links.profil;
        document.querySelector("#stats").href = "../"+links.stats;
        console.log(links.menu);
        showInfo();
        //updateInfo();
      },
      error: function(data, statut, erreur) {
        console.log(links.menu);
      }
    });
  }
  getLink();
};

//Structure Data for Donuts

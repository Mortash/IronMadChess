var links = {};
var user;
var pass;

function ModalUpdate(){
  $('#myModal').modal('hide');

  $('#ModalSuccess').modal({
    keyboard: true,
    show: true
  });

  setTimeout(function(){$('#ModalSuccess').modal('hide')}, 2000); 
  showInfo();
}

document.querySelector('#editbtn').addEventListener("click", function(){
  $('#inputBirthday').datepicker({
    format: 'dd/mm/yyyy',
    language: 'fr',

  });
  $('#myModal').modal({
    keyboard: true,
    show: true
  });
});

document.querySelector('#update').addEventListener("click", function(){
    updateInfo();
});

window.onload = function init() {
  var cook = document.cookie.split(';');
  cook.forEach(function(element,index) {
    element=element.replace(' ', '');
    if(element.slice(0,5) === "login"){
      user = element.slice(6);
      document.querySelector("#user").innerHTML = user;
    }
    else if(element.slice(0,4) === "pass"){
      pass = element.slice(5);
    }
  });

  if(user != document.URL.split('/')[4])
    document.querySelector("#editbtn").classList.add("hidden");

  getLink();
};

function showInfo(){
  $.ajax({
    type: 'GET',
    url: "../" + links.getUserInfos + document.URL.split('/')[4],
    username: user,
    password: pass,
    dataType: "json",
    success: function(data, statut){
      console.log(data);
      var login = data.loginuser;
      var Name = (data.name!=null)? data.name : "";
      var LastName = (data.lastname!=null)? data.lastname : "";
      var mail = data.mail;
      var home = data.country;
      var birthday = "";
      if(data.birthday!=null) {
        var birthday = new Date(data.birthday);
        birthday = twoDigits(birthday.getDate()) + "/" + twoDigits(birthday.getMonth()+1) + "/" + twoDigits(birthday.getFullYear());
      }

      // maj affichage principal
      document.querySelector('#login').innerHTML = login;
      document.querySelector('#allName').innerHTML = LastName + " " + Name;
      document.querySelector('#mail').innerHTML = mail;
      document.querySelector('#home').innerHTML = home;
      document.querySelector('#birthday').innerHTML = birthday;

      // maj formulaire de changement
      document.querySelector('#inputName').value = Name;
      document.querySelector('#inputLastname').value = LastName;
      document.querySelector('#inputMail').value = mail;
      document.querySelector('#inputHome').value = home;
      document.querySelector('#inputBirthday').value = birthday;
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
  var birthday = new Date(document.querySelector('#inputBirthday').value);

  birthday = birthday.getFullYear() + "-" + twoDigits(birthday.getDate()) + "-" + twoDigits(1+birthday.getMonth());

  $.ajax({
    type: 'POST',
    url: "../" + links.setUserInfos + user,
    username: user,
    password: pass,
    dataType: "text",
    data : {
      name: name,
      lastname: LastName,
      mail: mail,
      home: home,
      birthday: birthday
    },
    success: function(data, statut){
      ModalUpdate();
    },
    error:function(data, err, statut){
      console.log(data, err, statut);
    }
  });
}


function getLink(){
  $.ajax({
    type: 'GET',
    url: "../link/profil",
    dataType: "json",
    success: function(data, statut){
      data.links.forEach(function(element, index, array){
        links[element.rel] = element.href;
      });
      document.querySelector("#menu").href = "../"+links.menu;
      document.querySelector("#profil").href = "../"+links.profil + user;
      document.querySelector("#stats").href = "../"+links.stats;

      showInfo();
    },
    error: function(data, statut, erreur) {
      console.log(links.menu);
    }
  });
}

function twoDigits(d) {
  if(0 <= d && d < 10) return "0" + d.toString();
  if(-10 < d && d < 0) return "-0" + (-1*d).toString();
  return d.toString();
}
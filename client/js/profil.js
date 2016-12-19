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
    console.log("You have update your profil !");
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

  getLink();
};

function showInfo(){
  $.ajax({
    type: 'GET',
    url: "../" + links.getUserInfos + user,
    username: user,
    password: pass,
    dataType: "json",
    success: function(data, statut){
      var login = data[0].loginUser;
      var Name = (data[0].name!=null)? data[0].name : "";
      var LastName = (data[0].lastname!=null)? data[0].lastname : "";
      var mail = data[0].mail;
      var home = data[0].country;
      var birthday = "";
      if(data[0].birthday!=null) {
        var birthday = new Date(data[0].birthday);
      console.log(birthday);
        /*var birthday = new Date(Date.UTC(birthday.getFullYear(), birthday.getMonth));*/
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
      document.querySelector("#profil").href = "../"+links.profil;
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
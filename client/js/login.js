var links = {};

window.onload = function init() {
	if(navigator.userAgent.indexOf("Chrome") !== -1){
		document.querySelector("#formulaire").action ="menu";
	}

	$('#modalLogin').modal({
		keyboard: false,
		backdrop: "static",
		show: true
	});

	document.querySelector("#inputLogin").focus();

	function login(){
		var login = document.querySelector("#inputLogin").value;
		var password = document.querySelector("#inputPassword").value;

		if(login!=="" && password!=="") {
			$.ajax({
				method: 'GET',
				url: links.login,
				username: login,
				password: window.btoa(password),
				dataType: "html", 
				success: function(data, statut){
					document.cookie = "login=" + login;
					window.location = links.menu;
				},
				error: function(data, statut, erreur) {
					addWarning("Impossible de se connecter !");
					console.log(data);
					console.log(statut);
					console.log(erreur);
				}
			});
		} else {
			addWarning("Veuillez renseigner tous les champs !");
		}
	}

	function addWarning(message) {
		var d = document.createElement("div");
		d.classList.add("alert","alert-warning","alert-dismissible","col-xs-10","col-xs-offset-1");
		d.innerHTML = message;

		document.querySelector("#erreur").innerHTML = " ";
		document.querySelector("#erreur").appendChild(document.createElement("br"));
		document.querySelector("#erreur").appendChild(d);
	}

	document.querySelector("#login").addEventListener("click", function(){
		login();
	}, false); 

	document.querySelector("#login").addEventListener("keypress", function() {
	    var key = e.which || e.keyCode;
	    if (key === 13) { login();}
	}, false); 	

	document.querySelector("#signin").addEventListener("click", function(){

		var login = document.querySelector("#inputLogin").value;
		var password = document.querySelector("#inputPassword").value;

		if(login!=="" && password!=="") {
			$.ajax({
				method: 'GET',
				url: links.signin,
				data: {
					login: login,
					password: window.btoa(password)
				},
				dataType: "html",  
				statusCode: {
				    204: function() {
						login();
				    }
			    },
				error: function(data, statut, erreur) {
					addWarning("Impossible de s'enregistrer !");
				}
			});
		}

	}, false); 

	function getLink(){
		$.ajax({
			type: 'GET',
			url: "./link/login",
			dataType: "json", 
			success: function(data, statut){
				data.links.forEach(function(element, index, array){
					links[element.rel] = element.href;
				});
			},
			error: function(data, statut, erreur) {
				console.log(data);	
			}
		});
	}

	getLink();
};
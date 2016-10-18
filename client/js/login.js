// The root URL for the RESTful services
var rootURL = "http://localhost:8080/";

window.onload = function init() {
	$('#modalLogin').modal({
		keyboard: false,
		backdrop: "static",
		show: true
	});




	document.querySelector("#login").addEventListener("click", function(){

		var login = document.querySelector("#inputLogin").value;
		var password = document.querySelector("#inputPassword").value;

		if(login!=="" && password!=="") {
			$.ajax({
				type: 'GET',
				url: rootURL + "login",
				username: login,
				password: window.btoa(password),
				dataType: "html", 
				success: function(data, statut){
					$('#modalLogin').modal("hide");
					document.querySelector("#mainNav").classList.remove("hidden");
				},
				error: function(data, statut, erreur) {
					var d = document.createElement("div");
					d.classList.add("alert","alert-warning","alert-dismissible","col-xs-10","col-xs-offset-1");
					d.innerHTML = "Impossible de se connecter !";

					document.querySelector("#erreur").innerHTML = " ";
					document.querySelector("#erreur").appendChild(document.createElement("br"));
					document.querySelector("#erreur").appendChild(d);
				}
			});
		}
	}, false); 


	function addWarning(message) {
		var d = document.createElement("div");
		d.classList.add("alert","alert-warning","alert-dismissible","col-xs-10","col-xs-offset-1");
		d.innerHTML = message;

		document.querySelector("#erreur").innerHTML = " ";
		document.querySelector("#erreur").appendChild(document.createElement("br"));
		document.querySelector("#erreur").appendChild(d);
	}

	document.querySelector("#signin").addEventListener("click", function(){

		var login = document.querySelector("#inputLogin").value;
		var password = document.querySelector("#inputPassword").value;

		if(login!=="" && password!=="") {
			$.ajax({
				type: 'GET',
				url: rootURL + "signin",
				data: {
					login: login,
					password: window.btoa(password)
				},
				dataType: "html", 
				success: function(data, statut){
					if(data==="true") {
						$('#modalLogin').modal("hide");
						document.querySelector("#mainNav").classList.remove("hidden");
					} else {
						addWarning("Impossible de s'enregistrer !");
					}
				},
				error: function(data, statut, erreur) {
					addWarning("Erreur du serveur, veuillez réssayer");
				}
			});
		}

	}, false); 


};
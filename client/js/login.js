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
				url: "login",
				username: login,
				password: window.btoa(password),
				dataType: "html", 
				success: function(data, statut){
					window.location = "menu";
				},
				error: function(data, statut, erreur) {
					addWarning("Impossible de se connecter !");
					console.log("Impossible de se connecter !");
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
				url: "signin",
				data: {
					login: login,
					password: window.btoa(password)
				},
				dataType: "html",  
				statusCode: {
				    204: function() {
						window.location = "menu";
				    }
			    },
				error: function(data, statut, erreur) {
					addWarning("Impossible de s'enregistrer !");
				}
			});
		}

	}, false); 


};
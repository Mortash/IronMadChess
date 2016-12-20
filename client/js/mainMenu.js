// The root URL for the RESTful services
var links = {};
var user;
var pass;

window.onload = function init() {
	// Récupération du login et mdp de l'utilisateur
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

	/*
	 * Récupération des liens
	 */
	function getLink(){
		$.ajax({
			type: 'GET',
			url: "../link/menu",
			dataType: "json",
			success: function(data, statut){
				data.links.forEach(function(element, index, array){
					links[element.rel] = element.href;
				});

				document.querySelector("#stats").href = "../" + links.stats;
				document.querySelector("#profil").href = "../" + links.profilUser + user;

				document.querySelectorAll("#accueil").forEach(function(element,index) {
					element.href = document.URL;
				});

				majUserConnected(false);
				majRequested(false);
				majCurrently(false);
				majFinished(false);
			},
			error: function(data, statut, erreur) {
				console.log(data);
			}
		});
	}

	getLink();
};



/*
 * Mets à jour la liste des utilisateurs connectées
 */
function majUserConnected(forced){
	$.ajax({
		type: 'GET',
		url: "../" + links.getACU,
		username: user,
		password: pass,
		dataType: "json",
		success: function(data, statut){
			var ulUser = document.querySelector("#userOnline");
			ulUser.innerHTML="";

			/******* aperçu des lignes ********
			<li class="list-group-item">
				<a href="#">Test</a>					// lien de visualisation du profil
				<a href="#" class="pull-right">+</a>	// lien pour proposer une partie
			</li>*/
			if(data.length) {
				data.forEach(function(element, index, array){
					console.log(element);
					log = element.loginuser;

					var li = document.createElement("li");
					li.classList.add("list-group-item");

					var aUser = document.createElement("a");
					aUser.href = "../" + links.profilUser + log;
					aUser.innerHTML = log;

					var aOpen = document.createElement("a");
					aOpen.classList.add("pull-right");
					aOpen.href = "#";
					aOpen.addEventListener("click", function(){ {
						$.ajax({
							type: 'POST',
							url: "../" + links.newGame + element.id,
							username: user,
							password: pass,
							dataType: "html",
							success: function(data, statut){
								document.querySelector("#modBo").innerHTML = "La partie a été proposé !";
								$('#modalValid').modal({
									show: true
								});
							},
							error: function(data, statut, erreur) {
								console.log(data);
							}
						});
					}});
					aOpen.innerHTML = "+";

					li.appendChild(aUser);
					li.appendChild(aOpen);
					ulUser.appendChild(li);
				});
			} else {
				var li = document.createElement("li");
				li.classList.add("list-group-item");
				li.innerHTML = "Aucun utilisateur connecté";
				ulUser.appendChild(li);
			}
		},
		error: function(data, statut, erreur) {
			console.log(erreur);
		}
	});

	if(!forced) {
		/*setTimeout(majUserConnected,300000); // 5minutes*/
		setTimeout(function() {
    			majUserConnected(false);
			},15000);
	}
}

/*
 * Mets à jour la liste des parties proposées
 */
function majRequested(forced){
	$.ajax({
		type: 'GET',
		url: "../" + links.getRG,
		username: user,
		password: pass,
		dataType: "json",
		success: function(data, statut){
			var ulUser = document.querySelector("#requestGame");
			ulUser.innerHTML="";

			/******* aperçu des lignes ********
			<li class="list-group-item">
				<a href="#">Test</a>					// lien de visualisation du profil
				<a href="#" class="pull-right">+</a>	// lien pour proposer une partie
			</li>*/
			if(data.length) {
				data.forEach(function(element, index, array){
					var li = document.createElement("li");
					li.classList.add("list-group-item");

					var aUser = document.createElement("a");
					aUser.href = "../" + links.profilUser + element.loginuser;
					aUser.innerHTML = element.loginuser;

					var aAction = document.createElement("a");
					aAction.classList.add("pull-right");
					aAction.id = element.idgame;
					aAction.href = "#";
					aAction.innerHTML = "Accepter";
					aAction.addEventListener("click", function(){ {
						$.ajax({
							type: 'GET',
							url: "../" + links.acceptGame + this.id,
							username: user,
							password: pass,
							dataType: "html",
							success: function(data, statut){
								document.querySelector("#modBo").innerHTML = "La partie a été accepté !";
								$('#modalValid').modal({
									show: true
								});
								majRequested(true);
								majCurrently(true);
							},
							error: function(data, statut, erreur) {
								console.log(data);
							}
						});
					}});

					li.appendChild(aUser);
					li.appendChild(aAction);
					ulUser.appendChild(li);
				});
			} else {
				var li = document.createElement("li");
				li.classList.add("list-group-item");
				li.innerHTML = "Aucune partie demandée";
				ulUser.appendChild(li);
			}
		},
		error: function(data, statut, erreur) {
			console.log(data);
		}
	});

	if(!forced) {
		/*setTimeout(majUserConnected,300000); // 5minutes*/
		setTimeout(function() {
    			majRequested();
			},15000);
	}
}

/*
 * Mets à jour la liste des parties en cours de jeu
 */
function majCurrently(forced){
	$.ajax({
		type: 'GET',
		url: "../" + links.getCPG,
		username: user,
		password: pass,
		dataType: "json",
		success: function(data, statut){
			var ulUser = document.querySelector("#curplay");
			ulUser.innerHTML="";

			/******* aperçu des lignes ********
			<li class="list-group-item">
				<a href="#">Test</a>					// lien de visualisation du profil
				<a href="#" class="pull-right">+</a>	// lien pour proposer une partie
			</li>*/
			if(data.length) {
				data.forEach(function(element, index, array){
					var li = document.createElement("li");
					li.classList.add("list-group-item");

					var aUser = document.createElement("a");
					aUser.href = "../" + links.profilUser + element.loginuser;
					if(element.loginuser == user)
						aUser.innerHTML = "Vous-même";
					else
						aUser.innerHTML = element.loginuser;

					var aPlay = document.createElement("a");
					aPlay.classList.add("pull-right");
					aPlay.href = "../" + links.playGame + element.idgame;
					aPlay.innerHTML = "Jouer";

					li.appendChild(aUser);
					li.appendChild(aPlay);
					ulUser.appendChild(li);
				});
			} else {
				var li = document.createElement("li");
				li.classList.add("list-group-item");
				li.innerHTML = "Aucune partie demandée";
				ulUser.appendChild(li);
			}
		},
		error: function(data, statut, erreur) {
			//console.log(data);
		}
	});

	if(!forced) {
		/*setTimeout(majUserConnected,300000); // 5minutes*/
		setTimeout(function() {
    			majCurrently();
			},15000);
	}
}

/*
 * Mets à jour la liste des parties termniées
 */
function majFinished(forced){
	$.ajax({
		type: 'GET',
		url: "../" + links.getFG,
		username: user,
		password: pass,
		dataType: "json",
		success: function(data, statut){
			var ulUser = document.querySelector("#finishedGame");
			ulUser.innerHTML="";

			/******* aperçu des lignes ********
			<li class="list-group-item">
				<a href="#">Test</a>					// lien de visualisation du profil
				<a href="#" class="pull-right">+</a>	// lien pour proposer une partie
			</li>*/
			if(data.length) {
				data.forEach(function(element, index, array){
					var li = document.createElement("li");
					li.classList.add("list-group-item");

					var aUser = document.createElement("a");
					aUser.href = "../" + links.profilUser + element.loginuser;
					aUser.innerHTML = element.loginuser;

					var aPlay = document.createElement("a");
					aPlay.classList.add("pull-right");
					aPlay.href = "../" + links.playGame + element.idgame;
					aPlay.innerHTML = "Voir";

					li.appendChild(aUser);
					li.appendChild(aPlay);
					ulUser.appendChild(li);
				});
			} else {
				var li = document.createElement("li");
				li.classList.add("list-group-item");
				li.innerHTML = "Aucune partie terminée";
				ulUser.appendChild(li);
			}
		},
		error: function(data, statut, erreur) {
			//console.log(data);
		}
	});

	if(!forced) {
		/*setTimeout(majUserConnected,300000); // 5minutes*/
		setTimeout(function() {
    			majFinished();
			},15000);
	}
}

/*
 * Permets de créer une partie contre "soi" (même compte)
 */
 document.querySelector("#playHere").addEventListener("click", function(){
 	// Récupère les infos de l'utilisateur connecté
	$.ajax({
		type: 'GET',
		url: "../" + links.getUserInfos + user,
		username: user,
		password: pass,
		dataType: "json",
		success: function(data, statut){
			var userId = data.id;
		 	// Fait la demande de création de partie
			$.ajax({
				type: 'POST',
				url: "../" + links.newGame + userId,
				username: user,
				password: pass,
				dataType: "json",
				success: function(data, statut){
					var idgame = data[0].idgame;
					// Valide la partie
					$.ajax({
						type: 'GET',
						url: "../" + links.acceptGame + idgame,
						username: user,
						password: pass,
						dataType: "html",
						success: function(data, statut){
							// renvoie vers la partie créée
							var link = "../" + links.playGame + idgame;
							window.location = link;
						},
						error: function(data, statut, erreur) {
							console.log(data);
						}
					});
				},
				error: function(data, statut, erreur) {
					console.log("erreur");
					console.log(data);
				}
			});
		},
		error: function(data, statut, erreur) {
			console.log(data);
		}
	});
 });
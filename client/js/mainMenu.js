// The root URL for the RESTful services
var ht = "http://";
var rootURL = "localhost:8080/";
var links = {};
var user;

window.onload = function init() {
	user = document.URL.split("/")[2].split(":")[0];
	document.querySelector("#user").innerHTML = user;


	document.querySelector("#logout").addEventListener("click", function(){
		$.ajax({
			type: 'GET',
			url: ht+rootURL + links.logout,
			username: "log",
			password: "out",
			dataType: "html", 
			success: function(data, statut){
				window.location = ht+rootURL;
			}
		});
	}, false);


	function majUserConnected(){
		$.ajax({
			type: 'GET',
			url: ht+rootURL + links.getACU,
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
						log = element.loginUser;
						
						var li = document.createElement("li");
						li.classList.add("list-group-item");

						var aUser = document.createElement("a");
						aUser.href = links.profilUser + element.id;
						aUser.innerHTML = log;

						var aOpen = document.createElement("a");
						aOpen.classList.add("pull-right");
						aOpen.href=links.newGame + element.id;        		/*  LANCER UNE FONCTION AJOUTANT UN CLIC LISTENER  */
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
			}
		});

		/*setTimeout(majUserConnected,300000); // 5minutes*/
		setTimeout(function() {
    			majUserConnected();
			},15000);
	}

	function majRequested(){
		$.ajax({
			type: 'GET',
			url: ht+rootURL + links.getRG,
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
						aUser.href = links.profilUser + element.idUser1;
						aUser.innerHTML = element.loginUser;

						var aAction = document.createElement("a");
						aAction.classList.add("pull-right");
						aAction.id = element.idgame;
						aAction.href = "#";
						aAction.innerHTML = "Accept";
						aAction.addEventListener("click", function(){ {
							$.ajax({
								type: 'GET',
								url: links.acceptGame + this.id,
								dataType: "html", 
								success: function(data, statut){
									console.log(data);
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
				//console.log(data);	
			}
		});

		/*setTimeout(majUserConnected,300000); // 5minutes*/
		setTimeout(function() {
    			majRequested();
			},15000);
	}

	function majCurrently(){
		$.ajax({
			type: 'GET',
			url: ht+rootURL + links.getCPG,
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
						aUser.href = links.profilUser + element.idUser1;
						aUser.innerHTML = element.loginUser;

						var aPlay = document.createElement("a");
						aPlay.classList.add("pull-right");
						aPlay.href = links.playGame + element.idgame;
						aPlay.innerHTML = "Play";

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

		/*setTimeout(majUserConnected,300000); // 5minutes*/
		setTimeout(function() {
    			majCurrently();
			},15000);
	}

	function majFinished(){
		$.ajax({
			type: 'GET',
			url: ht+rootURL + links.getFG,
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
						aUser.href = links.profilUser + element.idUser1;
						aUser.innerHTML = element.loginUser;

						var aPlay = document.createElement("a");
						aPlay.classList.add("pull-right");
						aPlay.href = links.playGame + element.idgame;
						aPlay.innerHTML = "See";

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

		/*setTimeout(majUserConnected,300000); // 5minutes*/
		setTimeout(function() {
    			majFinished();
			},15000);
	}

	function getLink(){
		$.ajax({
			type: 'GET',
			url: ht+rootURL + "link/menu",
			dataType: "json", 
			success: function(data, statut){
				data.links.forEach(function(element, index, array){
					links[element.rel] = element.href;
				});
				majUserConnected();
				majRequested();
				majCurrently();
				majFinished();
			},
			error: function(data, statut, erreur) {
				console.log(data);	
			}
		});
	}

	getLink();
};
// The root URL for the RESTful services
var links = {};
var user = "";
var toPlayed;
var col;
var id;
var game;
var quickGame;
var picked = undefined;
var listShift;

window.onload = function init() {
	user = document.URL.split("/")[2].split(":")[0];
	document.querySelector("#user").innerHTML = user;

	id = document.URL.split("/")[4];

	document.querySelector("#logout").addEventListener("click", function(){
		$.ajax({
			type: 'GET',
			url: "../" + links.logout,
			username: "log",
			password: "out",
			dataType: "html", 
			success: function(data, statut){
				window.location = window.location.origin;
			}
		});
	}, false);

	getLink();
};

$(window).resize(function() {
	initCanvas();

	drawTable(quickGame, true);
});


function getLink(){
	$.ajax({
		type: 'GET',
		url: "../link/game",
		dataType: "json", 
		success: function(data, statut){
			data.links.forEach(function(element, index, array){
				links[element.rel] = element.href;
			});
			
			document.querySelector("#stats").href = "../" + links.stats;

			initCanvas();
			getAllOfGame();
			getGame();
			addEvent();
		},
		error: function(data, statut, erreur) {
			console.log(data);	
		}
	});
}

function getGame(){
	$.ajax({
		type: 'GET',
		url: "../" + links.infoGame + id,
		dataType: "json", 
		success: function(data, statut){
			data = data[0];

			quickGame = prepareData(data);

			// cas ou la partie à déjà commencé
			if(data.shifting !== null) {
				col = (data.shifting.charAt(1)==="B")? "N":"B";
				if(data.shifting.charAt(1) === "B")
					toPlayed = data.user2;
				else
					toPlayed = data.user1;
			} else {	// cas ou la ça va être le premier coup
				col = "B";
				if(data.user1 === user) {
					toPlayed = user;
				} else {
					toPlayed = data.user1;
				}
			}
			
			drawTable(quickGame, true);
		},
		error: function(data, statut, erreur) {
			console.log(erreur);
		}
	});
}

function getAllOfGame(){
	$.ajax({
		type: 'GET',
		url: "../" + links.getAllShift + id,
		dataType: "json", 
		success: function(data, statut){
			listShift = data;

			var ulUser = document.querySelector("#curMovePlay");
			ulUser.innerHTML="";

			listShift.forEach(function(element,index, array) {
				var liA = document.createElement("a");
				liA.classList.add("list-group-item");
				liA.id = index;

				liA.addEventListener("click", function(){
					picked = undefined;

					if(this.id == 0){
						console.log(true);
						drawTable(prepareData(listShift[this.id]), true);
					}
					else
						drawTable(prepareData(listShift[this.id]));
				});
				
				var divA = document.createElement("text");

				if(element.shifting === null)
					divA.innerHTML = "Début";
				else if(element.shifting.charAt(1) === "B") 
					divA.innerHTML = element.user1;
				else
					divA.innerHTML = element.user2;

				liA.appendChild(divA);

				var divB = document.createElement("text");
				divB.classList.add("pull-right");

				if(element.shifting === null)
					divB.innerHTML = "";
				else {
					var piece = "";
					switch(element.shifting.charAt(0)) {
						case 'T':piece="Tour";break;
						case 'C':piece="Cavalier";break;
						case 'F':piece="Fou";break;
						case 'R':piece="Reine";break;
						case 'K':piece="Roi";break;
						case 'P':piece="Pion";break;
					}
					divB.innerHTML = piece + element.shifting.slice(2);
				}

				liA.appendChild(divB);
				ulUser.appendChild(liA);
			});
		},
		error: function(data, statut, erreur) {
			console.log(erreur);
		}
	});
}

function prepareData(data) {
	var res = [];
	for(var i=0; i<8; i++){
		res.push(new Array());

		for(var j=0; j<8; j++){
			res[i].push("");
		}
	}
	var dataS = data.board.split(",");
	dataS.forEach(function(element, index, array){
		var sp = element.split(":");
		if(sp.length > 1){
			res[sp[0].charAt(1)-1]
					 [sp[0].charAt(0).charCodeAt()-65] 
					 = sp[1].charAt(0) + sp[1].charAt(1);
		}
	});
	return res;
}

function addEvent() {
	var canvas = document.querySelector("#myCanvas1");

    canvas.addEventListener('mousedown', function (evt) {
    	var X = evt.clientX - (window.innerWidth-document.querySelector("#navcont").clientWidth+30)/2;
    	var Y = evt.clientY-71;

    	var boxSize = canvas.clientWidth/8;

		// position du newPicked pour quickGame[int][int]
    	var interX = Math.floor(X/boxSize);
    	var interY = 7-Math.floor(Y/boxSize);

		var newPicked = new piece(interX, interY, quickGame[interY][interX].charAt(0), quickGame[interY][interX].charAt(1));
    	if(toPlayed===user && (newPicked.couleur === col || picked !== undefined)) {
			var action = false;

			// Si une pièce a été sélectionné préalablement
			if(picked !== undefined) {
				//on déselectionne la piece
				if(picked.x === newPicked.x && picked.y === newPicked.y) {
					picked = undefined;
					newPicked = undefined;
				// Si on choisi une autre piece de la même couleur
				} else if(picked.couleur === newPicked.couleur) {
					picked = newPicked;
				} else {
					var list = listDeplValid(picked,quickGame);

					for(var i=0; i<list.length; i++) {
						var tempGame = copieGame(quickGame);

						tempGame[picked.y][picked.x] = "";
						tempGame[list[i].y][list[i].x] = picked.type+picked.couleur;

						if(inEchec(tempGame, picked.couleur)){
							list.splice(i, 1);
							i--;
						}
					};

					for(var i=0; i<list.length; i++) {
						// Si c'est un choix possible
						if(interX === list[i].x &&
							interY === list[i].y) {

							var copPicked = picked;
							var tempGame = copieGame(quickGame);

							tempGame[picked.y][picked.x] = "";
							tempGame[list[i].y][list[i].x] = picked.type+picked.couleur;
							
							col = (picked.couleur==="B")? "N" : "B";

							var pat = inPat(tempGame, col);
							var mat = inEchec(tempGame, col);

							var state =0;
							if(pat){
								if(mat) {
									state = 1;
									document.querySelector("#modBo").innerHTML = "Bravo ! Le joueur adversaire est Mat !";
									$('#modalInfo').modal({
										show: true
									});
								} else {
									state = 2;
									document.querySelector("#modBo").innerHTML = "Bravo ! Le joueur adversaire est Pat !";
									$('#modalInfo').modal({
										show: true
									});
								}
							}

							// Envoie l'action au serveur
							$.ajax({
								type: 'POST',
								url: "../" + links.makeMove,
								data: {
									id: id,
									state: state,
									shift: copPicked.type + copPicked.couleur +":"+
										   String.fromCharCode(copPicked.x+65)+(copPicked.y+1)+":"+
										   String.fromCharCode(interX+65)+(interY+1)
								},
								dataType: "html", 
								success: function(data, statut){
									//supprime la pièce où l'on va
									quickGame[interY][interX] = "";

									// Déplace la pièce sélectionnée
									quickGame[interY][interX] = copPicked.type+copPicked.couleur;
									quickGame[copPicked.y][copPicked.x] = "";

									drawTable(quickGame, true);
									getAllOfGame();
									col = (col==="B")?"N":"B";
									toPlayed = "";

								},
								error: function(data, statut, erreur) {
									console.log(erreur);
								}
							});
						}
					}
					picked = undefined;
				}
			} else if(newPicked.couleur !== ""){
				// on selectionne la piece
				picked = newPicked;
			} 

			drawTable(quickGame, true);
		}
    }, false);

    canvas.addEventListener('mouseup', function (evt) {
    }, false);      
}

function drawTable(gameTodraw, text) {
	var canvas = document.querySelector("#myCanvas1");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	drawBoard(function(revalue) {
		if(picked!==undefined) {
			drawSelectedPiece(picked);
			var list = listDeplValid(picked,gameTodraw);

			for(var i=0; i<list.length; i++) {
				var tempGame = copieGame(quickGame);

				tempGame[picked.y][picked.x] = "";
				tempGame[list[i].y][list[i].x] = picked.type+picked.couleur;

				if(inEchec(tempGame, picked.couleur)){
					list.splice(i, 1);
					i--;
				}
			};

			list.forEach(function(element,index,array) {
				drawPossMove(element);
			});
		}

		var pat = inPat(quickGame, col);
		var echec = inEchec(quickGame, col);

		drawPiece(gameTodraw, function() {
			if(text !== undefined)
				drawTextEchec(echec,pat);
		});
	});
}

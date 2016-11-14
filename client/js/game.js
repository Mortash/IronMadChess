// The root URL for the RESTful services
var ht = "http://";
var rootURL = "localhost:8080/";

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
			url: ht+rootURL + links.logout,
			username: "log",
			password: "out",
			dataType: "html", 
			success: function(data, statut){
				window.location = ht+rootURL;
			}
		});
	}, false);

	getLink();
};

$(window).resize(function() {
	initCanvas();
	drawBoard(function() {
		drawPiece(quickGame);
	});
});


function getLink(){
	$.ajax({
		type: 'GET',
		url: ht+rootURL + "link/game",
		dataType: "json", 
		success: function(data, statut){
			data.links.forEach(function(element, index, array){
				links[element.rel] = element.href;
			});
			initCanvas();
			drawBoard(function() {
				getGame();
				getAllOfGame();
				addEvent();
			});
		},
		error: function(data, statut, erreur) {
			console.log(data);	
		}
	});
}

function getGame(){
	$.ajax({
		type: 'GET',
		url: ht+rootURL + links.infoGame + id,
		dataType: "json", 
		success: function(data, statut){
			quickGame = prepareData(data[0]);
			drawPiece(quickGame);
			data = data[0];
			col = (data.shifting.charAt(1)==="B")? "N":"B";
			if(data.shifting.charAt(1) === "B") 
				toPlayed = data.user2;
			else
				toPlayed = data.user1;
		},
		error: function(data, statut, erreur) {
			console.log(erreur);
		}
	});
}

function getAllOfGame(){
	$.ajax({
		type: 'GET',
		url: ht+rootURL + links.getAllShift + id,
		dataType: "json", 
		success: function(data, statut){
			listShift = data;

			var ulUser = document.querySelector("#curplay");
			ulUser.innerHTML="";

			listShift.forEach(function(element,index, array) {
				var liA = document.createElement("a");
				liA.classList.add("list-group-item");
				liA.id = index;

				liA.addEventListener("click", function(){ {
					picked = undefined;
					drawTable(prepareData(listShift[this.id]));
				}});
				
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
						case 'Q':piece="Reine";break;
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
						// Si c'est un choix possible
						if(interX === list[i].x &&
							interY === list[i].y) {

							var copPicked = picked;

							// Envoie l'action au serveur
							$.ajax({
								type: 'GET',
								url: ht+rootURL + links.makeMove,
								data: {
									id: id,
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

									drawTable(quickGame);
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

			drawTable(quickGame);
		}
    }, false);

    canvas.addEventListener('mouseup', function (evt) {
    }, false);      
}

function drawTable(gameTodraw) {
	var canvas = document.querySelector("#myCanvas1");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	drawBoard(function(revalue) {
		if(picked!==undefined) {
			drawSelectedPiece(picked);
			var list = listDeplValid(picked,gameTodraw);
			/************ VERIFIER SI LE DEPLACEMENT NE METS PAS EN ECHECS SON ROI -> list = [] ************/
			list.forEach(function(element,index,array) {
				drawPossMove(element);
			});
		}

		drawPiece(gameTodraw);
	});
}

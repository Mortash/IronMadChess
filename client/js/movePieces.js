/*
 * Retourne la liste des déplacements qu'une pièce peut réaliser suivant l'état du jeu passé en paramètre
 */
function listDeplValid(picked, quickGame) {
	var pos = function() {var x=0; var y=0;};
	var list = [];

	var dir = 1;
	if(picked.couleur === 'N')
		dir = -1;

	x = picked.x;
	y = picked.y;

	switch(picked.type) {
		case "P":
			if((y+dir) >= 0 && (y+dir)<8) {
				// Déplacement tout droit
				if(quickGame[y+dir][x] == "") {
					var spot = new Array();
					spot.x = x;
					spot.y = y+dir;

					list.push(spot);

					// Seulement si premier déplacement
					if((y===6&&picked.couleur==='N' || y=== 1&&picked.couleur==='B') && quickGame[y+2*dir][x] == "") {
						var spot = new Array();
						spot.x = x;
						spot.y = y+2*dir;

						list.push(spot);
					}
				}

				// Manger sur coté gauche
				if((x-1)>=0 && quickGame[y+dir][x-1] !== "" && quickGame[y+dir][x-1].charAt(1) !== picked.couleur) {
					var spot = new Array();
					spot.x = x-1;
					spot.y = y+dir;

					list.push(spot);
				}

				// Manger sur coté droit
				if((x+1)<8 && quickGame[y+dir][x+1] !== "" && quickGame[y+dir][x+1].charAt(1) !== picked.couleur) {
					var spot = new Array();
					spot.x = x+1;
					spot.y = y+dir;

					list.push(spot);
				}
			}
			break;
		case "T":
			// Déplacement tout droit (vers 0)
			for(var i=y-1; i>=0; i--) {
				if(quickGame[i][x] == "") {
					var spot = new Array();
					spot.x = x;
					spot.y = i;

					list.push(spot);
				} else {
					if(quickGame[i][x].charAt(1) !== picked.couleur) {
						var spot = new Array();

						spot.x = x;
						spot.y = i;

						list.push(spot);
					}
					break;
				}
			}
			// Déplacement tout droit (vers 8)
			for(var i=y+1; i<8; i++) {
				if(quickGame[i][x] == "") {
					var spot = new Array();
					spot.x = x;
					spot.y = i;

					list.push(spot);
				} else {
					if(quickGame[i][x].charAt(1) !== picked.couleur) {
						var spot = new Array();

						spot.x = x;
						spot.y = i;

						list.push(spot);
					}
					break;
				}
			}
			// Déplacement coté (vers 0)
			for(var i=x-1; i>=0; i--) {
				if(quickGame[y][i] == "") {
					var spot = new Array();
					spot.x = i;
					spot.y = y;

					list.push(spot);
				} else {
					if(quickGame[y][i].charAt(1) !== picked.couleur) {
						var spot = new Array();

						spot.x = i;
						spot.y = y;

						list.push(spot);
					}
					break;
				}
			}
			// Déplacement coté (vers 8)
			for(var i=x+1; i<8; i++) {
				if(quickGame[y][i] == "") {
					var spot = new Array();
					spot.x = i;
					spot.y = y;

					list.push(spot);
				} else {
					if(quickGame[y][i].charAt(1) !== picked.couleur) {
						var spot = new Array();

						spot.x = i;
						spot.y = y;

						list.push(spot);
					}
					break;
				}
			}
			break;
		case "R":
			// Déplacement tout droit (vers 0)
			for(var i=y-1; i>=0; i--) {
				if(quickGame[i][x] == "") {
					var spot = new Array();
					spot.x = x;
					spot.y = i;

					list.push(spot);
				} else {
					if(quickGame[i][x].charAt(1) !== picked.couleur) {
						var spot = new Array();

						spot.x = x;
						spot.y = i;

						list.push(spot);
					}
					break;
				}
			}
			// Déplacement tout droit (vers 8)
			for(var i=y+1; i<8; i++) {
				if(quickGame[i][x] == "") {
					var spot = new Array();
					spot.x = x;
					spot.y = i;

					list.push(spot);
				} else {
					if(quickGame[i][x].charAt(1) !== picked.couleur) {
						var spot = new Array();

						spot.x = x;
						spot.y = i;

						list.push(spot);
					}
					break;
				}
			}
			// Déplacement coté (vers 0)
			for(var i=x-1; i>=0; i--) {
				if(quickGame[y][i] == "") {
					var spot = new Array();
					spot.x = i;
					spot.y = y;

					list.push(spot);
				} else {
					if(quickGame[y][i].charAt(1) !== picked.couleur) {
						var spot = new Array();

						spot.x = i;
						spot.y = y;

						list.push(spot);
					}
					break;
				}
			}
			// Déplacement coté (vers 8)
			for(var i=x+1; i<8; i++) {
				if(quickGame[y][i] == "") {
					var spot = new Array();
					spot.x = i;
					spot.y = y;

					list.push(spot);
				} else {
					if(quickGame[y][i].charAt(1) !== picked.couleur) {
						var spot = new Array();

						spot.x = i;
						spot.y = y;

						list.push(spot);
					}
					break;
				}
			}
			// NE
			for(var i=1; i<=8; i++) {
				if(y+i<8 && x+i<8) {
					if(quickGame[y+i][x+i] === "") {
						var spot = new Array();
						spot.x = x+i;
						spot.y = y+i;

						list.push(spot);
					} else {
						if(quickGame[y+i][x+i].charAt(1) !== picked.couleur) {
							var spot = new Array();

							spot.x = x+i;
							spot.y = y+i;

							list.push(spot);
						}
						break;
					}
				} else
					break;
			}
			// SE
			for(var i=1; i<=8; i++) {
				if(y-i>=0 && x+i<8) {
					if(quickGame[y-i][x+i] === "") {
						var spot = new Array();
						spot.x = x+i;
						spot.y = y-i;

						list.push(spot);
					} else {
						if(quickGame[y-i][x+i].charAt(1) !== picked.couleur) {
							var spot = new Array();

							spot.x = x+i;
							spot.y = y-i;

							list.push(spot);
						}
						break;
					}
				} else
					break;
			}
			// SW
			for(var i=1; i<=8; i++) {
				if(y-i>=0 && x-i>=0) {
					if(quickGame[y-i][x-i] == "") {
						var spot = new Array();
						spot.x = x-i;
						spot.y = y-i;

						list.push(spot);
					} else {
						if(quickGame[y-i][x-i].charAt(1) !== picked.couleur) {
							var spot = new Array();

							spot.x = x-i;
							spot.y = y-i;

							list.push(spot);
						}
						break;
					}
				} else
					break;
			}
			// NW
			for(var i=1; i<=8; i++) {
				if(y+i<8 && x-i>=0) {
					if(quickGame[y+i][x-i] == "") {
						var spot = new Array();
						spot.x = x-i;
						spot.y = y+i;

						list.push(spot);
					} else {
						if(quickGame[y+i][x-i].charAt(1) !== picked.couleur) {
							var spot = new Array();

							spot.x = x-i;
							spot.y = y+i;

							list.push(spot);
						}
						break;
					}
				} else
					break;
			}
			break;
		case "F":
			// NE
			for(var i=1; i<=8; i++) {
				if(y+i<8 && x+i<8) {
					if(quickGame[y+i][x+i] === "") {
						var spot = new Array();
						spot.x = x+i;
						spot.y = y+i;

						list.push(spot);
					} else {
						if(quickGame[y+i][x+i].charAt(1) !== picked.couleur) {
							var spot = new Array();

							spot.x = x+i;
							spot.y = y+i;

							list.push(spot);
						}
						break;
					}
				} else
					break;
			}
			// SE
			for(var i=1; i<=8; i++) {
				if(y-i>=0 && x+i<8) {
					if(quickGame[y-i][x+i] === "") {
						var spot = new Array();
						spot.x = x+i;
						spot.y = y-i;

						list.push(spot);
					} else {
						if(quickGame[y-i][x+i].charAt(1) !== picked.couleur) {
							var spot = new Array();

							spot.x = x+i;
							spot.y = y-i;

							list.push(spot);
						}
						break;
					}
				} else
					break;
			}
			// SW
			for(var i=1; i<=8; i++) {
				if(y-i>=0 && x-i>=0) {
					if(quickGame[y-i][x-i] == "") {
						var spot = new Array();
						spot.x = x-i;
						spot.y = y-i;

						list.push(spot);
					} else {
						if(quickGame[y-i][x-i].charAt(1) !== picked.couleur) {
							var spot = new Array();

							spot.x = x-i;
							spot.y = y-i;

							list.push(spot);
						}
						break;
					}
				} else
					break;
			}
			// NW
			for(var i=1; i<=8; i++) {
				if(y+i<8 && x-i>=0) {
					if(quickGame[y+i][x-i] == "") {
						var spot = new Array();
						spot.x = x-i;
						spot.y = y+i;

						list.push(spot);
					} else {
						if(quickGame[y+i][x-i].charAt(1) !== picked.couleur) {
							var spot = new Array();

							spot.x = x-i;
							spot.y = y+i;

							list.push(spot);
						}
						break;
					}
				} else
					break;
			}
			break;
		case "K":
			// N
			if(y+1<8 && (quickGame[y+1][x] === "" || quickGame[y+1][x].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x;
				spot.y = y+1;

				list.push(spot);
			}
			// NE
			if(y+1<8 && x+1<8 && (quickGame[y+1][x+1] === "" || quickGame[y+1][x+1].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x+1;
				spot.y = y+1;

				list.push(spot);
			}
			// E
			if(x+1<8 && (quickGame[y][x+1] === "" || quickGame[y][x+1].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x+1;
				spot.y = y;

				list.push(spot);
			}
			//SE
			if(y-1>=0 && x+1<8 && (quickGame[y-1][x+1] === "" || quickGame[y-1][x+1].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x+1;
				spot.y = y-1;

				list.push(spot);
			}
			// S
			if(y-1>=0 && (quickGame[y-1][x] === "" || quickGame[y-1][x].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x;
				spot.y = y-1;

				list.push(spot);
			}
			// SW
			if(y-1>=0 && x-1>=0 && (quickGame[y-1][x-1] === "" || quickGame[y-1][x-1].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x-1;
				spot.y = y-1;

				list.push(spot);
			}
			// W
			if(x-1>=0 && (quickGame[y][x-1] === "" || quickGame[y][x-1].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x-1;
				spot.y = y;

				list.push(spot);
			}
			// NW
			if(y+1<8 && x-1>=0 && (quickGame[y+1][x-1] === "" || quickGame[y+1][x-1].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x-1;
				spot.y = y+1;

				list.push(spot);
			}
			break;
		case "C":
			// NNE
			if(y+2<8 && x+1<8 && (quickGame[y+2][x+1] === "" || quickGame[y+2][x+1].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x+1;
				spot.y = y+2;

				list.push(spot);
			}
			// ENE
			if(y+1<8 && x+2<8 && (quickGame[y+1][x+2] === "" || quickGame[y+1][x+2].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x+2;
				spot.y = y+1;

				list.push(spot);
			}
			// ESE
			if(y-1>=0 && x+2<8 && (quickGame[y-1][x+2] === "" || quickGame[y-1][x+2].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x+2;
				spot.y = y-1;

				list.push(spot);
			}
			// SSE
			if(y-2>=0 && x+1<8 && (quickGame[y-2][x+1] === "" || quickGame[y-2][x+1].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x+1;
				spot.y = y-2;

				list.push(spot);
			}
			// SSW
			if(y-2>=0 && x-1>=0 && (quickGame[y-2][x-1] === "" || quickGame[y-2][x-1].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x-1;
				spot.y = y-2;

				list.push(spot);
			}
			// WSW
			if(y-1>=0 && x-2>=0 && (quickGame[y-1][x-2] === "" || quickGame[y-1][x-2].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x-2;
				spot.y = y-1;

				list.push(spot);
			}
			// WNW
			if(y+1<8 && x-2>=0 && (quickGame[y+1][x-2] === "" || quickGame[y+1][x-2].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x-2;
				spot.y = y+1;

				list.push(spot);
			}
			// NNW
			if(y+2<8 && x-1>=0 && (quickGame[y+2][x-1] === "" || quickGame[y+2][x-1].charAt(1) !== picked.couleur)) {
				var spot = new Array();
				spot.x = x-1;
				spot.y = y+2;

				list.push(spot);
			}
			break;
	} 

	return list;
}

/*
 * Retourne un boolean pour savoir su le roi de couleur [col] est en échec
 */
function inEchec(table, col) {
	// Récupération de la position du roi du joueur
	var x, y;
	var b = true;
	for(y=0; y<8 && b; y++) {
		for(x=0; x<8 && b; x++) {
			if(table[y][x] === "K"+col){
				b=false;
			}
		}
	}
	x--;y--;
	col = (col==="B")? "N" : "B";

	/******* Tour et Reine *******/
	var check = ['T'+col,'R'+col];
	// Vérification vers S
	for(var i=y-1; i>=0; i--) {
		if(check.includes(table[i][x]))
			return true;
	}
	// Vérification vers N
	for(var i=y+1; i<8; i++) {
		if(check.includes(table[i][x]))
			return true;
	}
	// Vérification vers W
	for(var i=x-1; i>=0; i--) {
		if(check.includes(table[y][i]))
			return true;
	}
	// Vérification vers E
	for(var i=x+1; i<8; i++) {
		if(check.includes(table[y][i]))
			return true;
	}

	/******* Fou et Reine *******/
	var check = ['F'+col,'R'+col];
	// Vérification vers NW
	for(var i=y+1, j=x-1; i<8 && j>=0; i++, j--) {
		if(check.includes(table[i][j]))
			return true;
	}
	// Vérification vers NE
	for(var i=y+1, j=x+1; i<8 && j<8; i++, j++) {
		if(check.includes(table[i][j]))
			return true;
	}
	// Vérification vers SE
	for(var i=y-1, j=x+1; i>=0 && j<8; i--, j++) {
		if(check.includes(table[i][j]))
			return true;
	}
	// Vérification vers SW
	for(var i=y-1, j=x-1; i>=0 && j>=0; i--, j--) {
		if(check.includes(table[i][j]))
			return true;
	}

	/******* Pion *******/
	if(    (y-1>=0 && x-1>=0 && table[y-1][x-1] === "P"+col)
		|| (y-1>=0 && x+1<8 && table[y-1][x+1] === "P"+col))
		return true;

	/******* Cavalier *******/
	if(    (y-2>=0 && x-1>=0 && table[y-2][x-1] === "C"+col)
		|| (y-1>=0 && x-2>=0 && table[y-1][x-2] === "C"+col)
		|| (y+1<8 && x-2>=0 && table[y+1][x-2] === "C"+col)
		|| (y+2<8 && x-1>=0 && table[y+2][x-1] === "C"+col)
		|| (y+2<8 && x+1<8 && table[y+2][x+1] === "C"+col)
		|| (y+1<8 && x+2<8 && table[y+1][x+2] === "C"+col)
		|| (y-1>=0 && x+2<8 && table[y-1][x+2] === "C"+col)
		|| (y-2>=0 && x+1<8 && table[y-2][x+1]) === "C"+col)
		return true;


	return false;
}

/*
 * Retourne un boolean si un joueur n'a plus aucun mouvement possible
 */
function inPat(table, col) {
	for(y=0; y<8; y++) {
		for(x=0; x<8; x++) {
			if(table[y][x].charAt(1) === col){
				var picked = new piece(x, y, quickGame[y][x].charAt(0), quickGame[y][x].charAt(1));
				var list = listDeplValid(picked, table);

				for(var i=0; i<list.length; i++) {
					var tempGame = copieGame(table);

					tempGame[picked.y][picked.x] = "";
					tempGame[list[i].y][list[i].x] = picked.type+picked.couleur;

					if(inEchec(tempGame, picked.couleur)){
						list.splice(i, 1);
						i--;
					}
				};

				if(list.length>0)
					return false;
			}
		}
	}

	return true;
}

/*
 * réalise une copie d'un jeu (pour pouvoir le modifier sans modifier le jeu originel)
 */
function copieGame(table) {
	var cop = [];
	for(var i=0; i<8; i++){
		cop.push(new Array());

		for(var j=0; j<8; j++){
			cop[i].push("");
		}
	}
	table.forEach(function(element, index, array) {
		element.forEach(function(data, i, a){
			cop[index][i] = data;
		});
	});
	return cop;
}
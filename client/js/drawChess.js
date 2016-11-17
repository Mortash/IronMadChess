function initCanvas() {
	var canvas = document.querySelector("#myCanvas1");
	var ctx = canvas.getContext("2d");

	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	var scale = canvas.width/1688;

	ctx.scale(scale,scale);
}

function drawBoard(callback) {
	var canvas = document.querySelector("#myCanvas1");
	var ctx = canvas.getContext("2d");

	var b = false;

	var taille = canvas.clientWidth/8;

    ctx.save();

    // Echiquier
	for(var i=0; i < 8; i++) {
		for(var j=0; j<8; j++) {
			if(b) {
				ctx.fillStyle = "black";
				b=!b;
			}
			else {
    			ctx.fillStyle = "white";
    			b=!b;
			}

			taille=211;
    		ctx.beginPath();
			ctx.fillRect(j*taille,i*taille,taille, taille);	
		}
		b=!b;
	}

    ctx.restore();

    callback("ok");
}

function drawPiece(game, callback) {
	var canvas = document.querySelector("#myCanvas1");
	var ctx = canvas.getContext("2d");
	
	for(var i = 0; i<game.length; i++) {
		for(var j = 0; j<game[i].length; j++) {
			var element = new piece(j,i,game[i][j].charAt(0),game[i][j].charAt(1));

			switch(game[i][j].charAt(0)) {
				case "P":
					drawPion(element,ctx);
					break;
				case "T":
					drawTour(element,ctx);
					break;
				case "R":
					drawQueen(element,ctx);
					break;
				case "F":
					drawFou(element,ctx);
					break;
				case "K":
					drawKing(element,ctx);
					break;
				case "C":
					drawCavalier(element,ctx);
					break;
			} 
		}
	}

    callback();
}

function drawSelectedPiece(picked) {
	var canvas = document.querySelector("#myCanvas1");
	var ctx = canvas.getContext("2d");
	
	var pos = getPos(picked);

	ctx.save();
	ctx.translate(pos.x, pos.y);

	ctx.fillStyle = "red";

	ctx.beginPath();
	ctx.arc(105.5,105.5,80,0,2*Math.PI);

	ctx.fill();

	ctx.restore();
}

function drawPossMove(picked) {
	var canvas = document.querySelector("#myCanvas1");
	var ctx = canvas.getContext("2d");
	
	picked.y;

	var pos = getPos(picked);

	ctx.save();
	ctx.translate(pos.x, pos.y);

	ctx.fillStyle = "blue";

	ctx.beginPath();
	ctx.arc(105.5,105.5,80,0,2*Math.PI);

	ctx.fill();

	ctx.restore();
}

function drawTextEchec(echec, pat) {
	var canvas = document.querySelector("#myCanvas1");
	var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.beginPath();
	ctx.font = "200pt Verdana";
	ctx.fillStyle = "rgba(255, 0, 0, 0.5)";

	if(echec && pat) {
		ctx.fillText('Echec',445,625);
		ctx.fillText('&',765,930);
		ctx.fillText('Mat',585,1255);
	} else if(pat) {
		ctx.fillText('Echec',445,625);
		ctx.fillText('&',765,930);
		ctx.fillText('Pat',585,1255);
	} else if(echec) {
		ctx.fillText('Echec !',700,930);
	} 

	ctx.restore();
}
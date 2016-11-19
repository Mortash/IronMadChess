/*
 * Classe d'une pièce
 */
function piece(px,py,pt,pc) {
    this.x = px;
    this.y = py;
    this.type = pt;
    this.couleur = pc;
};

/*
 * Retourne la position x,y d'une pièce
 */
function getPos(piece) {
	var x = (typeof(piece.x)=== "string")?piece.x.charCodeAt()-65:piece.x;

	return {
		x : 211 * x,
	    y : 211 * (7-piece.y)
	};
}

/*
 * Récupère la position x,y de la souris
 */
function getMousePos(evt) {
	// necessary to take into account CSS boudaries
	var rect = canvas.canva.getBoundingClientRect();

	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

/*
 * Permets de définir la couleur de la pièce à dessiner
 */
function colorPiece(color, ctx) {
    var grd=ctx.createLinearGradient(0,0,40,0);
    
	if(color=="B") {
        grd.addColorStop(0,"#B2B2B2");
        grd.addColorStop(1,"white");

		ctx.shadowColor="white";
	    ctx.strokeStyle = "black";
	    ctx.fillStyle = grd;
	} else {
        grd.addColorStop(0,"black");
        grd.addColorStop(1,"#4F4F4F");

		ctx.shadowColor="black";
	    ctx.strokeStyle = "white";
	    ctx.fillStyle = grd;
	}
}

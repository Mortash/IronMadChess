function drawTour(piece, ctx) {
    ctx.save();

	ctx.lineWidth=3;
	ctx.shadowBlur=5;
	
    colorPiece(piece.couleur, ctx);

	var pos = getPos(piece);

    ctx.translate(pos.x,pos.y);
    // Pieds 1
    ctx.save();
    ctx.translate(70.5,189);

	ctx.beginPath();
    ctx.moveTo(0,10);
	ctx.arcTo(0,0,10,0,10);
    ctx.lineTo(60,0);
	ctx.arcTo(70,0,70,10,10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Pieds 3
    ctx.save();
    ctx.translate(75.5,137);

	ctx.beginPath();
    ctx.moveTo(5,10);
	ctx.arc(5,5,5, 0.5*Math.PI, 1.5*Math.PI);
    ctx.lineTo(55,0);
	ctx.arc(55,5,5,1.5*Math.PI, 0.5*Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Pieds 2
    ctx.save();
    ctx.translate(70.5,153);

	ctx.beginPath();
    ctx.moveTo(5,30);
	ctx.arcTo(0,15,10,0,37);
    ctx.lineTo(60,0);
	ctx.arcTo(70,15,65,30,32);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Sous tête
    ctx.save();
    ctx.translate(77,75);

	ctx.beginPath();
    ctx.moveTo(5,10);
	ctx.arc(5,5,5, 0.5*Math.PI, 1.5*Math.PI);
    ctx.lineTo(52,0);
	ctx.arc(52,5,5,1.5*Math.PI, 0.5*Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // corps
    ctx.save();
    ctx.translate(80,91);

	ctx.beginPath();
    ctx.moveTo(0,40);
    ctx.lineTo(50,40);
    ctx.lineTo(45,0);
    ctx.lineTo(5,0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // tete
    ctx.save();
    ctx.translate(70,44);

    ctx.beginPath();
    ctx.moveTo(10,25);
    ctx.arcTo(-3,15,0,0,25);
    ctx.lineTo(13.8,0);
    ctx.lineTo(13.8,12);
    ctx.lineTo(27.6,12);
    ctx.lineTo(27.6,0);
    ctx.lineTo(41.4,0);
    ctx.lineTo(41.4,12);
    ctx.lineTo(55.2,12);
    ctx.lineTo(55.2,0);
    ctx.lineTo(69,0);
    ctx.arcTo(68,15,59,25,21);
    ctx.lineTo(59,25);

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.restore();
}
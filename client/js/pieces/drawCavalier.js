function drawCavalier(piece, ctx) {
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

    // tete
    ctx.save();
    ctx.translate(70.5,44);

    ctx.beginPath();
    ctx.moveTo(10,87);
    ctx.quadraticCurveTo(0,58,2,45);
    ctx.bezierCurveTo(0,15,17.5,0,45,0);
    ctx.quadraticCurveTo(52,-15,55,5);
    ctx.quadraticCurveTo(65,7.5,70,20);
    ctx.quadraticCurveTo(72,30,80,35);
    ctx.quadraticCurveTo(83,45,70,50);
    ctx.quadraticCurveTo(63,40,55,45);
    ctx.quadraticCurveTo(45,45,45,40);
    ctx.arc(43,40,2,2*Math.PI,Math.PI,true);
    ctx.quadraticCurveTo(41,60,62,67);
    ctx.lineTo(60,87);

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.restore();
}
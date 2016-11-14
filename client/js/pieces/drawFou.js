function drawFou(piece, ctx) {
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

    // corps
    ctx.save();
    ctx.translate(80,106);

    ctx.beginPath();
    ctx.moveTo(0,25);
    ctx.lineTo(50,25);
    ctx.quadraticCurveTo(37.5,25,37.5,0);
    ctx.lineTo(12.5,0);
    ctx.quadraticCurveTo(12.5,25,0,25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // coup
    ctx.save();
    ctx.translate(83,77);

    ctx.beginPath();
    ctx.moveTo(10,22);
    ctx.arc(10,17,5,0.5*Math.PI,1.5*Math.PI);
    ctx.lineTo(10,0);
    ctx.lineTo(34,0);
    ctx.arc(34,17,5,1.5*Math.PI,0.5*Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // tete
    ctx.save();
    ctx.translate(83,20);

    ctx.beginPath();
    ctx.moveTo(10,51);
    ctx.arc(10,46,5,0.5*Math.PI,1.5*Math.PI);
    ctx.bezierCurveTo(3,41,3,26,10,18);
    ctx.quadraticCurveTo(25,35,14,12);
    ctx.lineTo(19,2);
    ctx.arc(22,-3,5,0.6*Math.PI,0.4*Math.PI);
    ctx.lineTo(30,12);
    ctx.bezierCurveTo(30,12,45,35,34,41);
    ctx.arc(34,46,5,1.5*Math.PI,0.5*Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    
    ctx.restore();
}
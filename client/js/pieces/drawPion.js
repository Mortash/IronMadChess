
function drawPion(piece, ctx) {
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

    // Tete
    ctx.save();
    ctx.translate(83,73);

	ctx.beginPath();
    ctx.moveTo(0,58);
    ctx.lineTo(15,29);
    ctx.lineTo(5,29);
	ctx.arc(5,22,7,0.5*Math.PI,1.5*Math.PI);
    ctx.lineTo(22.5,15);
	ctx.bezierCurveTo(13.75,15,5,6.25,5,-2.5);
	ctx.bezierCurveTo(5,-11.25,13.75,-20,22.5,-20);
	ctx.bezierCurveTo(31.25,-20,40,-11.25,40,-2.5);
	ctx.bezierCurveTo(40,6.25,31.25,15,22.5,15);
    ctx.lineTo(40,15);
	ctx.arc(40,22,7,1.5*Math.PI,0.5*Math.PI);
    ctx.lineTo(30,29);
    ctx.lineTo(45,58);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.restore();
}
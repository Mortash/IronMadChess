function drawKing(piece, ctx) {
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
    ctx.translate(80,101);

    ctx.beginPath();
    ctx.moveTo(0,30);
    ctx.lineTo(50,30);
    ctx.quadraticCurveTo(37.5,30,37.5,0);
    ctx.lineTo(12.5,0);
    ctx.quadraticCurveTo(12.5,30,0,30);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // tete
    ctx.save();
    ctx.translate(83,43);

    ctx.beginPath();
    ctx.moveTo(10,53);
    ctx.arc(10,48,5,0.5*Math.PI,1.5*Math.PI);
    ctx.lineTo(10,28);
    ctx.arc(-10,28,20,0,Math.sin(-1/3)*Math.PI, true);
    ctx.arc(8,4,10,0.8*Math.PI,1.5*Math.PI);
    ctx.arc(15,-10,7,0.75*Math.PI,0.25*Math.PI,true);
    ctx.arc(28,-10,7,0.75*Math.PI,0.25*Math.PI,true);
    ctx.arc(36,4,10,1.5*Math.PI,2.2*Math.PI);
    ctx.arc(54,28,20,1.25*Math.PI,Math.PI,true);
    ctx.lineTo(34,28);
    ctx.arc(34,48,5,1.5*Math.PI,0.5*Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // courronne
    ctx.save();
    ctx.translate(105.5,20);
    ctx.beginPath();
    ctx.arc(0,0,10,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    

    ctx.restore();
}
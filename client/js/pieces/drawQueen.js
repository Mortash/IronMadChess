function drawQueen(piece, ctx) {
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
    ctx.quadraticCurveTo(-12,5,10,5);
    ctx.lineTo(10,0);
    ctx.lineTo(34,0);
    ctx.lineTo(34,5);
    ctx.quadraticCurveTo(56,5,34,28);
    ctx.lineTo(34,43);
    ctx.arc(34,48,5,1.5*Math.PI,0.5*Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Couronne
    ctx.save();
    ctx.translate(105,26);

    ctx.beginPath();
    ctx.arc(0,0,12,(1/3)*Math.PI,(2/3)*Math.PI)
    ctx.lineTo(0,0);
    ctx.lineTo(Math.cos((2.5/3)*Math.PI), Math.sin((2.5/3)*Math.PI));
    ctx.arc(0,0,12,(2.5/3)*Math.PI,(3.5/3)*Math.PI);
    ctx.lineTo(0,0);
    ctx.lineTo(Math.cos((4/3)*Math.PI), Math.sin((4/3)*Math.PI));
    ctx.arc(0,0,12,(4/3)*Math.PI,(5/3)*Math.PI);
    ctx.lineTo(0,0);
    ctx.lineTo(Math.cos((5.5/3)*Math.PI), Math.sin((5.5/3)*Math.PI));
    ctx.arc(0,0,12,(5.5/3)*Math.PI,(0.5/3)*Math.PI);
    ctx.lineTo(0,0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.restore();
}
function draw() {

    // tous les évenements s'activent dans l'ordre ou ils sont écrit dans le script
    let canvas = document.getElementById('tutoriel');
    let ctx = canvas.getContext('2d');

    // dessine un carré rouge de 50x50px en position x = 10 et y = 10
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);
    
    // dessine un carré de vide de 20x20px en position x = 35 et y = 35
    ctx.clearRect(35, 35, 20, 20)

    // dessine un carré bleu de 50x50px en position x = 30 et y = 30
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
    
    // dessine les contours verts d'un carré de 50x50px en position x = 30 et y = 30
    ctx.strokeStyle = 'green';
    ctx.strokeRect(50, 50, 50, 50);

    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(100, 75);
    ctx.lineTo(125, 100);
    ctx.lineTo(125, 50);
    ctx.closePath();
    ctx.stroke();



    ctx.beginPath();
    ctx.moveTo(250, 200);
    ctx.arc(200, 200, 50, 0, Math.PI * 2, true);
    ctx.stroke();
}




window.onload = draw();
// Este archivo contendrá las funciones asociadas a los tubos

class Pipe {
  constructor() {

  	//Espacio entre tubos donde pasara el pajaro

  	let spacing = 125;

  	//Centro del espacio

  	let centery = random(spacing, height - spacing);

  	//Parte superior e inferior del tubo

  	this.top = centery - spacing / 2;
    this.bottom = height - (centery + spacing / 2);

    //Empezar en el borde

     this.x = width;

     //Ancho del tubo

      this.w = 80;

      //Rapidez 

      this.speed = 6;
  }

  //Eventos

  //El pajaro choca con un tubo

	hits(bird) {
	    if ((bird.y - bird.r) < this.top || (bird.y + bird.r) > (height - this.bottom)) {
	      if (bird.x > this.x && bird.x < this.x + this.w) {
	        return true;
	      }
	    }
	    return false;
	  }

	//Dibujar tubo

	show() {
    stroke(255);
    fill(200);
    rect(this.x, 0, this.w, this.top);
    rect(this.x, height - this.bottom, this.w, this.bottom);
  }

  //Actualizar tubo

  update() {
    this.x -= this.speed;
  }

  //Si el tubo se sale de pantalla

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}



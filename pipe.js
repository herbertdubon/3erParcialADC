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

  

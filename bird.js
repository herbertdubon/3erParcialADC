// Creación de función de Mutación a ser pasada al  bird.brain
function mutate(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Bird {
  constructor(brain) {
    this.x = 64;
    this.y = height / 2;
    this.r = 12;

    this.gravity = 0.8;
    this.lift = -12;
    this.velocity = 0;

    //La red neural es el cerebro del pajaro
    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
    // El score es cuantos frames se mantiene vivo.
    this.score = 0;
    this.fitness = 0;
  }

  //Crea una copia del pajaro
  copy() {
    return new Bird(this.brain);
  }

  //Muestra el pajaro
  show() {
    fill(255, 100);
    stroke(255)
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }

  //Esta funcion es la que decide si debe saltar o no.
  think(pipes) {
    //Primero buscar el tubo mas cercano.
    let closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = pipes[i].x - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = pipes[i];
      }
    }
    if (closest != null) {

      let inputs = [];
      // Posicion x del tubo mas cercano.
      inputs[0] = map(closest.x, this.x, width, 0, 1);
      // Parte de arriba del tubo mas cercano.
      inputs[1] = map(closest.top, 0, height, 0, 1);
      // Parte de abajo del tubo mas cercano.
      inputs[2] = map(closest.bottom, 0, height, 0, 1);
      // Posición y del pajaro
      inputs[3] = map(this.y, 0, height, 0, 1);
      // Velocidad y del pajaro
      inputs[4] = map(this.velocity, -5, 5, 0, 1);


      let action = this.brain.predict(inputs);
      // Decide si salta o no.
      if (action[1] > action[0]) {
        this.up();
      }
    }
  }

  // Salta.
  up() {
    this.velocity += this.lift;
  }

  bottomTop() {
    // El pajaro muere cuando toca el fondo
    return (this.y > height || this.y < 0);
  }

  update() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    // Cada frame que este vivo aumenta su score.
    this.score++;
  }
}
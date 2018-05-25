class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.6;
    this.lift = -10;
    this.velocity = 0;

    this.brain = new NeuralNetwork (4,4,1);


  }

  show() {
    fill (255);
    ellipse (this.x,this.y,32,32);
  }

  up() {
    this.velocity = this.lift;
  }

think(pipes){
  let closest = pipes[0];

let inputs [];
inputs[0]=this.y/height;
inputs[1]=pipes[0].top/height;
inputs[2]=pipes[0].bottom/height;
inputs[3]=pipes[0].x/with;
let output = this.brain.predict(inputs);
  if (output>0.5){
    this.up();
  }
}

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= height - this.height / 2) {
      this.y = height - this.height / 2;
      this.velocity = 0;
    }

    if (this.y <= this.height / 2) {
      this.y = this.height / 2;
      this.velocity = 0;
    }
  }
}

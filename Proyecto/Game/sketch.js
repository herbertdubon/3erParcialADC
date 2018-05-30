// Tamaño de la población
let totalPopulation = 500;
// Todas las aves activas que no han chocado con los tubos.
let activeBirds = [];
// Todas las aves para cualquier poblacion.
let allBirds = [];
// Tubos
let pipes = [];
// Un contador de frames que determina cuando agregar un tubo.
let counter = 0;

// Elementos de interfaz.
let speedSlider;
let speedSpan;
let highScoreSpan;
let allTimeHighScoreSpan;

// Score mas alto.
let highScore = 0;

// Mostrar el mejor ave.
let runBest = false;
let runBestButton;

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('canvascontainer');

  // Acceso a los elementos de interfaz.
  speedSlider = select('#speedSlider');
  speedSpan = select('#speed');
  highScoreSpan = select('#hs');
  allTimeHighScoreSpan = select('#ahs');
  runBestButton = select('#best');
  runBestButton.mousePressed(toggleState);

  // Crear una poblacion.
  for (let i = 0; i < totalPopulation; i++) {
    let bird = new Bird();
    activeBirds[i] = bird;
    allBirds[i] = bird;
  }
}

// Cambiar el estado de la simulación.
function toggleState() {
  runBest = !runBest;
  // Muestra la mejor ave.
  if (runBest) {
    resetGame();
    runBestButton.html('Continuar entrenamiento');
    // Continuar entrenando.
  } else {
    nextGeneration();
    runBestButton.html('Mejor Pajaro');
  }
}



function draw() {
  background(0);

  // Aumentar velocidad de ciclos por frame.
  let cycles = speedSlider.value();
  speedSpan.html(cycles);


 
  for (let n = 0; n < cycles; n++) {
   
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    
    if (runBest) {
      bestBird.think(pipes);
      bestBird.update();
      for (let j = 0; j < pipes.length; j++) {
        // Empezar de nuevo si el pajaro toca un tubo.
        if (pipes[j].hits(bestBird)) {
          resetGame();
          break;
        }
      }

      if (bestBird.bottomTop()) {
        resetGame();
      }
     
    } else {
      for (let i = activeBirds.length - 1; i >= 0; i--) {
        let bird = activeBirds[i];
        
        bird.think(pipes);
        bird.update();

        
        for (let j = 0; j < pipes.length; j++) {
          
          if (pipes[j].hits(activeBirds[i])) {
            // Eliminar pajaro.
            activeBirds.splice(i, 1);
            break;
          }
        }

        if (bird.bottomTop()) {
          activeBirds.splice(i, 1);
        }

      }
    }

    // Agregar tubo de vez en cuando.
    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  // Score mas alto de la población actual.
  let tempHighScore = 0;
  // 
  if (!runBest) {
    // Cual es el mejor pajaro?
    let tempBestBird = null;
    for (let i = 0; i < activeBirds.length; i++) {
      let s = activeBirds[i].score;
      if (s > tempHighScore) {
        tempHighScore = s;
        tempBestBird = activeBirds[i];
      }
    }

    
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
      bestBird = tempBestBird;
    }
  } else {
    
    tempHighScore = bestBird.score;
    if (tempHighScore > highScore) {
      highScore = tempHighScore;
    }
  }

  
  highScoreSpan.html(tempHighScore);
  allTimeHighScoreSpan.html(highScore);

  
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].show();
  }

  if (runBest) {
    bestBird.show();
  } else {
    for (let i = 0; i < activeBirds.length; i++) {
      activeBirds[i].show();
    }
    // Si se caban las aves, crear nueva generación.
    if (activeBirds.length == 0) {
      nextGeneration();
    }
  }
}

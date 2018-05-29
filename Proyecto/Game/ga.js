//Esta archivo contiene las funciones para crear nuevas generaciones de pajaros.

//Resetea el juego
function resetGame() 
{
    counter = 0;
    // Resetting best bird score to 0
    if (bestBird) 
    {
        bestBird.score = 0;
    }
    pipes = [];
}

//Crea la siguiente generación
function nextGeneration() 
{
    resetGame();

    normalizeFitness(allBirds);
    // Aca generamos un nuevo set de pajaros
    activeBirds = generate(allBirds);
    // copiamos esos pajaros a un nuevo vector
    allBirds = activeBirds.slice();
}

// Generamos una nueva población de pajaros
function generate(oldBirds) 
{
    let newBirds = [];
    for (let i = 0; i < oldBirds.length; i++) 
    {
        // Seleccionamos un pajaro en base a su fitness
        let bird = poolSelection(oldBirds);
        newBirds[i] = bird;
    }
    return newBirds;
}


function normalizeFitness(birds) 
{
    for (let i = 0; i < birds.length; i++) 
    {
        birds[i].score = pow(birds[i].score, 2);
    }
    // Sumamos todos los resultados
    let sum = 0;
    for (let i = 0; i < birds.length; i++) 
    {
        sum += birds[i].score;
    }
    // Dividimos entre la suma
    for (let i = 0; i < birds.length; i++) 
    {
        birds[i].fitness = birds[i].score / sum;
    }
}

//Seleccionamos un pajaro de un arreglo

function poolSelection (birds){

    //Empezando en 0 
    let index = 0;

    //Seleccionar un numero random entre 0 y 1
    let r = random(1);

    //Loop para restar probabilidades hasta obtener menos de 0

    while (r > 0) {
    r -= birds[index].fitness;
    index += 1;
  }

  //Regresar 1

  index -= 1;

  //Asegurar que sea una copia del index

  return birds[index].copy();

} 

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (arg: number[]): Result => {
  const diasTotal = arg.length;
  let diasEntrenamiento = 0;
  const objetivo = 2;
  let tiempoPromedio = 0;
  let objetivoAlcanzado = false;
  let calificacion = 0;
  let calificacionDescripcion = "";

  for (let i = 0; i < arg.length; i++) {
    if (arg[i] > 0) {
      diasEntrenamiento = diasEntrenamiento + 1;
    }
  }

  tiempoPromedio = arg.reduce((a, b) => a + b) / arg.length;

  if (objetivo <= tiempoPromedio) {
    objetivoAlcanzado = true;
  } else {
    objetivoAlcanzado = false;
  }

  if (tiempoPromedio < 1) {
    calificacion = 1;
  } else if (tiempoPromedio > 1 && tiempoPromedio < 2) {
    calificacion = 2;
  } else {
    calificacion = 3;
  }

  if ((calificacion = 1)) {
    calificacionDescripcion = "you should train more times a week";
  } else if ((calificacion = 2)) {
    calificacionDescripcion = "not too bad but could be better";
  } else {
    calificacionDescripcion = "very good keep it up";
  }

  return {
    periodLength: diasTotal,
    trainingDays: diasEntrenamiento,
    success: objetivoAlcanzado,
    rating: calificacion,
    ratingDescription: calificacionDescripcion,
    target: objetivo,
    average: tiempoPromedio,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));

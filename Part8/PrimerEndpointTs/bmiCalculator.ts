interface Result {
  weight: number;
  height: number;
  bmi: string;
}

const calculateBmi = (a: number, b: number): Result => {
  const metros = a / 100;
  const imc = b / (metros * metros);
  let text = "";

  if (imc < 18.5) {
    text = "Underweight";
  } else if (imc >= 18.5 && imc < 24.9) {
    text = "Normal (healthy weight)";
  } else if (imc >= 25 && imc < 29.9) {
    text = "Overweight";
  } else {
    text = "Obese";
  }

  return {
    weight: b,
    height: a,
    bmi: text,
  };
};

export default calculateBmi;

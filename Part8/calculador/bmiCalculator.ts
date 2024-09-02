const calculateBmi = (a: number, b: number): string => {
  const metros = a / 100;
  const imc = b / metros;

  if (imc > 18.5 || imc < 24.9) {
    return "Normal (healthy weight)";
  } else {
    return "Vea al doc";
  }
};

console.log(calculateBmi(180, 74));

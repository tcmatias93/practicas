import express from "express";
const app = express();
const PORT = 3001;
import calculateBmi from "./bmiCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const numeroA = Number(req.query.height);
  const numeroB = Number(req.query.weight);

  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(numeroA) ||
    isNaN(numeroB)
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateBmi(numeroA, numeroB);
  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

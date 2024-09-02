import express from "express";
import DiagnosisRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";
import cors from "cors";
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use("/api/Diagnosis", DiagnosisRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

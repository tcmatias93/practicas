import express from "express";
import DiagnosisService from "../service/diagnosesService";
import { toNewDiagnosis } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(DiagnosisService.getDiagnosis());
});

router.post("/", (req, res) => {
  try {
    const newDiagnose = toNewDiagnosis(req.body);
    const addedDiagnose = DiagnosisService.addDiagnosis(newDiagnose);
    res.json(addedDiagnose);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});
export default router;

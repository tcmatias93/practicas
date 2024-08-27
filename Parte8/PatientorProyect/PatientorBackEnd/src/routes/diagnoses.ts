import express from "express";
import diagnosesService from "../service/diagnosesService";
import { toNewDiagnoses } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

router.post("/", (req, res) => {
  try {
    const newDiagnose = toNewDiagnoses(req.body);
    const addedDiagnose = diagnosesService.addDiagnoses(newDiagnose);
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

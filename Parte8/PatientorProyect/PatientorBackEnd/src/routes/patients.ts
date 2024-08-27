import express from "express";
import patientsService from "../service/patientsService";
import { toNewPacient } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSsnPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPacient(req.body);
    const addedPatient = patientsService.addPatients(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

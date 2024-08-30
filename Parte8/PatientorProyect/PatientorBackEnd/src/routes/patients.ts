import express from "express";
import patientsService from "../service/patientsService";
import { toNewEntries, toNewPacient } from "../utils";
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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient = patientsService.getPatientById(id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: "Patient not found" });
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntries(req.body);
    const addedEntry = patientsService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

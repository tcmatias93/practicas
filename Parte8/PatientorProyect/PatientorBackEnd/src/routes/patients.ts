import express from "express";
import patientsService from "../service/patientsService";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSsnPatients());
});

export default router;

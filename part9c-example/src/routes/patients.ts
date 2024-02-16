import express from "express";

import patientService from "../services/patientService";
import { toNewPatient } from "../utils";
import NewPatient from "../types/NewPatient";
import Patient from "../types/Patient";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatientsNoSSN());
});

router.post("/", (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient: Patient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMsg = "Something went wrong.";
    if (error instanceof Error) {
      errorMsg += ` ${error.message}`;
    }
    res.status(400).send(errorMsg);
  }
});

export default router;

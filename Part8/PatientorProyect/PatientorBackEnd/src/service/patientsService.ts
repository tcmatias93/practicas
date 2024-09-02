import patients from "../data/patients";
import {
  NonSsnPatient,
  NewPatient,
  Patient,
  EntryWithoutId,
} from "../data/types";
import { v4 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSsnPatients = (): NonSsnPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatients = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
    entries: entry.entries || [],
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    return undefined;
  }

  return patient;
};

const addEntry = (
  patientId: string,
  entry: EntryWithoutId
): Patient | undefined => {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error(`Patient with id ${patientId} not found`);
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);

  return patient;
};

export default {
  getPatients,
  getNonSsnPatients,
  addPatients,
  getPatientById,
  addEntry,
};

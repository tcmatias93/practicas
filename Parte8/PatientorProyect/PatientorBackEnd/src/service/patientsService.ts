import patients from "../data/patients";
import { Patients, NonSsnPatients, NewPatient } from "../data/types";
import { v4 as uuid } from "uuid";

const getPatients = (): Patients[] => {
  return patients;
};

const getNonSsnPatients = (): NonSsnPatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatients = (entry: NewPatient): Patients => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSsnPatients, addPatients };

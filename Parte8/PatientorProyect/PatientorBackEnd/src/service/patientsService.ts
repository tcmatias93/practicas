import patients from "../data/patients";
import { Patients, NonSsnPatients } from "../data/types";

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

export default { getPatients, getNonSsnPatients };

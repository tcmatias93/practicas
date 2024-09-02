import Diagnoses from "../data/diagnoses";
import { Diagnosis, NonLatinDiagnoses } from "../data/types";

const getDiagnosis = (): Diagnosis[] => {
  return Diagnoses;
};

const getNonLatinDiagnosis = (): NonLatinDiagnoses[] => {
  return Diagnoses.map(({ code, name }) => ({ code, name }));
};

const addDiagnosis = (entry: Diagnosis): Diagnosis => {
  const newDiagnosis = {
    ...entry,
  };
  Diagnoses.push(newDiagnosis);
  return newDiagnosis;
};

export default { getDiagnosis, getNonLatinDiagnosis, addDiagnosis };

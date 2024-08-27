import diagnoses from "../data/diagnoses";
import { Diagnoses, NonLatinDiagnoses } from "../data/types";

const getDiagnoses = (): Diagnoses[] => {
  return diagnoses;
};

const getNonLatinDiagnoses = (): NonLatinDiagnoses[] => {
  return diagnoses.map(({ code, name }) => ({ code, name }));
};

const addDiagnoses = (entry: Diagnoses): Diagnoses => {
  const newDiagnoses = {
    ...entry,
  };
  diagnoses.push(newDiagnoses);
  return newDiagnoses;
};

export default { getDiagnoses, getNonLatinDiagnoses, addDiagnoses };

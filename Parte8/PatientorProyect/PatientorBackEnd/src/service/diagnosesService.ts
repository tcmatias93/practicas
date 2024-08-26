import diagnoses from "../data/diagnoses";
import { Diagnoses, NonLatinDiagnoses } from "../data/types";

const getDiagnoses = (): Diagnoses[] => {
  return diagnoses;
};

const getNonLatinDiagnoses = (): NonLatinDiagnoses[] => {
  return diagnoses.map(({ code, name }) => ({ code, name }));
};

export default { getDiagnoses, getNonLatinDiagnoses };

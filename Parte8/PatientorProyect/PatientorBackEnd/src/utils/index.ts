import { Diagnoses, Gender, NewPatient } from "../data/types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing Gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

const parseCode = (code: unknown): string => {
  if (!code || !isString(code)) {
    throw new Error("Incorrect or missing code: " + code);
  }
  return code;
};

const parseLatin = (latin: unknown): string => {
  if (!latin || !isString(latin)) {
    throw new Error("Incorrect or missing latin: " + latin);
  }
  return latin;
};

export const toNewPacient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: "ssn" in object ? parseSsn(object.ssn) : undefined,
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: same fields are missing in new Pacient");
};

export const toNewDiagnoses = (object: unknown): Diagnoses => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("code" in object && "name" in object) {
    const newDiagnose: Diagnoses = {
      code: parseCode(object.code),
      name: parseName(object.name),
      latin: "latin" in object ? parseLatin(object.latin) : undefined,
    };
    return newDiagnose;
  }
  throw new Error("Incorrect data: same fields are missing in new Diagnoses");
};

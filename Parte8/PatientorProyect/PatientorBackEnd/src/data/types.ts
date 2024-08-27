export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}

export type NonLatinDiagnoses = Omit<Diagnoses, "latin">;
export type NonSsnPatients = Omit<Patients, "ssn">;
export type NewPatient = Omit<Patients, "id">;
export type NewDiagnose = Omit<Diagnoses, "id">;

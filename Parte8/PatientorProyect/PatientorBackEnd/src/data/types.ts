export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
}

export type NonLatinDiagnoses = Omit<Diagnoses, "latin">;
export type NonSsnPatients = Omit<Patients, "ssn">;

import {
  Diagnosis,
  Gender,
  NewPatient,
  BaseEntry,
  Entry,
  NewHealthCheckEntry,
  HealthCheckRating,
  EntryWithoutId,
  HospitalEntry,
  OccupationalHealthCareEntry,
  Discharge,
  SickLeave,
} from "../data/types";

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

export const isBaseEntry = (object: any): object is BaseEntry => {
  return (
    object &&
    isString(object.id) &&
    isString(object.description) &&
    isDate(object.date) &&
    typeof object.specialist === "string"
  );
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

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error("Incorrect or missing entries");
  }

  return entries.map((entry) => {
    if (!isBaseEntry(entry)) {
      throw new Error("Incorrect entry format");
    }
    return entry as Entry;
  });
};

const parseDiagnosisCode = (codes: unknown): Array<Diagnosis["code"]> => {
  if (
    !codes ||
    !Array.isArray(codes) ||
    !codes.every((code) => typeof code === "string")
  ) {
    return [] as Array<Diagnosis["code"]>;
  }

  return codes as Array<Diagnosis["code"]>;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing name");
  }
  return description;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    typeof rating !== "number" ||
    !Object.values(HealthCheckRating).includes(rating)
  ) {
    throw new Error(`Value of Heaalthcheck rating incorrect: ${rating}`);
  }
  return rating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge) ||
    !("criteria" in discharge)
  ) {
    throw new Error("Incorrect or missing discharge");
  }
  return {
    date: parseDateOfBirth((discharge as Discharge).date),
    criteria: parseDescription((discharge as Discharge).criteria),
  };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !sickLeave ||
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave)
  ) {
    throw new Error("Incorrect or missing sick leave");
  }
  return {
    startDate: parseDateOfBirth((sickLeave as SickLeave).startDate),
    endDate: parseDateOfBirth((sickLeave as SickLeave).endDate),
  };
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
      entries: "entries" in object ? parseEntries(object.entries) : [],
    };

    return newPatient;
  }

  throw new Error("Incorrect data: same fields are missing in new Pacient");
};

export const toNewDiagnosis = (object: unknown): Diagnosis => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("code" in object && "name" in object) {
    const newDiagnose: Diagnosis = {
      code: parseCode(object.code),
      name: parseName(object.name),
      latin: "latin" in object ? parseLatin(object.latin) : undefined,
    };
    return newDiagnose;
  }
  throw new Error("Incorrect data: same fields are missing in new Diagnosis");
};

export const toNewEntries = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  const baseEntry = object as {
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes?: unknown;
    healthCheckRating?: unknown;
    discharge?: unknown;
    employerName?: unknown;
    sickLeave?: unknown;
  };

  const newBaseEntry: Omit<BaseEntry, "id"> = {
    description: parseDescription(baseEntry.description),
    date: parseDateOfBirth(baseEntry.date),
    specialist: parseName(baseEntry.specialist),
    diagnosisCodes: parseDiagnosisCode(baseEntry.diagnosisCodes),
  };
  if ("healthCheckRating" in object) {
    return {
      ...newBaseEntry,
      type: "HealthCheck",
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    } as NewHealthCheckEntry;
  } else if ("discharge" in object) {
    return {
      ...newBaseEntry,
      type: "Hospital",
      discharge: parseDischarge(object.discharge),
    } as HospitalEntry;
  } else if ("employerName" in object) {
    return {
      ...newBaseEntry,
      type: "OccupationalHealthCare",
      employerName: parseName(object.employerName),
      sickLeave:
        "sickLeave" in object ? parseSickLeave(object.sickLeave) : undefined,
    } as OccupationalHealthCareEntry;
  }

  throw new Error("Incorrect data: same fields are missing in new Entries");
};

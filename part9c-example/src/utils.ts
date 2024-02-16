import NewPatient from "./types/NewPatient";
import Gender from "./types/Gender";

const isString = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};

const isGender = (value: unknown): value is Gender => {
  return Object.values(Gender).includes(value as Gender);
};

const parseString = (value: unknown): string => {
  if (isString(value)) {
    return value;
  }
  throw new Error("Value is not a string");
};

const parseGender = (value: unknown): Gender => {
  if (!isString(value)) {
    throw new Error("Value is not a string");
  }

  if (!isGender(value)) {
    throw new Error("Value is not a gender");
  }

  return value;
};

export const toNewPatient = (patientObj: unknown): NewPatient => {
  if (!patientObj || typeof patientObj !== "object") {
    throw new Error("Incorrect or missing patient object");
  }

  if (
    "name" in patientObj &&
    "dateOfBirth" in patientObj &&
    "gender" in patientObj &&
    "occupation" in patientObj &&
    "ssn" in patientObj
  ) {
    const newPatient: NewPatient = {
      name: parseString(patientObj.name),
      dateOfBirth: parseString(patientObj.dateOfBirth),
      gender: parseGender(patientObj.gender),
      occupation: parseString(patientObj.occupation),
      ssn: parseString(patientObj.ssn),
    };
    return newPatient;
  }

  throw new Error("Incorrect or missing fields in patient object");
};

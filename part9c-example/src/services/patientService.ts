import { v1 as uuid } from "uuid";

import patients from "../../data/patients";
import Patient from "../types/Patient";
import NewPatient from "../types/NewPatient";

const getPatientsNoSSN = (): Omit<Patient, "ssn">[] => {
  return patients.map((patient) => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: patient.entries,
    };
  });
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    ...patient,
    id: uuid(),
  };
  patients.push(newPatient);

  return newPatient;
};

export default { getPatientsNoSSN, addPatient };

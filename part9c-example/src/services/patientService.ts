import patients from "../../data/patients";
import Patient from "../types/Patient";

const getPatientsNoSSN = (): Omit<Patient, "ssn">[] => {
  return patients.map((patient) => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
    };
  });
};

export default { getPatientsNoSSN };

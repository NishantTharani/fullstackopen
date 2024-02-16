import Patient from "./Patient";

type NewPatient = Omit<Patient, "id">;

export default NewPatient;

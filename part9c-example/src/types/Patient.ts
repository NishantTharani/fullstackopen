import Gender from "./Gender";

export interface Entry {}

type Patient = {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth: string;
  entries: Entry[];
};

export default Patient;

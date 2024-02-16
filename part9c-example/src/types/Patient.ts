import Gender from "./Gender";

type Patient = {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth: string;
};

export default Patient;

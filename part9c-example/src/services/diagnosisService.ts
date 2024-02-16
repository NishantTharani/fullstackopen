import diagnoses from "../../data/diagnoses";
import Diagnosis from "../types/Diagnosis";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default { getDiagnoses };

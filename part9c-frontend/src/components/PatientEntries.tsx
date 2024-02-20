import { useEffect, useState } from "react";
import { Diagnosis, Entry } from "../types";
import axios from "axios";

type PatientEntriesProps = {
  entries: Entry[];
};

const PatientEntries = ({ entries }: PatientEntriesProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const fetchDiagnoses = async () => {
    const diagnoses = await axios
      .get<Diagnosis[]>("http://localhost:3000/api/diagnoses")
      .then((response) => response.data);
    setDiagnoses(diagnoses);
  };

  useEffect(() => {
    fetchDiagnoses();
  }, []);

  return (
    <div>
      <h3>entries</h3>
      {entries.map((entry) => (
        <div key={entry.id}>
          <h4>{entry.date}</h4>
          <p>{entry.description}</p>
          <p>{entry.specialist}</p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {diagnoses.find((d) => d.code === code)?.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientEntries;

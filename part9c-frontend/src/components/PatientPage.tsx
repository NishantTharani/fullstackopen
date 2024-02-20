import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Entry, Patient } from "../types";
import axios from "axios";
import PatientEntries from "./PatientEntries";

const PatientPage = () => {
  const { id } = useParams();

  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [entries, setEntries] = useState<Entry[]>([]);

  const fetchPatient = async () => {
    const patient = await axios
      .get<Patient>(`http://localhost:3000/api/patients/${id}`)
      .then((response) => response.data);
    setPatient(patient);
    setEntries(patient.entries);
  };

  useEffect(() => {
    void fetchPatient();
  }, [id]);

  return (
    <div>
      <h1>Patient Page</h1>
      {patient && (
        <div>
          <p>{patient.name}</p>
          <p>occupation: {patient.occupation}</p>
          <p>gender: {patient.gender}</p>
        </div>
      )}
      {entries && <PatientEntries entries={entries} />}
    </div>
  );
};

export default PatientPage;

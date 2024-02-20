import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import axios from "axios";

const PatientPage = () => {
  const { id } = useParams();

  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const fetchPatient = async () => {
    const patient = await axios
      .get<Patient>(`http://localhost:3000/api/patients/${id}`)
      .then((response) => response.data);
    setPatient(patient);
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
          <p>{patient.occupation}</p>
          <p>{patient.gender}</p>
          <p>{patient.ssn}</p>
          <p>{patient.dateOfBirth}</p>
        </div>
      )}
    </div>
  );
};

export default PatientPage;

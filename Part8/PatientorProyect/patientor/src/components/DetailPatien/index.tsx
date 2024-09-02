import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { useEffect, useState } from "react";
import patientService from '../../services/patients';
import Entrie from "./Entrie";
import { Skeleton } from "@mui/material";
import PatientInfo from "./PatientInfo";
import AddEntry from "./AddEntry";



const DetailPatien = () => {
  const [patient, setPatient] = useState<Patient>();
  const path = useParams().id;

  const fetchPatient = async () => {
    const patients = await patientService.getPatientById(path);
    setPatient(patients);
  };

  useEffect(() => {
    void fetchPatient();
  }, [path]);


  return (
    <div>
      {patient ?
        <div>
          <PatientInfo patient={patient} />
          <AddEntry onEntryAdded={fetchPatient} />

          <Entrie patient={patient} />
        </div>
        : <div>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="rounded" width={210} height={60} />
        </div>
      }

    </div>
  );
};

export default DetailPatien;


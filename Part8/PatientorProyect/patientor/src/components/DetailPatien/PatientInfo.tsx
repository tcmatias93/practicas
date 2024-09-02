import { Patient } from "../../types";

interface Props {
  patient: Patient
}
const PatientInfo = ({ patient }: Props) => {
  return (
    <div>
      <h1>{patient.name} </h1>
      <p>SSH: {patient.ssn} </p>
      <p>Occupation: {patient.occupation} </p>
    </div>
  );
};

export default PatientInfo;
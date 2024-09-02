import Paper from '@mui/material/Paper';
import { Entry } from "../../types";
import { styled } from '@mui/material/styles';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f1f1f1',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'initial',
  color: theme.palette.text.secondary,

}));

const HospitalEntries: React.FC<{ entry: Entry, diagnoseDitail: (code: string) => string | undefined }> = ({ entry, diagnoseDitail }) => {

  return (
    <div>
      <Item key={entry.id}>
        <div>{entry.date} <MedicalServicesIcon style={{ color: 'black' }} /> </div>
        <p>{entry.description}</p>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>{code}: {diagnoseDitail(code)}</li>
          ))}
        </ul>
        <div>

        </div>
        <p>Diagnose by: {entry.specialist} </p>
      </Item>

    </div>
  );
};

export default HospitalEntries;
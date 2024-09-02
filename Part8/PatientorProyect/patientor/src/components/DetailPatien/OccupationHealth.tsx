import { Entry } from "../../types";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import WorkIcon from '@mui/icons-material/Work';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f1f1f1',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'initial',
  color: theme.palette.text.secondary,

}));

const OccupationHealth: React.FC<{ entry: Entry, diagnoseDitail: (code: string) => string | undefined }> = ({ entry, diagnoseDitail }) => {

  if (entry.type != 'OccupationalHealthcare') {
    return null;
  }

  return (
    <Item key={entry.id}>
      <div>{entry.date} <WorkIcon style={{ color: 'black' }} /> {entry.employerName} </div>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>{code} {diagnoseDitail(code)}</li>
        ))}
      </ul>
      <p>Diagnose by: {entry.specialist} </p>
    </Item>
  );
};

export default OccupationHealth;
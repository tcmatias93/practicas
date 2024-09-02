import { Entry, HealthCheckRating } from "../../types";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f1f1f1',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'initial',
  color: theme.palette.text.secondary,

}));

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthCheck: React.FC<{ entry: Entry, diagnoseDitail: (code: string) => string | undefined }> = ({ entry, diagnoseDitail }) => {
  if (entry.type !== "HealthCheck") {
    return null; // O podrías manejar este caso de alguna otra forma
  }


  const ColorIcon: React.FC<{ healthCheckRating: HealthCheckRating }> = ({ healthCheckRating }) => {
    switch (healthCheckRating) {
      case HealthCheckRating.Healthy:
        return <FavoriteIcon style={{ color: 'green' }} />;
      case HealthCheckRating.LowRisk:
        return <FavoriteIcon style={{ color: "yellow" }} />;
      case HealthCheckRating.HighRisk:
        return <FavoriteIcon style={{ color: "yellow" }} />;
      case HealthCheckRating.CriticalRisk:
        return <FavoriteIcon style={{ color: 'red' }} />;
      default:
        return assertNever(healthCheckRating);
    }
  };

  return (
    <Item key={entry.id}>
      <div>{entry.date} </div>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>{code} {diagnoseDitail(code)}</li>
        ))}
      </ul>
      <ColorIcon healthCheckRating={entry.healthCheckRating} />
      <p>Diagnose by: {entry.specialist} </p>
    </Item>
  );
};

export default HealthCheck;
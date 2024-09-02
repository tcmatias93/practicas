import { Entry } from "../../types"; // Asegúrate de tener el tipo Entry correctamente definido
import HealthCheck from "./HealthCheck";
import HospitalEntries from "./HospitalEntries";
import OccupationHealth from "./OccupationHealth";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry, diagnoseDitail: (code: string) => string | undefined }> = ({ entry, diagnoseDitail }) => {


  switch (entry.type) {
    case 'Hospital':
      return (
        <HospitalEntries entry={entry} diagnoseDitail={diagnoseDitail} />
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationHealth entry={entry} diagnoseDitail={diagnoseDitail} />
      );
    case 'HealthCheck':
      return (
        <HealthCheck entry={entry} diagnoseDitail={diagnoseDitail} />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

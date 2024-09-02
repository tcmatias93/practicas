import { Diagnosis, Patient } from "../../types";
import DiagnosisService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import EntryDetails from "./EntryDetails";



interface Props {
  patient: Patient
}
const Entrie = ({ patient }: Props) => {
  const [diagnose, setDiagnose] = useState<Diagnosis[]>([]);

  useEffect(() => {
    DiagnosisService.getAll().then(response => setDiagnose(response));
  }, []);

  const diagnoseDitail = (code: string): string | undefined => {
    const description = diagnose.find(d => d.code === code);
    return description?.name;
  };

  return (
    <div>
      <h2>Entries</h2>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2}>
          {patient.entries.map((entrie) => (
            <EntryDetails key={entrie.id} entry={entrie} diagnoseDitail={diagnoseDitail} />
          ))}
        </Stack>
      </Box>
    </div>
  );
};

export default Entrie;

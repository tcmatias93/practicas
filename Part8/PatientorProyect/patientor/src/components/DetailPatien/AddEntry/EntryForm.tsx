import { Box, Button, Chip, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFilter } from "../../../hooks/useFilter";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../../types";
import DiagnosisServide from '../../../services/diagnoses';

interface Props {
  onClose: () => void
  onSubmit: (values: EntryWithoutId) => Promise<void>
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const EntryForm = ({ onClose, onSubmit }: Props) => {

  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [nameSpecialist, setNameSpecialist] = useState<string>('');
  const healthCheck = useFilter<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosiCodes, setDiagnosiCodes] = useState<string[]>([]);

  const [diagnose, setDiagnose] = useState<Diagnosis[]>([]);

  useEffect(() => {
    DiagnosisServide.getAll().then(response => setDiagnose(response));
  }, []);


  const handleChange = (event: SelectChangeEvent<typeof diagnosiCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosiCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: EntryWithoutId = {
      type: "HealthCheck",
      description: description,
      date: date,
      specialist: nameSpecialist,
      healthCheckRating: healthCheck.value,
      diagnosisCodes: diagnosiCodes
    };
    onSubmit(newEntry);
    onClose();
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel>Description</InputLabel>
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)} />

        <InputLabel style={{ marginTop: 10 }}>Date</InputLabel>
        <input type="date"
          name="date"
          id="date"
          value={date}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDate(event.target.value)}
        />

        <InputLabel style={{ marginTop: 10 }}>Specialist</InputLabel>
        <TextField
          fullWidth
          label="Name of specialist"
          value={nameSpecialist}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNameSpecialist(event.target.value)}
        />

        <InputLabel style={{ marginTop: 10 }}>Healthcheck Ratin</InputLabel>
        <FormControl style={{ marginTop: 10 }}>
          <RadioGroup row>
            <FormControlLabel
              control={<Radio />}
              checked={healthCheck.value === HealthCheckRating.Healthy}
              label="0"
              onChange={() => healthCheck.handleFilterChange(HealthCheckRating.Healthy)}
            />
            <FormControlLabel
              control={<Radio />}
              checked={healthCheck.value === HealthCheckRating.LowRisk}
              label="1"
              onChange={() => healthCheck.handleFilterChange(HealthCheckRating.LowRisk)}
            />
            <FormControlLabel
              control={<Radio />}
              checked={healthCheck.value === HealthCheckRating.HighRisk}
              label="2"
              onChange={() => healthCheck.handleFilterChange(HealthCheckRating.HighRisk)}
            />
            <FormControlLabel
              control={<Radio />}
              checked={healthCheck.value === HealthCheckRating.CriticalRisk}
              label="3"
              onChange={() => healthCheck.handleFilterChange(HealthCheckRating.CriticalRisk)}
            />

          </RadioGroup>
        </FormControl>


        <InputLabel style={{ marginTop: 10 }}>Diagnosis codes</InputLabel>
        <Select
          fullWidth
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={diagnosiCodes}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {diagnose.map(({ code }) => (
            <MenuItem
              key={code}
              value={code}
            >
              {code}
            </MenuItem>
          ))}
        </Select>

        <Grid style={{ marginTop: 10 }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EntryForm;
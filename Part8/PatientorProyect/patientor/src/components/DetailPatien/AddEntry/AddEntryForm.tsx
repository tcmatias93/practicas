
import { Dialog, DialogContent, DialogTitle, Alert, Divider } from "@mui/material";
import EntryForm from "./EntryForm";
import { EntryWithoutId } from "../../../types";

interface Props {
  modalOpen: boolean,
  onClose: () => void,
  error?: string
  onSubmit: (values: EntryWithoutId) => Promise<void>
}

const AddEntryForm = ({ modalOpen, onClose, error, onSubmit }: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={onClose} >
      <DialogTitle>New Entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <EntryForm onClose={onClose} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryForm;
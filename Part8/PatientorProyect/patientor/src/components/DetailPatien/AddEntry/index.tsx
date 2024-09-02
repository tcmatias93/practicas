import { Button } from "@mui/material";
import { useState } from "react";
import AddEntryForm from "./AddEntryForm";
import axios from "axios";
import patientsServide from '../../../services/patients';
import { useParams } from "react-router-dom";
import { EntryWithoutId } from "../../../types";

interface AddEntryProps {
  onEntryAdded: () => void;
}

const AddEntry = ({ onEntryAdded }: AddEntryProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const params = useParams();
  const id = params.id;

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError('');
  };

  const addNewEntry = async (values: EntryWithoutId) => {
    try {
      await patientsServide.newEntry(id, values);
      onEntryAdded();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <AddEntryForm modalOpen={modalOpen} onClose={closeModal} error={error} onSubmit={addNewEntry} />
      <Button variant="contained" onClick={() => openModal()}>
        Add Entry
      </Button>
    </div>

  );
};

export default AddEntry;
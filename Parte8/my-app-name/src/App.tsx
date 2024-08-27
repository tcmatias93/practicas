import React, { useEffect, useState } from "react";
import { Note } from "./types";
import { createNotes, getAllNotes } from "./service/noteService";

const App = () => {
  const [newNote, setNewNote] = useState('')
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    getAllNotes().then(data => setNotes(data))
  }, [])

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createNotes({ content: newNote }).then(data => setNotes(notes.concat(data)))

    setNewNote('')
  }

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input value={newNote} onChange={event => setNewNote(event.target.value)} />
        <button type='submit'>add</button>
      </form>
      <ul>
        {notes.map(note =>
          <li key={note.id}>{note.content} </li>
        )}
      </ul>
    </div>
  )
};

export default App;
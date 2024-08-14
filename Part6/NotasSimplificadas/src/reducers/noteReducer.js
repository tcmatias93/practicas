import { createSlice, current } from "@reduxjs/toolkit";

/* const initialState = {
  notes: [
    {
      content: "reducer defines how redux store works",
      important: true,
      id: 1,
    },
    { content: "state of store can contain any data", important: false, id: 2 },
  ],
  filter: "ALL",
};
 */
/* const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state.notes, action.payload]; //es lo mismo que esta a la izquierda state.concat(action.payload);
    case "TOGGLE_IMPORTANCE": {
      const id = action.payload.id;
      const noteChange = state.find((n) => n.id === id);
      const changeNote = {
        ...noteChange,
        important: !noteChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changeNote));
    }

    default:
      return state;
  }
}; */

export const generateId = () => Number((Math.random() * 1000000).toFixed(0));

/* export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: { id },
  };
}; */

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      /*const content = action.payload;
       state.notes.push({
        content,
        important: false,
        id: generateId(),
      }); */
      state.push(action.payload);
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);

      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      console.log("test", changedNote);
      console.log(current(state));
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    //añadir un objeto de una nota
    appendNote(state, action) {
      state.push(action.payload);
    },

    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { createNote, toggleImportanceOf, appendNote, setNotes } =
  noteSlice.actions;
export default noteSlice.reducer;

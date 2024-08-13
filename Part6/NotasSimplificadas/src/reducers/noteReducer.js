const initialState = {
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

const noteReducer = (state = initialState, action) => {
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
};

export const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createNote = (content) => {
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
};

export default noteReducer;

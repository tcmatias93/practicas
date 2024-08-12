const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.payload]; //es lo mismo que esta a la izquierda state.concat(action.payload);
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

export default noteReducer;

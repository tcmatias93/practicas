import { createStore } from "redux";
import noteReducer from "./reducers/noteReducer";

const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "The app store is in redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "Store changes are mode with actions",
    important: false,
    id: 2,
  },
});

store.dispatch({
  type: "TOGGLE_IMPORTANCE",
  payload: {
    id: 2,
  },
});

function App() {
  return (
    <div>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? "Important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

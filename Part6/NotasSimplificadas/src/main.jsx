import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App.jsx";
import noteReducer from "./reducers/noteReducer.js";

import "./index.css";

const stote = createStore(noteReducer);

createRoot(document.getElementById("root")).render(
  <Provider store={stote}>
    <App />
  </Provider>
);

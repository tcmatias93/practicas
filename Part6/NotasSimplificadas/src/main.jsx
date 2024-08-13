import { createRoot } from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import App from "./App.jsx";
import noteReducer from "./reducers/noteReducer.js";
import filterReducer from "./reducers/filterReducer.js";

import "./index.css";

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});
const store = createStore(reducer);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

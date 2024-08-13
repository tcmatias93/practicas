import { createSlice } from "@reduxjs/toolkit";
/* 
const filterReducer = (state = "", action) => {
  console.log("state filter: ", state);
  console.log("action", action);
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;

    default:
      return state;
  }
};

export const filterAnecdote = (words) => {
  return {
    type: "SET_FILTER",
    payload: words,
  };
}; */

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterAnecdote(state, action) {
      return action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { filterAnecdote } = filterSlice.actions;

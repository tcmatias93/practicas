import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

/* const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject); */

/* const anecdoteReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "TOGGLE_VOTE": {
      const id = action.payload.id;
      const anecdoteChange = state.find((a) => a.id === id);
      const changeAnecdote = {
        ...anecdoteChange,
        votes: anecdoteChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changeAnecdote
      );
    }
    case "NEW_ANECDOTE":
      return [...state, action.payload];
    default:
      return state;
  }
}; */

/* export const toggleVote = (id) => {
  return {
    type: "TOGGLE_VOTE",
    payload: { id },
  };
};

export const createAnecdote = (content) => {
  return {
    type: "NEW_ANECDOTE",
    payload: {
      content,
      id: getId,
      votes: 0,
    },
  };
}; */

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    toggleVote(state, action) {
      const id = action.payload;
      const anecdoteChange = state.find((a) => a.id === id);
      const changeAnecdote = {
        ...anecdoteChange,
        votes: anecdoteChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changeAnecdote
      );
    },
    appAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { toggleVote, setAnecdote, appAnecdote } = anecdoteSlice.actions;

export const initializedAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getall();
    dispatch(setAnecdote(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appAnecdote(newAnecdote));
  };
};

export const addVote = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const anecdoteToUpdate = state.anecdotes.find((a) => a.id === id);
    const updatedAnecdote = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1,
    };

    const addVotes = await anecdoteService.countVotes(id, updatedAnecdote);
    dispatch(toggleVote(addVotes.id));
  };
};

export default anecdoteSlice.reducer;

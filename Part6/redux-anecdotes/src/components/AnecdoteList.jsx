import { useSelector, useDispatch } from "react-redux";
import { toggleVote } from "../reducers/anecdoteReducer";
import { showNotification } from "./Notification";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

  console.log("anecdotes: ", anecdotes);
  const filter = useSelector((state) => state.filter);

  const anecdotesFilter = anecdotes
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();

  const vote = (id, message) => {
    console.log("vote", id);
    dispatch(toggleVote(id));
    dispatch(showNotification(`You voted for the anecdote: ${message}`));
  };
  return (
    <div>
      {anecdotesFilter.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

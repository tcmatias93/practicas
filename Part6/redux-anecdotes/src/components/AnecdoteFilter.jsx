import { useDispatch } from "react-redux";
import { filterAnecdote } from "../reducers/filterReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const handleFilter = (event) => {
    const filter = event.target.value;
    dispatch(filterAnecdote(filter));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter <input name="filter" onChange={handleFilter} />
    </div>
  );
};

export default AnecdoteFilter;

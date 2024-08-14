import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getall = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const data = {
    content,
    votes: 0,
  };

  const response = await axios.post(baseUrl, data);
  return response.data;
};

const countVotes = async (id, updatedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return response.data;
};

export default { getall, createNew, countVotes };

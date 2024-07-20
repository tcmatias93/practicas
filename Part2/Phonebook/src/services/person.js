import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPerson = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const createPersonPhone = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((res) => res.data);
};

const deletePeopleRegister = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};
export default { getAllPerson, createPersonPhone, deletePeopleRegister };

import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

const getAllCountrey = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((res) => res.data);
};

export default { getAllCountrey };

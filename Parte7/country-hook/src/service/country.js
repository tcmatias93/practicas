import axios from "axios";

const baseURl = "https://studies.cs.helsinki.fi/restcountries/api/name";

const getCountry = (name) => {
  const request = axios.get(`${baseURl}/${name}`);
  return request.then((res) => res);
};

export default { getCountry };

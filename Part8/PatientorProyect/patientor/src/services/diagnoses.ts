import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/Diagnosis`);

  return data;
};

export default { getAll };

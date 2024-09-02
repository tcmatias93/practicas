import axios from "axios";
const baseUrl = "http://localhost:3000/api/diaries";
import { DiaryEntry, NewDiaryEntry } from "../data/types";

export const getAllDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export const createDiairies = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then((response) => response.data);
};

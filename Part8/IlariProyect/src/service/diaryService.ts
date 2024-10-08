import diaries from "../data/entries";
import {
  NonSensitiveDiaryEntry,
  DiaryEntry,
  NewDiaryEntry,
} from "../data/types";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility, comment }) => ({
    id,
    date,
    weather,
    visibility,
    comment,
  }));
};

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

export default { getEntries, addEntry, getNonSensitiveEntries, findById };

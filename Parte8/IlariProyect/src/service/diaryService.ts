import diaries from "../data/entries";
import { NonSensitiveDiaryEntry, DiaryEntry } from "../data/types";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addEntry = () => {
  return null;
};

export default { getEntries, addEntry, getNonSensitiveEntries };

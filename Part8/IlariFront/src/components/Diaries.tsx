import React from "react"
import { DiaryEntry } from "../data/types"
import Diary from "./Diary"

const Diaries: React.FC<{ diaries: DiaryEntry[] }> = ({ diaries }) => {

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  )
}

export default Diaries
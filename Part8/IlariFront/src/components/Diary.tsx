import React from "react"
import { DiaryEntry } from "../data/types"

const Diary: React.FC<{ diary: DiaryEntry }> = ({ diary }) => {
  return (
    <div>
      <h2>{diary.date}</h2>
      <p>Visibility: {diary.visibility} </p>
      <p>Weather: {diary.weather} </p>
      <p>Comment: {diary.comment} </p>
    </div>
  )
}

export default Diary
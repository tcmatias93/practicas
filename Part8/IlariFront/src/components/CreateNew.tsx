import React, { useState } from "react"
import { useField } from "../hooks/useField"
import { createDiairies } from "../service/diarieServices"
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../data/types"
import axios from "axios"
import { useFilter } from "../hooks/useFilter"

interface CreateNewProps {
  diaries: DiaryEntry[]
  setDiareis: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
}

const CreateNew = ({ diaries, setDiareis }: CreateNewProps) => {
  const date = useField("date")
  const visibility = useFilter<Visibility>(Visibility.Great)
  const weather = useFilter<Weather>(Weather.Sunny)
  const comment = useField("text")
  const [errorMessage, setErrorMessage] = useState('')

  const diarieCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiary: NewDiaryEntry = {
      date: date.value,
      visibility: visibility.value,
      weather: weather.value,
      comment: comment.value
    }
    createDiairies(newDiary)
      .then(data => {
        setDiareis(diaries.concat(data))
        date.reset()
        comment.reset()
      })
      .catch(error => {
        if (axios.isAxiosError(error) && error.message) {
          setErrorMessage(error.response?.data)
        } else {
          setErrorMessage("An unexpected error ocurred")
        }
      })
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && errorMessage}
      <form onSubmit={diarieCreation}>
        <div>
          Date:{" "}
          great<input {...date} />
        </div>
        <div>
          Visibility:{" "}
          great
          <input
            type="radio"
            checked={visibility.value === Visibility.Great}
            onChange={() => visibility.handleFilterChange(Visibility.Great)}
          />
          good
          <input
            type="radio"
            checked={visibility.value === Visibility.Good}
            onChange={() => visibility.handleFilterChange(Visibility.Good)}
          />
          ok
          <input
            type="radio"
            checked={visibility.value === Visibility.Ok}
            onChange={() => visibility.handleFilterChange(Visibility.Ok)}
          />
          poor
          <input
            type="radio"
            checked={visibility.value === Visibility.Poor}
            onChange={() => visibility.handleFilterChange(Visibility.Poor)}
          />
        </div>
        <div>
          Weather: {" "}
          sunny
          <input
            type="radio"
            checked={weather.value === Weather.Sunny}
            onChange={() => weather.handleFilterChange(Weather.Sunny)}
          />
          rainy
          <input
            type="radio"
            checked={weather.value === Weather.Rainy}
            onChange={() => weather.handleFilterChange(Weather.Rainy)}
          />
          cloudy
          <input
            type="radio"
            checked={weather.value === Weather.Cloudy}
            onChange={() => weather.handleFilterChange(Weather.Cloudy)}
          />
          stormy
          <input
            type="radio"
            checked={weather.value === Weather.Stormy}
            onChange={() => weather.handleFilterChange(Weather.Stormy)}
          />
          windi
          <input
            type="radio"
            checked={weather.value === Weather.Windy}
            onChange={() => weather.handleFilterChange(Weather.Windy)}
          />
        </div>
        <div>
          Comment: {" "}
          <input {...comment} />
        </div>
        <button type='submit' >Add</button>
      </form>
    </div>
  )
}

export default CreateNew
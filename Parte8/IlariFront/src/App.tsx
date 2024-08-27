import { useEffect, useState } from "react"
import { getAllDiaries } from "./service/diarieServices"
import { DiaryEntry } from "./data/types"
import Diaries from "./components/Diaries"
import CreateNew from "./components/CreateNew"

function App() {
  const [diaries, setDiareis] = useState<DiaryEntry[]>([])
  useEffect(() => {
    getAllDiaries().then(data => { setDiareis(data) })
  }, [])

  return (
    <>
      <CreateNew diaries={diaries} setDiareis={setDiareis} />
      <Diaries diaries={diaries} />
    </>
  )
}

export default App

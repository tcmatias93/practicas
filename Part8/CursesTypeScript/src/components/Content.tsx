import { CoursePart } from "../utils/types"
import Part from "./Part"

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {

  return (
    <div>{courseParts.map((part) => (
      <Part key={part.name} part={part} />
    ))}</div>
  )
}

export default Content
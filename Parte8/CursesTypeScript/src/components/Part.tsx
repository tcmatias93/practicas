import { CoursePart } from "../utils/types"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.kind) {
    case 'basic':
      return <div>
        <h2>{part.name} {part.exerciseCount}</h2>
        <p>{part.description} </p>
      </div>
    case "group":
      return <div>
        <h2>{part.name} {part.exerciseCount}</h2>
        <p>project exercises {part.groupProjectCount} </p>
      </div>
    case "background":
      return <div >
        <h2>{part.name} {part.exerciseCount}</h2>
        <p>{part.description} </p>
        <p>{part.backgroundMaterial}</p>
      </div >


    case 'special':
      return <div>
        <h2>{part.name} {part.exerciseCount}</h2>
        <p>{part.description} </p>
        <p>Required {part.requirements.join(' ')}</p>
      </div>
    default:
      return assertNever(part)
  }
}

export default Part
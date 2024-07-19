const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(({ name, exercises }) => (
        <Part name={name} exercises={exercises} key={name} />
      ))}
    </>
  );
};

const Course = ({ name, parts }) => {
  const initialValue = 0;
  const totalExercises = parts.reduce(
    (acumulador, currentValue) => acumulador + currentValue.exercises,
    initialValue
  );

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <p>Total of {totalExercises} exercises</p>
    </div>
  );
};

export default Course;

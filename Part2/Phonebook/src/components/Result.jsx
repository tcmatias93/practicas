const Result = ({ resultPersonShow, deletePeople }) => {
  return (
    <p>
      {resultPersonShow.name} {resultPersonShow.number}
      <button onClick={deletePeople}>Delete</button>
    </p>
  );
};

export default Result;

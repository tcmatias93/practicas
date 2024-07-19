const Result = ({ resultPersonShow }) => {
  return (
    <>
      {resultPersonShow.map(({ name, number }) => (
        <p key={name}>
          {name} {number}{" "}
        </p>
      ))}
    </>
  );
};

export default Result;

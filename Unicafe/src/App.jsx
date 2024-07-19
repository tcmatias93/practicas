import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Result = ({ texto, cantidad, porcent }) => {
  if (!porcent) {
    return (
      <tr>
        <td>{texto}</td>
        <td>{cantidad}</td>
      </tr>
    );
  }
  if (porcent && cantidad > 0) {
    return (
      <tr>
        <td>{texto}</td>
        <td>{cantidad}%</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{texto}</td>
      <td>0%</td>
    </tr>
  );
};

const Statistics = ({
  good,
  neutral,
  bad,
  totalResult,
  positiveComente,
  getAverage,
}) => {
  if (
    good > 0 ||
    neutral > 0 ||
    bad > 0 ||
    positiveComente > 0 ||
    getAverage > 0
  ) {
    return (
      <table>
        <tbody>
          <Result texto={"Good"} cantidad={good} />
          <Result texto={"Neutral"} cantidad={neutral} />
          <Result texto={"Bad"} cantidad={bad} />
          <Result texto={"All"} cantidad={totalResult} />
          <Result
            texto={"Positive"}
            cantidad={positiveComente}
            porcent={true}
          />
          <Result texto={"Average"} cantidad={getAverage} />
        </tbody>
      </table>
    );
  }
  return <p>No feedback given</p>;
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  const totalResult = good + neutral + bad;
  const PositiveComente = (good / totalResult) * 100;
  const getAverage = () => {
    const total = totalResult;
    return total === 0 ? 0 : (good - bad) / total;
  };
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text={"Good"} />
      <Button handleClick={handleNeutral} text={"Neutral"} />
      <Button handleClick={handleBad} text={"Bad"} />
      <h2>Statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalResult={totalResult}
        positiveComente={PositiveComente}
        getAverage={getAverage()}
      />
    </div>
  );
}

export default App;

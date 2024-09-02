import { useState } from "react";

const useCounter = () => {
  const [value, setValue] = useState(0);

  const increase = () => {
    setValue(value + 1);
  };

  const decrease = () => {
    setValue(value - 1);
  };

  const zero = () => {
    setValue(0);
  };

  return { value, increase, decrease, zero };
};

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

function App() {
  const counter = useCounter();
  const left = useCounter();
  const right = useCounter();

  const name = useField("text");
  const born = useField("date");
  const height = useField("number");

  return (
    <>
      <div>{counter.value}</div>
      <button onClick={counter.increase}>plus</button>
      <button onClick={counter.decrease}>minus</button>
      <button onClick={counter.zero}>zero</button>

      <div>
        {left.value}
        <button onClick={left.increase}>Left </button>
        <button onClick={right.increase}>Right</button>
        {right.value}
      </div>

      <div>
        <form>
          name:{" "}
          <input type={name.type} value={name.value} onChange={name.onChange} />
          <br />
          birthdate:{" "}
          <input type={born.type} value={born.value} onChange={born.onChange} />
          {/* <input {...born} /> es lo mismo que esta arriba */}
          <br />
          height:{" "}
          <input
            type={height.type}
            value={height.value}
            onChange={height.onChange}
          />
        </form>
        <div>
          {name.value} {born.value} {height.value}
        </div>
      </div>
    </>
  );
}

export default App;

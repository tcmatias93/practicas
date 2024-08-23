import useVisibility from "../hooks/useVisibility";
import React from "react";

const ToggLabel = (props) => {
  const [visibility, changeVisibility] = useVisibility();

  const hideWhenVisible = { display: visibility ? "none" : "" };
  const showWhenVisible = { display: visibility ? "" : "none" };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => changeVisibility()}>New note</button>
      </div>
      <div style={showWhenVisible}>
        {React.cloneElement(props.children, { changeVisibility })}
        <button onClick={() => changeVisibility()}>Cancel</button>
      </div>
    </div>
  );
};

export default ToggLabel;

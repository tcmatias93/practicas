import { useState } from "react";

const useVisibility = () => {
  const [visibility, setVisibility] = useState(false);

  const changeVisibility = () => {
    setVisibility(!visibility);
  };

  return [visibility, changeVisibility];
};

export default useVisibility;

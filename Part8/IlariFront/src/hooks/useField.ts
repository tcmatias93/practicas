import React, { useState } from "react";

interface UseFieldReturn {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
}

export const useField = (type: string): UseFieldReturn => {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return { type, value, onChange, reset };
};

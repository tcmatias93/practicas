import { useState } from "react";

export const useFilter = <T extends number>(initialFilter: T) => {
  const [value, setValue] = useState<T>(initialFilter);

  const handleFilterChange = (newFilter: T) => {
    setValue(newFilter);
  };

  return { value, handleFilterChange };
};

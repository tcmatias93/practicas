import { useEffect, useState } from "react";
import countryService from "../service/country";

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      countryService
        .getCountry(name)
        .then((res) => {
          if (res) {
            setCountry({ data: res, found: true });
          } else {
            setCountry({ found: false });
          }
        })
        .catch(() => setCountry({ found: false }));
    }
  }, [name]);

  return country;
};

export default useCountry;

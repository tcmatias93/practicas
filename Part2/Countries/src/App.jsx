import { useEffect, useState } from "react";
import countryService from "./services/country";
import Filter from "./components/Filter";
import DataCountry from "./components/DataCountry";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showCountryList, setShowCountryList] = useState(true);

  useEffect(() => {
    countryService
      .getAllCountrey()
      .then((totalCountry) => setCountries(totalCountry));
  });

  const handleShow = (event) => {
    setShow(event.target.value);
    setSelectedCountry(null);
    setShowCountryList(true);
  };

  function filterItems(query) {
    return countries.filter(function (el) {
      return el.name.common.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  const resultCountryShow = filterItems(show);

  const searchCountry = (name) => {
    const foundCountry = countries.find(
      (country) => country.name.common === name
    );
    setSelectedCountry(foundCountry);
    setShowCountryList(false);
  };

  return (
    <>
      <Filter show={show} handleShow={handleShow} />

      {resultCountryShow.length > 10 && show.length !== 0 && (
        <p>Too many matches, specify another filter</p>
      )}
      {resultCountryShow.length > 1 &&
        resultCountryShow.length <= 10 &&
        showCountryList && (
          <CountryList
            countries={resultCountryShow}
            searchCountry={searchCountry}
          />
        )}
      {resultCountryShow.length === 1 && (
        <DataCountry country={resultCountryShow[0]} />
      )}
      {selectedCountry && <DataCountry country={selectedCountry} />}
    </>
  );
}

export default App;

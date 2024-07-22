const CountryList = ({ countries, searchCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.area}>
          {country.name.common}{" "}
          <button onClick={() => searchCountry(country.name.common)}>
            Show
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;

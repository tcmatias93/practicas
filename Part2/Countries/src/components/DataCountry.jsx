const DataCountry = ({ country }) => {
  if (!country || !country.languages) {
    return null;
  }
  const languageCountry = Object.entries(country.languages);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital} </p>
      <p>Area: {country.area} </p>

      <h2>Languages:</h2>
      <ul>
        {languageCountry.map(([key, lenguage]) => (
          <li key={key}>{lenguage}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.name.common} />
    </>
  );
};

export default DataCountry;

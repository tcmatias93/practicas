const Country = ({ country }) => {
  if (!country) {
    return null; // No se muestra nada si el país no ha sido cargado
  }

  if (!country.found) {
    return <div>not found...</div>; // Muestra un mensaje si no se encuentra el país
  }

  const { name, capital, population, flags } = country.data.data;

  return (
    <div>
      <h3>
        {name.common} ({name.official})
      </h3>
      <div>Capital: {capital[0]}</div>
      <div>Population: {population.toLocaleString()}</div>
      <img
        src={flags.png}
        height="100"
        alt={flags.alt || `Flag of ${name.common}`}
      />
    </div>
  );
};

export default Country;

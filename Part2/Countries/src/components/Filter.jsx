const Filter = ({ show, handleShow }) => {
  return (
    <div>
      Find countries: <input value={show} onChange={handleShow} />
    </div>
  );
};

export default Filter;

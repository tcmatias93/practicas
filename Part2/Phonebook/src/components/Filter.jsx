const Filter = ({ show, handleShow }) => {
  return (
    <div>
      Filter shown with: <input value={show} onChange={handleShow} />
    </div>
  );
};

export default Filter;

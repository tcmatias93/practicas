const AddPersonForm = ({
  addPerson,
  newName,
  handlePerson,
  newNumber,
  handleNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input type="text" value={newName} onChange={handlePerson} />
      </div>
      <div>
        Number: <input type="text" value={newNumber} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;

import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Result from "./components/Result";
import AddPersonForm from "./components/AddPersonForm";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [show, setShow] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const personExists = persons.some((person) => person.name == newName);

    if (personExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handlePerson = (event) => {
    setNewName(event.target.value);
  };
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleShow = (event) => {
    setShow(event.target.value);
  };

  function filterItems(query) {
    return persons.filter(function (el) {
      return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  const resultPersonShow = filterItems(show);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter show={show} handleShow={handleShow} />
      <h2>Add a new</h2>
      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        handlePerson={handlePerson}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Result resultPersonShow={resultPersonShow} />
    </div>
  );
}

export default App;

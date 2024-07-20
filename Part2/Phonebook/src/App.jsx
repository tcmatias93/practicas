import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Result from "./components/Result";
import AddPersonForm from "./components/AddPersonForm";
import peopleService from "./services/person";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [show, setShow] = useState("");
  const [messageSuccess, setMessageSuccess] = useState(null);

  useEffect(() => {
    peopleService
      .getAllPerson()
      .then((initialPerson) => setPersons(initialPerson));
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
      peopleService.createPersonPhone(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setMessageSuccess(`Added ${personObject.name}`);
        setTimeout(() => {
          setMessageSuccess(null);
        }, 3000);
      });
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

  const deletePeople = (id) => {
    peopleService
      .deletePeopleRegister(id)
      .then(setPersons(persons.filter((person) => person.id !== id)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={messageSuccess} />
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
      {resultPersonShow.map((person) => (
        <Result
          resultPersonShow={person}
          deletePeople={() => deletePeople(person.id)}
          key={person.id}
        />
      ))}
      {/* <Result resultPersonShow={resultPersonShow} deletePeople={deletePeople} /> */}
    </div>
  );
}

export default App;

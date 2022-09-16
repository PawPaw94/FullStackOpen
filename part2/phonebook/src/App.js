import { useState, useEffect } from 'react'
import Searchbar from './components/Searchbar'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import numberService from './services/Numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [searchPerson, setSearchedPerson] = useState("")


  // fetch data from server
  useEffect(() => {
    numberService
      .getAll()
      .then(phonebookNumbers => {
        setPersons(phonebookNumbers)
      })
     .catch(error => console.log("Cannot find phonebook"))
  }, [])
  


  const handleAddOrUpdate = (e) => {
    e.preventDefault()
    const foundPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
    if (foundPerson && foundPerson.number !== newNumber) {
     if (window.confirm(`${foundPerson.name}is already in the phonebook, do you want to replace the number?`)) {
      const updatedPerson = { ...foundPerson, number:newNumber }
      const id = foundPerson.id
      numberService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        alert(`${updatedPerson.name} number has been updated`)
        setNewName("")
        setNewNumber("")
      })
      .catch((err) => {
        setTimeout(() => {console.log(`${updatedPerson.name} has already been deleted from the phonebook`)},3000)
      })
    }} else if (foundPerson?.name !== newName) {
  // create new object into the array of person(foundPerson.name !== newName) {
  const newPerson = {
    name: newName,
    number: newNumber,
    id: persons.name
  }
    numberService
    .create(newPerson)
    setPersons(persons.concat(newPerson))
    setNewName("")
    setNewNumber("")
    // refresh list after adding person
    setTimeout(() => numberService
    .getAll()
    .then(phonebookNumbers => {
      setPersons(phonebookNumbers)
    }), 1000)
}}

  // delete number from list 
  const deletePerson = person => {
    if (window.confirm(`Would you like to delete ${person.name}?`)) {
      numberService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(number => number.id !== person.id))
        })
        .catch(error => {
          prompt(`${person.name} has already been deleted`)
        })
      numberService
        .getAll()
        .then(response => {
          setPersons(response)
        })
    }
  }

  // track name input change
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  // track number input change
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  // track filter input change
  const handleFilterChange = (event) => {
    setSearchedPerson(event.target.value)
  }
  const personsToShow = searchPerson === ""
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(searchPerson.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Searchbar value={searchPerson} onChange={handleFilterChange} />
      <h3> Add new</h3>
      <PersonForm onSubmit={handleAddOrUpdate}
        name={{ value: newName, onChange: handleNameChange }}
        number={{ value: newNumber, onChange: handleNumberChange }}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
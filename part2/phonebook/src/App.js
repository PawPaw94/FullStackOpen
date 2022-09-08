import { useState } from 'react'
import Searchbar from './components/Searchbar'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [searchPerson, setSearchedPerson] = useState("")

  // create new object into the array of persons
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    // check if new person is matching any previous names in the phonebook
    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already in the phonebook`)
      setNewName("")
      setNewNumber("")
      return false;
    } else {
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
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
      <PersonForm onSubmit={addPerson} 
        name={{value:newName, onChange:handleNameChange}}
        number={{value:newNumber, onChange:handleNumberChange}}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App
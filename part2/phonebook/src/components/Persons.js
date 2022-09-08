import React from 'react'
import Person from '../components/Person'

const Persons = ({personsToShow}) => {
  return (
    <div>
      <ul>
        {personsToShow.map(person =>
          <Person key={person.id} person={person} />)}
      </ul>
    </div>
  )
}

export default Persons
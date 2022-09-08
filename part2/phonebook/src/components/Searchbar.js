import React from 'react'

const Searchbar = ({searchPerson, onChange}) => {
    
  return (
    <div> Search phonebook: <input value={searchPerson} onChange={onChange}/></div>
  )
}

export default Searchbar
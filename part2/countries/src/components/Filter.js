import React from 'react'

const Filter = ({query,setQuery}) => {
  const searchedCountry = (event) => {
    setQuery(event.target.value)
  }
 
  return (
    <div>
    <p>Find countries: <input value={query} onChange={searchedCountry}/></p>
  </div>
  )
}

export default Filter
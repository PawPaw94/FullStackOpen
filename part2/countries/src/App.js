import { useState, useEffect } from 'react'
import axios from "axios"
import Filter from './components/Filter'
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState("")
  const [query, setQuery] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all?fields=name,capital,area,languages,flags")
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  const handleDataChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <Filter query={query} setQuery={setQuery} />
      <CountryList countries={countries} query={query} handleDataChange={handleDataChange}/>
    </div>
  );
}

export default App;

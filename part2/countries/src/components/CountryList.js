import React from 'react'
import Country from '../components/Country';


const CountryList = ({ countries, handleDataChange, query }) => {
    const countryList = Object.values(countries).filter(country =>
        country.name.common.toLowerCase().includes(query.toLowerCase()))

    if (countryList.length === 250) {
        return <div />
    }
    if (countryList.length >= 10) {
        return <div> Too many matches, specify further search</div>
    }
    if (countryList.length > 1) {
        return countryList.map(country => (
            <div key={country.name.official}>
                <p>{country.name.common} <button value={country.name.common} onClick={handleDataChange}>Show </button></p>

            </div>
        ))
    } else {
        return (
            <div>
                <Country country={countryList[0]} />
            </div>
        )
    }
}
export default CountryList
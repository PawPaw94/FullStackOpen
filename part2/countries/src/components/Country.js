import React from 'react'
import Forecast from '../components/Forecast'

const Country = ({ country }) => {
    return (
        <div>
            <h3>{country?.name?.common}</h3>
            <p> {country?.capital}</p>
            <p> {country?.area}</p>
            <h4>Languages!</h4>
            {(typeof country?.languages != "undefined") ? (
                <ul>
                {Object.values(country.languages).map(language => (
                            <li key={language.name}>{language}</li> 
                            ))}</ul>
                        ) : (
          <div> </div>
        )}
        {(typeof country?.flags?.png != "undefined") ? (
            <img src={country?.flags?.png}
                            alt={`Flag of ${country.name}`} />
                        ) : (
          <div> </div>
        )}
        {(typeof country?.capital != "undefined") ? (
            <Forecast capital={country.capital} />
                        ) : (
          <div> </div>
        )}
        
        </div>
    )
}

export default Country
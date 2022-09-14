import React, { useEffect, useState } from 'react'
import axios from "axios"

const Forecast = ({capital}) => {
    
    const [weather, setWeather] = useState("")
    const [weatherIcon, setWeatherIcon] = useState("")

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios 
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
        .then(res => {
            setWeather(res.data)
            setWeatherIcon(res.data.weather[0]?.icon)
        })
    }, [capital])

  return (
    <div>
        <h3>Weather in {capital}</h3>
        <p> Temperature is: {weather?.main?.temp.toFixed(1)}</p>
        <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt={`Weather icon for ${capital}`}></img>
        <p> Wind: {weather.wind?.speed.toFixed(1)} m/s</p>
    </div>
  )
}

export default Forecast
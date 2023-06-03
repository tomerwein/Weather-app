import './App.css';
import React, { useState, useEffect } from 'react';
// import Search from './components/search_city';
import './styles/styles.css';
import axios from 'axios';
import WeatherIcon from './components/WeatherIcon';
import FiveDaysForecast from './components/FiveDaysForcast';


function App() {
  const [inputUpdated, setInputUpdated] = useState('');
  
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [currentWeatherInC, setCurrentWeatherInC] = useState('');
  const [hasPrecipitation, setHasPrecipitation] = useState(false);
  const [weatherType, setWeatherType] = useState('');
  const [weatherIcon, setWeatherIcon] = useState(0);
  const [IsDayTime, setIsDayTime] = useState(true);
  const [fifeDaysForcast, setFifeDaysForcast] = useState([]);

  const iconSize = "big-icon";

  const handleChangeInInput = (e) => {
    setInputUpdated(e.target.value);
  }

  const getFifeDaysForecast = async (data) => {
    axios.get
    (`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data.Key}?apikey=tIxyBRM1zTcG281Ca77Su32ooLntrCjB`)
    .then((res) => {
      setFifeDaysForcast(res.data.DailyForecasts);
      console.log(res.data.DailyForecasts);
    })
  }


  const updateAllWeatherData = async (data) => {
    setCountry(data.Country.EnglishName);
    setCity(data.EnglishName);
    axios.get
    (`http://dataservice.accuweather.com/currentconditions/v1/${data.Key}?apikey=tIxyBRM1zTcG281Ca77Su32ooLntrCjB`)
    .then((res) => {
     
     setCurrentWeatherInC(res.data[0].Temperature.Metric.Value);
     setHasPrecipitation(res.data[0].HasPrecipitation);
     setWeatherType(res.data[0].WeatherText);
     setWeatherIcon(res.data[0].WeatherIcon);
     setIsDayTime(res.data[0].IsDayTime);
   })
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    axios.get
     (`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=tIxyBRM1zTcG281Ca77Su32ooLntrCjB&q=${inputUpdated}`)
     .then((res) => {
      updateAllWeatherData(res.data[0]);
      getFifeDaysForecast(res.data[0]);

      console.log(res.data[0]);
    })
  }


  return (
    <div className="App">
      <h1 className='title'>Tomer's Weather App</h1>    
      
      <form onSubmit={handleSubmit}>
        <input 
          className='city-search'
          type='text' 
          placeholder='Search for city' 
          onChange={handleChangeInInput}
        />
      </form>

      <div className='weather_container'>
          
          <h3 className="city-country">
            {city+','}  {country}
          </h3>

          <h2 className='temperature'>
            {currentWeatherInC + '°C'}
          </h2>

          <WeatherIcon weatherIcon={weatherIcon} iconSize={iconSize}/>
          
          <h3 className='weather-type'>
            {'Status: ' + weatherType}
          </h3>

      </div>

      <FiveDaysForecast fifeDaysForcast={fifeDaysForcast}/>        

    </div>
  )
}

export default App;


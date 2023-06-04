import './App.css';
import React, { useState, useEffect } from 'react';
// import Search from './components/search_city';
import './styles/styles.css';
import axios from 'axios';
import WeatherIcon from './components/WeatherIcon';
import FiveDaysForecast from './components/FiveDaysForcast';


function App() {
  const [favoriteButtonPressed, setFavoriteButtonPressed] = useState(false);

  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);


  const [inputUpdated, setInputUpdated] = useState('');
  
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [currentWeatherInC, setCurrentWeatherInC] = useState('');
  const [hasPrecipitation, setHasPrecipitation] = useState(false);
  const [weatherType, setWeatherType] = useState('');
  const [weatherIcon, setWeatherIcon] = useState(0);
  const [forcastDate, setForcastDate] = useState('');
  const [forcastDayOftheWeek, setForcastDayOftheWeek] = useState('');

  const [forcastLastTimeUpdated, setForcastLastTimeUpdated] = useState('');
  const [fifeDaysForcast, setFifeDaysForcast] = useState([]);

  const iconSize = "big-icon";

  const addToFavorites = (day) => {
    const newFavorites = [...favorites, day];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
};

  const handleChangeInInput = (e) => {
    setInputUpdated(e.target.value);
  }

  const getFifeDaysForecast = async (data) => {
    axios.get
    (`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data.Key}?apikey=djJLKsXGe9zUAirK2eDA3ivGhy1p4Mc3`)
    .then((res) => {
      setFifeDaysForcast(res.data.DailyForecasts);
    })
  }


  const updateAllWeatherData = async (data) => {
    setCountry(data.Country.EnglishName);
    setCity(data.EnglishName);
    axios.get
    (`http://dataservice.accuweather.com/currentconditions/v1/${data.Key}?apikey=djJLKsXGe9zUAirK2eDA3ivGhy1p4Mc3`)
    .then((res) => {
    
      console.log(res.data[0]);

     setCurrentWeatherInC(res.data[0].Temperature.Metric.Value);
     setForcastDate(res.data[0].LocalObservationDateTime.substring(5, 10));
     setForcastLastTimeUpdated(res.data[0].LocalObservationDateTime.substring(11, 16));
     setHasPrecipitation(res.data[0].HasPrecipitation);
     setWeatherType(res.data[0].WeatherText);
     setWeatherIcon(res.data[0].WeatherIcon);
     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

     const date = new Date();
    const dayOfTheWeek = daysOfWeek[date.getDay()];
    console.log(dayOfTheWeek);
     setForcastDayOftheWeek(dayOfTheWeek);
   })
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    axios.get
     (`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=djJLKsXGe9zUAirK2eDA3ivGhy1p4Mc3&q=${inputUpdated}`)
     .then((res) => {
      updateAllWeatherData(res.data[0]);
      getFifeDaysForecast(res.data[0]);

    })
  }


  return (
    <div className="App">
      <h1 className='title'>Tomer's Weather App</h1>    
      
      <div className='search_city_container'>
        <form onSubmit={handleSubmit}>
          <input 
            className='city-search'
            type='text' 
            placeholder='Search for city' 
            onChange={handleChangeInInput}
          />
        </form>

        <button onClick={() => addToFavorites(city)}>Add to Favorites</button>

      </div>

      <div className='weather_container'>
          
          <h3 className="city-country">
            {city+','}  {country}
          </h3>

          <h3 className="date-day-of-the-week">
            {forcastDayOftheWeek + ', ' + forcastDate}  
          </h3>

          <h3 className="time">
            {forcastLastTimeUpdated}
          </h3>

          <WeatherIcon weatherIcon={weatherIcon} iconSize={iconSize}/>

          <h2 className='temperature'>
            {currentWeatherInC + '°C'}
          </h2>
          
          <h3 className='weather-type'>
            {'Status: ' + weatherType}
          </h3>

      </div>

      <FiveDaysForecast fifeDaysForcast={fifeDaysForcast}/>        

    </div>
  )
}

export default App;


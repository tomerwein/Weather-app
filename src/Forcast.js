import './App.css';
import React, { useState, useEffect } from 'react';

import './styles/styles.css';
import axios from 'axios';
import WeatherIcon from './components/WeatherIcon';
import FiveDaysForecast from './components/FiveDaysForcast';
import FavoriteCities from './components/FavoriteCitys';
import CreateWeatherForcast from './components/CreateWeatherForcast';


const Forcast = () =>  {
  const [hasWatchFavoritesPressed, setHasWatchFavoritesPressed] = useState(false);
  const [addingToFavoriteMessage, setAddingToFavoriteMessage] = useState(false);
  
  const [shouldUseDefaultWeatherLocation, setShouldUseDefaultWeatherLocation] = useState(true);




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
  const [fiveDaysForcast, setFiveDaysForcast] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const localData = localStorage.getItem('favorites');
    return localData ? JSON.parse(localData) : [];
  });  

  const iconSize = "big-icon";

  useEffect(() => {
    handleChangeToDefaultWeatherLocation();
  }, []);
  
  const handleChangeInInput = (e) => {
    setInputUpdated(e.target.value);
  }

  const handleChangeToDefaultWeatherLocation = () => {
    setInputUpdated("bnei brak");
    if (shouldUseDefaultWeatherLocation) { 
      setShouldUseDefaultWeatherLocation(false)
    };
    handleSubmit();
  }

  const getFifeDaysForecast = async (data) => {
    axios.get
    (`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data.Key}?apikey=9mJAAmzlyJwDPxBVEbOBr2zKPaPq9HFP`)
    .then((res) => {
      setFiveDaysForcast(res.data.DailyForecasts);
    })
  }


  const updateAllWeatherData = async (data) => {
    setCountry(data.Country.EnglishName);
    setCity(data.EnglishName);
    axios.get
    (`http://dataservice.accuweather.com/currentconditions/v1/${data.Key}?apikey=9mJAAmzlyJwDPxBVEbOBr2zKPaPq9HFP`)
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
    if (e) e.preventDefault(); 
    axios.get
     (`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=9mJAAmzlyJwDPxBVEbOBr2zKPaPq9HFP&q=${inputUpdated}`)
     .then((res) => {
      updateAllWeatherData(res.data[0]);
      getFifeDaysForecast(res.data[0]);

    })
  }

  return (
    hasWatchFavoritesPressed ? <FavoriteCities favorites={favorites}/> :
    shouldUseDefaultWeatherLocation ? 
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

  </div>    

      <CreateWeatherForcast 
        city={city} 
        country={country} 
        forcastDayOftheWeek={forcastDayOftheWeek}
        forcastDate={forcastDate}
        forcastLastTimeUpdated={forcastLastTimeUpdated}
        weatherIcon={weatherIcon}
        iconSize={iconSize}
        currentWeatherInC={currentWeatherInC}
        weatherType={weatherType}
        favorites={favorites}
        setFavorites={setFavorites}
        setAddingToFavoriteMessage={setAddingToFavoriteMessage}
        setHasWatchFavoritesPressed={setHasWatchFavoritesPressed}
        fiveDaysForcast={fiveDaysForcast} 
      />
    </div>
  : <div className="App">
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

  </div>


  <CreateWeatherForcast 
    city={city} 
    country={country} 
    forcastDayOftheWeek={forcastDayOftheWeek}
    forcastDate={forcastDate}
    forcastLastTimeUpdated={forcastLastTimeUpdated}
    weatherIcon={weatherIcon}
    iconSize={iconSize}
    currentWeatherInC={currentWeatherInC}
    weatherType={weatherType}
    favorites={favorites}
    setFavorites={setFavorites}
    setAddingToFavoriteMessage={setAddingToFavoriteMessage}
    setHasWatchFavoritesPressed={setHasWatchFavoritesPressed}
    fiveDaysForcast={fiveDaysForcast} 
  />
</div>
  ) 
}

export default Forcast;


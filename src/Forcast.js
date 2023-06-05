import './App.css';
import React, { useState, useEffect } from 'react';

import './styles/styles.css';
import axios from 'axios';
import WeatherIcon from './components/WeatherIcon';
import FiveDaysForecast from './components/FiveDaysForcast';
import FavoriteCities from './components/FavoriteCitys';
import CreateWeatherForcast from './components/CreateWeatherForcast';

import { getForcastForEachOfTheNextFiveDays, getCityKey, getAllCurrentWeatherData } from './API/AccuWeatherApiCalls';



const Forcast = ({inputUpdated, setInputUpdated}) =>  {
  const [hasWatchFavoritesPressed, setHasWatchFavoritesPressed] = useState(false);
  const [addingToFavoriteMessage, setAddingToFavoriteMessage] = useState(false);
  
  const [currentCityKey, setCurrentCityKey] = useState('');
  
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
  
  const isEnglish = (text) => {
    return /^[A-Za-z ]*$/.test(text);
  }

  const handleChangeInInput = (e) => {
    if (isEnglish(e.target.value)) {
      setInputUpdated(e.target.value);
    }
    else {
      alert("Please enter only english letters");
    }
  }

  const handleChangeToDefaultWeatherLocation = () => {
    setInputUpdated("tel aviv");
    handleSubmit();
  }

  const getFiveDaysForecast = async (data) => {
    getForcastForEachOfTheNextFiveDays(data)
    .then((res) => {
      setFiveDaysForcast(res);
    })
  }


  const updateAllWeatherData = async (data) => {
    setCountry(data.Country.EnglishName);
    setCity(data.EnglishName);
    getAllCurrentWeatherData(data)
    .then((currentWeatherData) => {
     setCurrentWeatherInC(currentWeatherData.Temperature.Metric.Value);
     setForcastDate(currentWeatherData.LocalObservationDateTime.substring(5, 10));
     setForcastLastTimeUpdated(currentWeatherData.LocalObservationDateTime.substring(11, 16));
     setHasPrecipitation(currentWeatherData.HasPrecipitation);
     setWeatherType(currentWeatherData.WeatherText);
     setWeatherIcon(currentWeatherData.WeatherIcon);
     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

     const date = new Date();
    const dayOfTheWeek = daysOfWeek[date.getDay()];
     setForcastDayOftheWeek(dayOfTheWeek);
   })
  }

  const handleSubmit = (e) => {
    if (e) e.preventDefault(); 
    getCityKey(inputUpdated).then(cityKey => {
      setCurrentCityKey(cityKey);
      updateAllWeatherData(cityKey);
      getFiveDaysForecast(cityKey);
    });

  }

  return (
    hasWatchFavoritesPressed ? <FavoriteCities favorites={favorites}/> : 
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
        currentCityKey={currentCityKey}
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


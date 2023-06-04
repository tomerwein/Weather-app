import './App.css';
import React, { useState, useEffect } from 'react';

import './styles/styles.css';
import axios from 'axios';
import WeatherIcon from './components/WeatherIcon';
import FiveDaysForecast from './components/FiveDaysForcast';
import FavoriteCities from './components/FavoriteCitys';
import CreateWeatherForcast from './components/CreateWeatherForcast';


const Forcast = ({inputUpdated, setInputUpdated}) =>  {
  const [hasWatchFavoritesPressed, setHasWatchFavoritesPressed] = useState(false);
  const [addingToFavoriteMessage, setAddingToFavoriteMessage] = useState(false);
  
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
    axios.get
    (`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data.Key}?apikey=B23jFZIqsDsBHRoeGJH6G8GgvYahGRgV`)
    .then((res) => {
      setFiveDaysForcast(res.data.DailyForecasts);
    })
  }


  const updateAllWeatherData = async (data) => {
    setCountry(data.Country.EnglishName);
    setCity(data.EnglishName);
    axios.get
    (`http://dataservice.accuweather.com/currentconditions/v1/${data.Key}?apikey=B23jFZIqsDsBHRoeGJH6G8GgvYahGRgV`)
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
     (`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=B23jFZIqsDsBHRoeGJH6G8GgvYahGRgV&q=${inputUpdated}`)
     .then((res) => {
      if (res.data.length === 0) {
        alert('Please enter a valid city name');
        return;
      }

      updateAllWeatherData(res.data[0]);
      getFiveDaysForecast(res.data[0]);

    }).catch((err) => {});
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


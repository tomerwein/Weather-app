import './App.css';
import React, { useState, useEffect } from 'react';
import './styles/styles.css';
import FavoriteCities from './components/FavoriteCitys';
import CreateWeatherForcast from './components/CreateWeatherForcast';
import Select from 'react-select';
import { getForcastForEachOfTheNextFiveDays, getCityKey,
  getAutocompleteOptions, getAllCurrentWeatherData } from './API/AccuWeatherApiCalls';



const Forcast = ({inputUpdated, setInputUpdated}) =>  {
  const [hasWatchFavoritesPressed, setHasWatchFavoritesPressed] = useState(false);
  
  const [currentCityKey, setCurrentCityKey] = useState('');
  
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const [currentWeatherInC, setCurrentWeatherInC] = useState('');
  const [weatherType, setWeatherType] = useState('');
  const [weatherIcon, setWeatherIcon] = useState(0);
  const [forcastDate, setForcastDate] = useState('');
  const [forcastDayOftheWeek, setForcastDayOftheWeek] = useState('');

  const [forcastLastTimeUpdated, setForcastLastTimeUpdated] = useState('');
  const [fiveDaysForcast, setFiveDaysForcast] = useState([]);

  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  
  useEffect(() => {
    handleChangeToDefaultWeatherLocation();
  }, []);

  const isEnglish = (text) => {
    return /^[A-Za-z ]*$/.test(text);
  }

  const [favorites, setFavorites] = useState(() => {
    const localData = localStorage.getItem('favorites');
    return localData ? JSON.parse(localData) : [];
  });  

  const iconSize = "big-icon";

  const options = autoCompleteOptions.map(option => ({
    value: option.LocalizedName,
    label: option.LocalizedName
  }));
  
  const handleAutoCompletion = async (value) => {
    if(value.length > 2) { 
      getAutocompleteOptions(value).then(data => {
        setAutoCompleteOptions(data);
       }) ;
    } else {
      setAutoCompleteOptions([]);
    }
  }

  const handleChangeInInput = (value) => {
    if (isEnglish(value)) {
      setInputUpdated(value);
      handleAutoCompletion(value);
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

  const updateDayOfTheWeek = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date();
    const dayOfTheWeek = daysOfWeek[date.getDay()];
    setForcastDayOftheWeek(dayOfTheWeek);
  }

  const updateAllWeatherData = async (data) => {
    setCountry(data.Country.EnglishName);
    setCity(data.EnglishName);

    getAllCurrentWeatherData(data)
    .then((currentWeatherData) => {
     setCurrentWeatherInC(currentWeatherData.Temperature.Metric.Value);
     setForcastDate(currentWeatherData.LocalObservationDateTime.substring(5, 10));
     setForcastLastTimeUpdated(currentWeatherData.LocalObservationDateTime.substring(11, 16));
     setWeatherType(currentWeatherData.WeatherText);
     setWeatherIcon(currentWeatherData.WeatherIcon);

     updateDayOfTheWeek();
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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      direction: 'ltr',
      cursor: 'pointer', 
    }),
    option: (provided, state) => ({
      ...provided,
      direction: 'rtl',  
    }),
  };

  return (
    hasWatchFavoritesPressed ? <FavoriteCities favorites={favorites}/> : 
    <div className="App">
      <div className='title'>
        <span>Tomer's Weather App</span>
      </div>
      <div className='search_city_container'>
        <form onSubmit={handleSubmit}>
          <Select 
            className='city-search'
            styles={customStyles}
            options={options}
            placeholder='Search for city'
            onInputChange={(value) => value && handleChangeInInput(value)}
            onChange={(selectedOption) => selectedOption && setInputUpdated(selectedOption.value)}
          />

        </form>

        <button 
          className='show-forcast-button'
          type="button"
          onClick={handleSubmit}>
          Show 
        </button>
        

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
        setHasWatchFavoritesPressed={setHasWatchFavoritesPressed}
        fiveDaysForcast={fiveDaysForcast} 
      />
    </div> 
  ) 
}

export default Forcast;


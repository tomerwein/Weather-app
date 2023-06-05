import React, { useState, useEffect } from 'react';
import Forcast from '../Forcast';
import {getAllCurrentWeatherData } from './../API/AccuWeatherApiCalls';
import WeatherIcon from './WeatherIcon';

const iconSize = "small-icon";


const FavoriteCities = ({favorites}) => {

    const [backToSearch, setBackToSearch] = useState(false);
    const [inputUpdated, setInputUpdated] = useState('tel aviv');
    const [cityWeatherData, setCityWeatherData] = useState({});

    useEffect(() => {
        const fetchCityWeatherData = async () => {
            let cityData = {};
            for (let city of favorites) {
                const currentWeatherData = await getAllCurrentWeatherData(city.key);
                cityData[city.name] = currentWeatherData;
            }
            setCityWeatherData(cityData);
        }
        
        fetchCityWeatherData();
    }, []);


    return (
        backToSearch ? <Forcast
        inputUpdated={inputUpdated}
        setInputUpdated={setInputUpdated}
        />: 
        <div className='background'>
            <h2>Favorite Cities</h2>

            <div className="favorite-cities">

            {favorites.length > 0 ? favorites.map((city, index) => (
            <button 
                key={index}
                className="cityButton"
                onClick={() => {
                    setInputUpdated(city.name);
                    setBackToSearch(true);
                    }
                }
            > 
                <div className="cityName">
                    {city.name}
                </div>
                <div className="cityWeatherText">
                    {cityWeatherData[city.name] && cityWeatherData[city.name].WeatherText}
                </div>
                <div className="cityWeatherIcon">
                    {cityWeatherData[city.name] && <WeatherIcon 
                    weatherIcon={cityWeatherData[city.name].WeatherIcon}
                    iconSize={iconSize}
                />}

                </div>
                <div className="cityTemperature">
                    {cityWeatherData[city.name] && cityWeatherData[city.name].Temperature.Metric.Value + '°C'}
                </div>
            </button>
               
                )     
            ) : (
                <p>No favorite cities yet.</p>
            )}

            </div>


            <button 
                className='favorites-button'
                onClick={() => setBackToSearch(true)}>
                Back to search
            </button>            
        </div>
    );
};

export default FavoriteCities;
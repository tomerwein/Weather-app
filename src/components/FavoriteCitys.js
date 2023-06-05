import React, { useState, useEffect } from 'react';
import Forcast from '../Forcast';
import {getAllCurrentWeatherData } from './../API/AccuWeatherApiCalls';


const FavoriteCities = ({favorites}) => {

    const [favoriteCities, setFavoriteCities] = useState([]);
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
    }, [favorites]);


    return (
        backToSearch ? <Forcast
        inputUpdated={inputUpdated}
        setInputUpdated={setInputUpdated}
        />: 
        <div className='background'>
        <div className='favorite-container'>
            <h2>Favorite Cities</h2>

            {favorites.length > 0 ? favorites.map((city, index) => (
                <button 
                    key={index}
                    onClick={() => {
                        setInputUpdated(city.name);
                        setBackToSearch(true);
                        }
                    }
                > 
                
                {city.name}
                {cityWeatherData[city.name] && cityWeatherData[city.name].WeatherText}
                {cityWeatherData[city.name] && cityWeatherData[city.name].WeatherIcon}
                {cityWeatherData[city.name] && cityWeatherData[city.name].Temperature.Metric.Value}
                </button> 
                
                )
                
            ) : (
                <p>No favorite cities yet.</p>
            )}

            <button 
                className='favorites-button'
                onClick={() => setBackToSearch(true)}>
                Back to search
            </button>            
        </div>
        </div>
    );
};

export default FavoriteCities;
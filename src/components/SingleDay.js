import React, { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';


const SingleDay = ({ dayParameters }) => {
    const date = dayParameters.Date.substring(5, 10);
    const minTemp = fahrenheitToCelsius(dayParameters.Temperature.Minimum.Value).toFixed(0);
    const maxTemp = fahrenheitToCelsius(dayParameters.Temperature.Maximum.Value).toFixed(0);
    const weatherIcon = dayParameters.Day.Icon;

    const iconSize = "small-icon";

    function fahrenheitToCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
      }

    console.log(dayParameters);
    return (
        <div className='single_day_forcast_container'>
          
          <span className='forcast_date'>
            {date}
          </span>

          <span className='five_days_icon'>
            <WeatherIcon weatherIcon={weatherIcon} iconSize={iconSize}/>
          </span>
          
          <span className='min_max_temp'>
            {minTemp + '°C' + ' - ' + maxTemp + '°C'}
          </span>

        </div>
      )
};

export default SingleDay;
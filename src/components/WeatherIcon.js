import React from 'react';
import clearDay from './../images/clear-day.svg';
import clearNight from './../images/clear-night.svg';
import cloudyDay from './../images/cloudy-day-1.svg';
import fullyCloudy from './../images/cloudy-original.svg';

const WeatherIcon = ({ weatherIcon, iconSize }) => {
    if (weatherIcon === 1 || weatherIcon === 2 || weatherIcon === 3) {
        return <img className={iconSize} src={clearDay} alt="clear-day"/>;
    } else if (weatherIcon === 4 || weatherIcon === 5 || weatherIcon === 6) {
        return <img className={iconSize} src={cloudyDay} alt="cloudy-day"/>;
    } else if (weatherIcon === 7 || weatherIcon === 8 || weatherIcon === 11) {
        return <img className={iconSize} src={cloudyDay} alt="cloudy-day"/>;
    } else if (weatherIcon === 33 || weatherIcon === 34 || weatherIcon === 35) {
        return <img className={iconSize} src={clearNight} alt="clear-night"/>;
    } else {
        return null;
    }
};

export default WeatherIcon;
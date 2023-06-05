import React from 'react';
import clearDay from './../images/icons/clear-day.svg';
import clearNight from './../images/icons/clear-night.svg';
import cloudyDay from './../images/icons/cloudy-day-1.svg';
import cloudyNight from './../images/icons/cloudy-night-1.svg';
import fullyCloudy from './../images/icons/cloudy-original.svg';
import thunderStorm from './../images/icons/thunder-storm.svg'; 
import rainyDay from './../images/icons/rainy-1-day.svg';
import rainyNight from './../images/icons/rainy-1-night.svg';
import snowy from './../images/icons/snowy.svg';

const WeatherIcon = ({ weatherIcon, iconSize }) => {
    if (weatherIcon === 1 || weatherIcon === 2 || weatherIcon === 3) {
        return <img className={iconSize} src={clearDay} alt="clear-day"/>;
    } else if (weatherIcon === 4 || weatherIcon === 5 || weatherIcon === 6) {
        return <img className={iconSize} src={cloudyDay} alt="cloudy-day"/>;
    } else if (weatherIcon === 7 || weatherIcon === 8 || weatherIcon === 11) {
        return <img className={iconSize} src={fullyCloudy} alt="fully-cloudy-day"/>;
    } else if (weatherIcon === 12 || weatherIcon === 13 || weatherIcon === 14) {
        return <img className={iconSize} src={rainyDay} alt="rainy-day"/>;
    } else if (weatherIcon === 15 || weatherIcon === 16 || weatherIcon === 17) {
        return <img className={iconSize} src={thunderStorm} alt="thunder-day"/>;
    } else if (weatherIcon === 18 || weatherIcon === 39 || weatherIcon === 40) {
        return <img className={iconSize} src={rainyNight} alt="rainy-night"/>;
    } else if (weatherIcon === 22 || weatherIcon === 23 || weatherIcon === 24) {
        return <img className={iconSize} src={snowy} alt="snowy"/>;
    } else if (weatherIcon === 33 || weatherIcon === 34 || weatherIcon === 35) {
        return <img className={iconSize} src={clearNight} alt="clear-night"/>;
    } else if (weatherIcon === 36 || weatherIcon === 37 || weatherIcon === 38) {
        return <img className={iconSize} src={cloudyNight} alt="cloudy-night"/>;
    } else if (weatherIcon === 39 || weatherIcon === 40 || weatherIcon === 44) {
        return <img className={iconSize} src={rainyNight} alt="cloudy-night"/>;
    } else if (weatherIcon === 41 || weatherIcon === 42 || weatherIcon === 43) {
        return <img className={iconSize} src={thunderStorm} alt="night-thunder-storm"/>;
    } else {
        return null;
    }
};

export default WeatherIcon;
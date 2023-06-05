import React from 'react';
import clearDay from './../images/clear-day.svg';
import clearNight from './../images/clear-night.svg';
import cloudyDay from './../images/cloudy-day-1.svg';
import cloudyNight from './../images/cloudy-night-1.svg';
import fullyCloudy from './../images/cloudy-original.svg';
import thunderStorm from './../images/thunder-storm.svg'; 
import rainyDay from './../images/rainy-1-day.svg';
import rainyNight from './../images/rainy-1-night.svg';
import snowy from './../images/snowy.svg';



// import rainy from './../images/rainy-1-day.svg';

const WeatherIcon = ({ weatherIcon, iconSize }) => {
    // const clearDaySvg = `<?xml version="1.0"?>
    // <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
    //  <style>
    //   <![CDATA[#esic8yxwm7h2_to {animation: esic8yxwm7h2_to__to 6000ms linear infinite normal forwards}@keyframes esic8yxwm7h2_to__to { 0% {transform: translate(0px,0px)} 50% {transform: translate(40.000000px,40.000000px)} 100% {transform: translate(0px,0px)} }#esic8yxwm7h2_ts {animation: esic8yxwm7h2_ts__ts 6000ms linear infinite normal forwards}@keyframes esic8yxwm7h2_ts__ts { 0% {transform: scale(1,1)} 50% {transform: scale(0.900000,0.900000)} 100% {transform: scale(1,1)} }]]>
    //  </style>
    //  <g class="layer">
    //   <title>Layer 1</title>
    //   <g id="esic8yxwm7h2_to" transform="translate(0,0)">
    //    <g id="esic8yxwm7h2_ts" transform="scale(1,1)">
    //     <circle fill="orange" id="esic8yxwm7h2" r="224" transform="translate(400,400)"/>
    //    </g>
    //   </g>
    //  </g>
    // </svg>`;

    if (weatherIcon === 1 || weatherIcon === 2 || weatherIcon === 3) {
        return <img className={iconSize} src={clearDay} alt="clear-day"/>;

    //     return <div className={`svg-wrapper ${iconSize}`} dangerouslySetInnerHTML={{ __html: clearDaySvg }} />


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
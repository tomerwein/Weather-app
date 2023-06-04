import './App.css';
import React, { useState, useEffect } from 'react';

import './styles/styles.css';
import axios from 'axios';
import WeatherIcon from './components/WeatherIcon';
import FiveDaysForecast from './components/FiveDaysForcast';
import FavoriteCities from './components/FavoriteCitys';
import Forcast from './Forcast';



function App() {
  return (
      <Forcast/>
  );
};

export default App;


import './App.css';
import React, { useState, useEffect } from 'react';

import './styles/styles.css';
import Forcast from './Forcast';



function App() {
  const [shouldUseDefaultWeatherLocation, setShouldUseDefaultWeatherLocation] = useState(true);

  return (
      <Forcast 
      shouldUseDefaultWeatherLocation={shouldUseDefaultWeatherLocation}
      setShouldUseDefaultWeatherLocation={setShouldUseDefaultWeatherLocation}/>
  );
};

export default App;


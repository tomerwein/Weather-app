import './App.css';
import React, { useState, useEffect } from 'react';

import './styles/styles.css';
import Forcast from './Forcast';



function App() {
  const [inputUpdated, setInputUpdated] = useState('tel aviv');

  return (
      <Forcast 
      inputUpdated={inputUpdated}
      setInputUpdated={setInputUpdated}/>
  );
};

export default App;


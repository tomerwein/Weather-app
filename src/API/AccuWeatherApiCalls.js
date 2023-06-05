

import './../styles/styles.css';
import axios from 'axios';


const accuWeatherKey = "nlPjkePaXHpdohnZNAFf9dFc1nyGgiI9";
/* If it would be in production I would put it in .env file */ 

const getForcastForEachOfTheNextFiveDays = async (data) => {
    return axios.get
    (`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data.Key}?apikey=${accuWeatherKey}`)
    .then((res) => {
        return res.data.DailyForecasts;
        
    })
    .catch((err) => {
      console.error(err);
      alert('You exceeded the number of requests allowed per day, please try again later');
      return;
    })
  }


  const getAllCurrentWeatherData = async (data) => {

    return axios.get
    (`http://dataservice.accuweather.com/currentconditions/v1/${data.Key}?apikey=${accuWeatherKey}`)
    .then((res) => {
      return res.data[0];

   })
   .catch((err) => {
    console.error(err);
    alert('You exceeded the number of requests allowed per day, please try again later');
    return;
  })
  }

  const getCityKey = async (inputUpdated) => { 
    return axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${accuWeatherKey}&q=${inputUpdated}`)
      .then((res) => {
        if (res.data.length === 0) {
          alert('Please enter a valid city name');
          return;
        }
        return res.data[0];
      })
      .catch((err) => {
        console.error(err);
        alert('You exceeded the number of requests allowed per day, please try again later');
        return;
      });
  }

  const getAutocompleteOptions = async (query) => {
    return axios
      .get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${accuWeatherKey}&q=${query}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(err);
        alert('You exceeded the number of requests allowed per day, please try again later');
        return;
      });
  }

  export { getForcastForEachOfTheNextFiveDays, getAllCurrentWeatherData,
     getCityKey, getAutocompleteOptions };
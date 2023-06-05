

import './../styles/styles.css';
import axios from 'axios';


const accuWeatherKey = "4GsG9npuAQpROAK7aoSj5ZfDVc8CiEFY";
/* If it would be in production I would put it in .env file */ 

const getForcastForEachOfTheNextFiveDays = async (data) => {
    return axios.get
    (`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${data.Key}?apikey=${accuWeatherKey}`)
    .then((res) => {

        return res.data.DailyForecasts;
        
    })
    .catch((err) => {
      console.error(err);
      throw err;  })
  }


  const getAllCurrentWeatherData = async (data) => {
    return axios.get
    (`http://dataservice.accuweather.com/currentconditions/v1/${data.Key}?apikey=${accuWeatherKey}`)
    .then((res) => {
      console.log("check222");
      console.log(res.data[0]);
      console.log("check2222");
      return res.data[0];

   })
   .catch((err) => {
    console.error(err);
    throw err;  })
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
        throw err;  
      });
  }

  export { getForcastForEachOfTheNextFiveDays, getAllCurrentWeatherData, getCityKey };
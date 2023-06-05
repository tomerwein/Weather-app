import WeatherIcon from './WeatherIcon';


const SingleDay = ({ dayParameters, daysAdditionToCurrentDay }) => {
    const date = dayParameters.Date.substring(5, 10);
    const minTemp = fahrenheitToCelsius(dayParameters.Temperature.Minimum.Value).toFixed(0);
    const maxTemp = fahrenheitToCelsius(dayParameters.Temperature.Maximum.Value).toFixed(0);
    const weatherIcon = dayParameters.Day.Icon;
    
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date();
    const dayOfTheWeek = daysOfWeek[(currentDate.getDay() + daysAdditionToCurrentDay) % 7];

    const iconSize = "small-icon";

    function fahrenheitToCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
      }

    return (
        <div className='single_day_forcast_container'>
          
          <span className='forcast_date'>
            {date}
          </span>

          <span className='forcast_day_of_the_week'>
            {dayOfTheWeek}
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
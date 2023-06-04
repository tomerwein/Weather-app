import WeatherIcon from "./WeatherIcon"
import FiveDaysForecast from "./FiveDaysForcast";

const CreateWeatherForcast = (
    {city, country, forcastDayOftheWeek, 
    forcastDate, forcastLastTimeUpdated,
    weatherIcon, iconSize, currentWeatherInC,
    weatherType, favorites, setFavorites,
    setAddingToFavoriteMessage, setHasWatchFavoritesPressed,
    fiveDaysForcast}) =>  {

        const addToFavorites = (city) => {
            if (!favorites.some(favoriteCity => favoriteCity === city)) {
              const newFavorites = [...favorites, city];
              setFavorites(newFavorites);
              localStorage.setItem('favorites', JSON.stringify(newFavorites));
              setAddingToFavoriteMessage('Added to favorites!');
              console.log(city);
              console.log(favorites);
              
            }
            else{
              setAddingToFavoriteMessage('Already exist in memory!');
              console.log("can't add to favorites");
              console.log(favorites);
      
            }
          }  

        return (  
        <div className='main-container'>
        <div className='full-container'>
        <div className='weather_container'>  
            <h3 className="city-country">
              {city+','}  {country}
            </h3>

            <h3 className="date-day-of-the-week">
              {forcastDayOftheWeek + ', ' + forcastDate}  
            </h3>

            <h3 className="time">
              {forcastLastTimeUpdated}
            </h3>

            <WeatherIcon weatherIcon={weatherIcon} iconSize={iconSize}/>

            <h2 className='temperature'>
              {currentWeatherInC + '°C'}
            </h2>
            
            <h3 className='weather-type'>
              {'Status: ' + weatherType}
            </h3>

        </div>

          <div className='buttons-container'>
            <button 
              className='add-to-favorites-button'
              onClick={() => addToFavorites(city)}>
              Add to Favorites
            </button>

            <button 
              className='add-to-favorites-button'
              onClick={() => setHasWatchFavoritesPressed(true)}>
              Watch Favorites
            </button>
          </div>
        </div>
      
      <FiveDaysForecast fiveDaysForcast={fiveDaysForcast}/>        

    </div>
)
}

export default CreateWeatherForcast;

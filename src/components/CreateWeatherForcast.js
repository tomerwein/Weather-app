import WeatherIcon from "./WeatherIcon"
import FiveDaysForecast from "./FiveDaysForcast";

const CreateWeatherForcast = (
    {city, currentCityKey, country, forcastDayOftheWeek, 
    forcastDate, forcastLastTimeUpdated,
    weatherIcon, iconSize, currentWeatherInC,
    weatherType, favorites, setFavorites,
    setHasWatchFavoritesPressed,
    fiveDaysForcast}) =>  {     
      const deleteFromFavorites = (cityName) => {
        const favoriteCity = favorites.find(favoriteCity => favoriteCity.name === cityName);
          
        if (favoriteCity) {
            const newFavorites = favorites.filter(favoriteCity => favoriteCity.name !== cityName);
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        
            alert('Removed from favorites!');
        }
        else {
            alert('City is not in favorites!');
        }
      }
      
      const addToFavorites = (cityName, currentCityKey) => {
        if (favorites.length >= 5) {
            alert('You can only save 5 cities in memory!');
            return;
        }
        else if (!favorites.some(favoriteCity => favoriteCity.name === cityName)) {
            const newFavoriteCity = {
                id: Date.now(), 
                name: cityName,
                key: currentCityKey,
            };
    
            const newFavorites = [...favorites, newFavoriteCity];
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
            alert('Added to favorites!');
            return;
        }
        else {
            alert('Already exist in memory!');
            return;   
        }
      }  

      return (  
      <div className='main-container'>
        {city && (<div className='full-container'>
          <div className='weather_container'>  
            <h3 className="city-country">
              {city + ','} {country}
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
            className='favorites-button'
            onClick={() => addToFavorites(city, currentCityKey)}>
            Add to Favorites
          </button>

          <button 
            className='delete-favorites-button'
            onClick={() => deleteFromFavorites(city)}>
            Remove from Favorites
          </button>

          <button 
            className='favorites-button'
            onClick={() => setHasWatchFavoritesPressed(true)}>
            Watch Favorites
          </button>
        </div>
      </div>)}
    
    <FiveDaysForecast fiveDaysForcast={fiveDaysForcast}/>        
    </div>
)
}

export default CreateWeatherForcast;

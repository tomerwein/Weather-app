import WeatherIcon from "./WeatherIcon"
import FiveDaysForecast from "./FiveDaysForcast";

const CreateWeatherForcast = (
    {city, country, forcastDayOftheWeek, 
    forcastDate, forcastLastTimeUpdated,
    weatherIcon, iconSize, currentWeatherInC,
    weatherType, favorites, setFavorites,
    setAddingToFavoriteMessage, setHasWatchFavoritesPressed,
    fiveDaysForcast}) =>  {
        
        const deleteFromFavorites = (city) => {
            // Check if the city is in the favorites list
            if (favorites.some(favoriteCity => favoriteCity === city)) {
                // Remove the city from the favorites list
                const newFavorites = favorites.filter(favoriteCity => favoriteCity !== city);
                
                // Update the state and localStorage
                setFavorites(newFavorites);
                localStorage.setItem('favorites', JSON.stringify(newFavorites));
        
                // Optional: Display a message or alert
                setAddingToFavoriteMessage('Removed from favorites!');
                alert('Removed from favorites!');
            }
            else{
                // Optional: Display a message or alert if the city is not in the favorites list
                setAddingToFavoriteMessage('City is not in favorites!');
                alert('City is not in favorites!');
            }
        }

        const addToFavorites = (city) => {
            if (!favorites.some(favoriteCity => favoriteCity === city)) {
              const newFavorites = [...favorites, city];
              setFavorites(newFavorites);
              localStorage.setItem('favorites', JSON.stringify(newFavorites));
              setAddingToFavoriteMessage('Added to favorites!');
              alert('Added to favorites!');
              return;
              
            }
            else{
              setAddingToFavoriteMessage('Already exist in memory!');
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
              onClick={() => addToFavorites(city)}>
              Add to Favorites
            </button>

            <button 
              className='delete-favorites-button'
              onClick={() => deleteFromFavorites(city)}>
              Delete from Favorites
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

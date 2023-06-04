import React, { useState, useEffect } from 'react';
import Forcast from '../Forcast';

const FavoriteCities = ({favorites}) => {
    const [favoriteCities, setFavoriteCities] = useState([]);
    const [backToSearch, setBackToSearch] = useState(false);


    console.log(favorites);

    return (
        backToSearch ? <Forcast/>: 
        <div className='background'>
        <div className='favorite-container'>
            <h2>Favorite Cities</h2>

            {favorites.length > 0 ? favorites.map((city, index) => (
                <span key={index}> {city} </span> )
                
            ) : (
                <p>No favorite cities yet.</p>
            )}

            <button 
                className='favorites-button'
                onClick={() => setBackToSearch(true)}>
                Back to search
            </button>            
        </div>
        </div>
    );
};

export default FavoriteCities;
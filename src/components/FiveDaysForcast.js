import React from 'react';
import SingleDay from './SingleDay';


const FiveDaysForecast = ({ fiveDaysForcast }) => {    
    return (
        <div className='main-container'>

        {fiveDaysForcast && fiveDaysForcast.length >= 5 && (<div className='five_days_forcast_container'>            
                <SingleDay dayParameters={fiveDaysForcast[0]} daysAdditionToCurrentDay={0}/> 
                <SingleDay dayParameters={fiveDaysForcast[1]} daysAdditionToCurrentDay={1}/>
                <SingleDay dayParameters={fiveDaysForcast[2]} daysAdditionToCurrentDay={2}/> 
                <SingleDay dayParameters={fiveDaysForcast[3]} daysAdditionToCurrentDay={3}/> 
                <SingleDay dayParameters={fiveDaysForcast[4]} daysAdditionToCurrentDay={4}/> 
        </div>)}
        </div>
      )
};

export default FiveDaysForecast;
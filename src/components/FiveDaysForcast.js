import React from 'react';
import SingleDay from './SingleDay';


const FiveDaysForecast = ({ fifeDaysForcast }) => {
    const day1 = fifeDaysForcast[0];
    
    return (
        <div className='five_days_forcast_container'>            
            <SingleDay dayParameters={fifeDaysForcast[0]} daysAdditionToCurrentDay={0}/> 
            <SingleDay dayParameters={fifeDaysForcast[1]} daysAdditionToCurrentDay={1}/>
            <SingleDay dayParameters={fifeDaysForcast[2]} daysAdditionToCurrentDay={2}/> 
            <SingleDay dayParameters={fifeDaysForcast[3]} daysAdditionToCurrentDay={3}/> 
            <SingleDay dayParameters={fifeDaysForcast[4]} daysAdditionToCurrentDay={4}/> 
        </div>
      )
};

export default FiveDaysForecast;
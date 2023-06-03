import React from 'react';
import SingleDay from './SingleDay';


const FiveDaysForecast = ({ fifeDaysForcast }) => {
    console.log("he");
    console.log(fifeDaysForcast);
    console.log(fifeDaysForcast[0]);
    console.log(fifeDaysForcast[1]);
    
    return (
        <div>
            {fifeDaysForcast.length > 0 ?
                <SingleDay dayParameters={fifeDaysForcast[0]}/> 
                
                // <SingleDay daysParameter={fifeDaysForcast[2]}/> &&
                // <SingleDay daysParameter={fifeDaysForcast[3]}/> &&
                // <SingleDay daysParameter={fifeDaysForcast[4]}/>
                 : null }
        </div>
      )
};

export default FiveDaysForecast;
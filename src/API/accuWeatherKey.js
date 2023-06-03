const key = "Jg505AlGGx83COZr0AJmCmGYsgNP4jpo";
const getWeather = async (locationKey) => {
    const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
    const query = `${locationKey}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}

const getCity = async(city) => {
   const base = "http://dataservice.accuweather.com/locations/v1/cities/search"; 
   const query = `?apikey=${key}&q=${city}`;

   const response = await fetch(base + query);
   const data = await response.json();

   return data[0];
}

getCity("tel aviv").then(data => {
return weather = getWeather(data.Key);
}).then(data => {console.log(data);}).catch(err => console.log(err)); 



 

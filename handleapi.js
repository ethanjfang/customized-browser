async function getWeather(lat, lon){
    const url = `https://open-meteo.com/en/docs?bounding_box=-90,-180,90,180&latitude=${lat}&longitude=${lon}&timezone=auto&hourly=&current=apparent_temperature,rain,precipitation,showers,is_day,temperature_2m,relative_humidity_2m`;
    
    const response = await fetch(url);
    const data = await response.json();


    console.log(data.current.temperature_2m);
}
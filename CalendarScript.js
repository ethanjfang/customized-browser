
// const today = new Date()
// const day = today.getDate();
// const month = today.getMonth();
// const weekday = today.getDay();
const calendarContainer = document.querySelector('.calendar')
// const dateData = {
//     day: day,
//     month: month + 1,
//     weekday: weekday,
//     formatted: `${weekday}, ${day}, ${month}`
// };

function getWeekDay(tense){
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    
    console.log(weekdays[tense.getDay()]);
    if (tense.getDay() == 0){
        return ("SAT");
    } else{
        const weekday_index = tense.getDay();
        return (weekdays[weekday_index]);
    }
    //maybe somehwere change font colour when its sat sun 16/7
}


//wdwdwdwdwdwdddddddddddddddddddddddddddddddddddddddd
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const twoContainer = document.querySelector(".two-days-ago");

let twoDate = new Date();
twoDate.setDate((twoDate.getDate()) - 2);

const twoDiv = document.createElement("div");
twoDiv.classList.add("twoDiv");
twoDiv.innerHTML = `
<p class = "weekday">${isWeekend(twoDate.getDay(), twoDiv)}</p>
<p class = "date">${twoDate.getDate()}
`;
twoContainer.appendChild(twoDiv);

const oneContainer = document.querySelector(".one-day-ago");
oneDate = new Date()
oneDate.setDate((oneDate.getDate())- 1);
const oneDiv = document.createElement("div");
oneDiv.classList.add("oneDiv");
oneDiv.innerHTML = `
<p class = "weekday">${isWeekend(oneDate.getDay(), oneDiv)}</p>
<p class = "date">${oneDate.getDate()}</p>
`;
oneContainer.appendChild(oneDiv);

const todayContainer = document.querySelector(".today");

todayDate = new Date();
const todayDiv = document.createElement("div");
todayDiv.classList.add("todayDiv");
todayDiv.innerHTML = `

<p class = "weekday">${isWeekend(todayDate.getDay(), todayDiv)}</p>
<p class = "date">${todayDate.getDate()}</p>
<p class = "month">${todayDate.getMonth() + 1}</p>
<p class = "year">${todayDate.getYear() + 1900}</p>
`;

{/* <p class = "month">${todayDate.getMonth() + 4}</p> */}

adjustMonth(todayDate.getMonth() + 1, todayDiv);
todayContainer.append(todayDiv);
console.log(todayDate.getYear() + 1900);

function getNextFourDays(){
    for (let i = 1; i <= 5; i ++){
        const day = new Date();
        day.setDate(day.getDate() + i);
        
        const futureDiv = document.createElement("div");
        futureDiv.classList.add("futureDiv");

        futureDiv.innerHTML = `
        <p class = "weekday">${isWeekend(day.getDay(), futureDiv)}</p>
        <p class = "date">${day.getDate()}</p>
        `
        calendarContainer.appendChild(futureDiv);
    }
}
{/* <p class = "weekday">${weekdays[day.getDay()]}</p> */}
getNextFourDays();

function isWeekend(index, theDiv){
    if (index === 0){
        theDiv.innerHTML = `
        <p class = "sunday">${weekdays[index]}</p>
        `
        return theDiv.innerHTML;
        
    } else if (index === 6){
        theDiv.innerHTML = `
        <p class = "saturday">${weekdays[index]}</p>
        `
        return theDiv.innerHTML
    } else {
        theDiv.innerHTML = `
        <p class = "weekday">${weekdays[index]}</p>
        `
        return theDiv.innerHTML;
    }
    // container.appendChild(theDiv);
}
function adjustMonth(month, theDiv){
    const tempMonth = theDiv.querySelector('.month');
    if (month >= 10){
        // theDiv.innerHTML = `
        // <p class = month>${month}</p>
        // `;
        tempMonth.classList.add("double");
        
    } else {
        
        tempMonth.classList.add("single");
    }
    return theDiv.innerHTML;
}



async function getWeather(lat, lon){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,apparent_temperature_max,precipitation_probability_max,wind_speed_10m_max,rain_sum&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,is_day,rain,wind_speed_10m&timezone=Pacific%2FAuckland&past_days=2 `
    const response = await fetch(url);
    const weatherData = await response.json();

    return weatherData;
}
// getWeather(-36.8485, 174.7633);
async function getWeatherForDate(weatherData, date){
    const targetDate = new Date();  

    targetDate.setDate(date);
    const targetDateStr = targetDate.toISOString().split("T")[0];
    const index = weatherData.daily.time.indexOf(targetDateStr);
    const maxTemp = weatherData.daily.temperature_2m_max[index];
    const wind = weatherData.daily.wind_speed_10m_max[index];
    const precipitation = weatherData.daily.precipitation_probability_max[index];
    const apparent_temperature = weatherData.daily.apparent_temperature_max[index];
    const rain_sum = weatherData.daily.rain_sum[index];
    return { maxTemp, wind, precipitation, apparent_temperature, rain_sum };
}

//make if statements to decide which weather icon to displayx
//fix icons 31/07


const dates = document.querySelectorAll(".date");
async function printDateTemps(){
    const weatherData = await getWeather(-36.8485, 174.7633);
    for (const div of dates){
    const { maxTemp, wind, precipitation, apparent_temperature, rain_sum } = await getWeatherForDate(weatherData, div.textContent);
    console.log(`${div.textContent.trim()}th: maxTemp: ${maxTemp}, wind: ${wind}, precipitation: ${precipitation}, apparent temperature: ${apparent_temperature}, rain sum: ${rain_sum}`);
    // if (maxTemp >= 15 && rain_sum <= 0){
    //     div.innerHTML = `
    //     <img src = "acircle_transparent.png" style = "width:100px; height: 100px; ">`
    // } else if (rain_sum > 0){
    //     div.innerHTML = `
    //     <img src = "aumbrella_transparent.png" style = "width:100px; height: 100px; ">`
    // };
    //TODO: The year is not showing and the images replace date text 19/10
    const img = document.createElement("img");
    img.classList.add("weather-icon");
    if (rain_sum > 0){
        img.src = "aumbrella_transparent.png";
    } else if (maxTemp >= 15){
        img.src = "acircle_transparent.png";
    } else {
        continue;
    }
    div.appendChild(img);
    }
    // *Refer to pritned statement for returned parameters
    // *TODO: Give the images css classes 4/08 or inline css 19/10
    //*TODO: Separate into separe js files
    
    // console.log(div.textContent);
    }


printDateTemps();

//https://api.open-meteo.com/v1/forecast?latitude=-36.8485&longitude=174.7633&daily=temperature_2m_max,apparent_temperature_max,precipitation_probability_max,wind_speed_10m_max,rain_sum&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,is_day,rain,wind_speed_10m&timezone=Pacific%2FAuckland&past_days=2 


    
    //returns temperature(2m), relative humidity(2m), apparent temp, is day or night, precipitation, rain, showers
    // console.log(
	// "\nCurrent time: " + weatherData.current.time + "\n",
	// "\nCurrent temperature_2m: " + weatherData.current.temperature_2m,
	// "\nCurrent precipitation: " + weatherData.current.precipitation,
	// "\nCurrent rain: " + weatherData.current.rain,
	// "\nCurrent showers: " + weatherData.current.showers,
	// "\nCurrent wind_speed_10m: " + weatherData.current.wind_speed_10m,
	// "\nCurrent wind_direction_10m: " + weatherData.current.wind_direction_10m,
	// "\nCurrent wind_gusts_10m: " + weatherData.current.wind_gusts_10m,
	// "\nCurrent weather_code: " + weatherData.current.weather_code,
	// "\nCurrent apparent_temperature: " + weatherData.current.apparent_temperature,
	// "\nCurrent is_day: " + weatherData.current.is_day,
	// "\nCurrent relative_humidity_2m: " + weatherData.current.relative_humidity_2m,
    // "\n daily temp in 2 days: " + weatherData.current.temperature_2m[1]
    // );
    // console.log("\nHourly data:\n", weatherData.hourly);


//home.html loads as calendary fades out
document.body.addEventListener("transitionend", () => {
    
    location.replace("home.html");
}, { once: true });

document.body.classList.add("fade-out");
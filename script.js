
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
//////////////////////////////



async function getWeather(lat, lon){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=apparent_temperature,rain,precipitation,showers,is_day,temperature_2m,relative_humidity_2m&timezone=auto`;
    
    const response = await fetch(url);
    const data = await response.json();
    //returns temperature(2m), relative humidity(2m), apparent temp, is day or night, precipitation, rain, showers

    console.log(`Current temp is ${data.current.temperature_2m}`);
    console.log(`Relative humidity: 2m: ${data.current.relative_humidity_2m}`);
    console.log(`${data.current.time}`);
    console.log(`Precipitation: ${data.current.precipitation}`);
    console.log(`showers: ${data.current.showers}`);
    console.log(`is day: ${data.current.is_day}`);
    console.log(` relative humidity 2m: ${data.current.relative_humidity_2m}`);
    return data;
}
getWeather(-36.8485, 174.7633); //user prompt to enter lat, lon
const key = "fb7ba2cbe859200d2fd581ed995a9e37";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const weatherIcon = document.querySelector('.weather-icon');
const loooni = document.querySelector('.loooni');
const weatherCard = document.querySelector('.weather-card');
const err = document.getElementById('err');

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

async function checkWeather(city){

    const response = await fetch(url + city + `&appid=${key}`);
    let data = await  response.json();

    if(data.cod === "404"){
        weatherCard.style.height = "200px";
        err.style.display = "block";
        loooni.style.display = "none";
        document.querySelector(".city").innerHTML = "";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
    }
    else{
        err.style.display = "none";
        weatherCard.style.height = "600px";
        loooni.style.display = "block";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp.toFixed(0) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
    }

    console.log(data);

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "pics/cloudy.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "pics/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "pics/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "pics/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "pics/mist.png";
    }
};

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

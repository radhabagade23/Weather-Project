const apikey = "a1c6d166e7b292bde1ee2e5a94aa0f3d";
const apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const forecastContainer = document.querySelector(".forecast-container");

async function checkWeather(city) {
    try {
        // Fetch current weather
        const response = await fetch(apiUrlCurrent + city + `&appid=${apikey}`);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        // Update current weather details
        document.querySelector(".city").innerHTML = `${data.name}`;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

        // Update weather icon
        const condition = data.weather[0].main;
        updateWeatherIcon(condition);

        // Fetch 5-day forecast
        fetchForecast(city);
    } catch (error) {
        alert(error.message);
    }
}

async function fetchForecast(city) {
    try {
        const response = await fetch(apiUrlForecast + city + `&appid=${apikey}`);
        if (!response.ok) throw new Error("Unable to fetch forecast data");
        const data = await response.json();

        // Clear previous forecast
        forecastContainer.innerHTML = "";

        // Extract 5-day forecast (one forecast per day at 12:00 PM)
        const dailyForecasts = data.list.filter((item) => item.dt_txt.includes("12:00:00"));
        dailyForecasts.forEach((day) => {
            const date = new Date(day.dt_txt);
            const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
            const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
            const temp = `${Math.round(day.main.temp)}°C`;

            // Create forecast card
            const forecastCard = document.createElement("div");
            forecastCard.classList.add("forecast-card");
            forecastCard.innerHTML = `
                <p>${dayName}</p>
                <img src="${icon}" alt="Weather Icon">
                <p>${temp}</p>
            `;

            forecastContainer.appendChild(forecastCard);
        });
    } catch (error) {
        alert(error.message);
    }
}

function updateWeatherIcon(condition) {
    const conditionIcons = {
        Clouds: "clouds.webp",
        Clear: "clear.webp",
        Rain: "rain.webp",
        Drizzle: "drizzle.webp",
        Mist: "mist.webp",
    };
    weatherIcon.src = conditionIcons[condition] || "notfound.webp";
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
});

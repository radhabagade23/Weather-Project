const apikey="30908ecd5f5f08d79c73ea875aab27f6";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button"); //when people click on the search button it should send the city information in this check weather function.
const weatherIcon = document.querySelector(".weather-icon");

async function checkweather(city) {
    const response=await fetch(apiUrl + city + `&appid=${apikey}`);
    var data=await response.json();
    // console.log(data);

    // Here we update the data city, temp, humidity and wind 
    document.querySelector(".city").innerHTML= data.name;
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp) + "°c";//In this I used Math.round function because I don't want the temp in the point. For Degree celsius I use °c this symbol.
    document.querySelector(".humidity").innerHTML= data.main.humidity + "%";
    document.querySelector(".wind").innerHTML= data.wind.speed + "km/h";


    // Here we updated the images according to condition
    if(data.weather[0].main == "Clouds") { //In this data.weather[0].main is used because in the console of web the index of this is 0 after that the main this main give the weather condition
        weatherIcon.src = "clouds.webp"; //It will update the source file.
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "clear.webp";
    }
    else if(data.weather[0].main == "rain"){
        weatherIcon.src = "rain.webp";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "drizzle.webp";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "mist.webp";
    }
    else{
        weatherIcon.src = "notfound.webp"
    }

}

searchBtn.addEventListener("click", ()=>{
    checkweather(searchBox.value);//this checkweather function have the city information return in the input feild, so to get the data return in the input feild we will add the searchBox.value so this searchBox.value will give the city name return in the input feild and it will pass the city name in the checkweather function and it eill be added in this API and it will give the information for the perticular city.
})

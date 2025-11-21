const apikey = "e7db20158698ac6aecaf5f8bfc887b3c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    // 🟥 If city is not found
    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return;
    }

    const data = await response.json();

    // 🟩 Update text content
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // 🟦 Normalize and match weather type safely
    const weatherType = data.weather[0].main.toLowerCase();

    if (weatherType.includes("cloud")) {
      weatherIcon.src = "images/clouds.png";
    } else if (weatherType.includes("clear")) {
      weatherIcon.src = "images/clear.png";
    } else if (weatherType.includes("rain")) {
      weatherIcon.src = "images/rain.png";
    } else if (weatherType.includes("drizzle")) {
      weatherIcon.src = "images/drizzle.png";
    } else if (weatherType.includes("snow")) {
      weatherIcon.src = "images/snow.png";
    } else if (
      weatherType.includes("mist") ||
      weatherType.includes("fog") ||
      weatherType.includes("haze") ||
      weatherType.includes("smoke")
    ) {
      weatherIcon.src = "images/mist.png";
    } else {
      weatherIcon.src = "images/clear.png"; // default/fallback icon
    }

    // 🟢 Show weather section
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

// 🔍 Search button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

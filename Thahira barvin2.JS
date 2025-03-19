const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherDetails = document.getElementById('weather-details');

searchButton.addEventListener('click', getWeather);

function getWeather() {
    const city = cityInput.value;
    
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert('City not found');
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            alert('Error fetching weather data');
        });
}

function displayWeather(data) {
    const { name, main, weather } = data;
    
    weatherDetails.innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

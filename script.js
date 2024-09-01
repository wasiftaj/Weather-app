document.getElementById('searchButton').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetchTemperatureByLocation(location);
    } else {
        alert('Please enter a location');
    }
});

document.getElementById('currentLocationButton').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchTemperatureByCoordinates(lat, lon);
        }, (error) => {
            console.error('Geolocation error:', error);
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function fetchTemperatureByLocation(location) {
    const apiKey = 'RnQ9oHl3S2ssIogrnRgKEIHFfPoQqNtC'; // Your API key
    fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${encodeURIComponent(location)}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log('API Response by Location:', data); // Log the response to inspect its structure
            updateTemperatureDisplay(data);
        })
        .catch(err => {
            console.error('Error fetching weather data by location:', err);
            updateTemperatureDisplay({}); // Clear previous data on error
        });
}

function fetchTemperatureByCoordinates(lat, lon) {
    const apiKey = 'RnQ9oHl3S2ssIogrnRgKEIHFfPoQqNtC'; // Your API key
    fetch(`https://api.tomorrow.io/v4/weather/forecast?lat=${lat}&lon=${lon}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log('API Response by Coordinates:', data); // Log the response to inspect its structure
            updateTemperatureDisplay(data);
        })
        .catch(err => {
            console.error('Error fetching weather data by coordinates:', err);
            updateTemperatureDisplay({}); // Clear previous data on error
        });
}

function updateTemperatureDisplay(data) {
    const temperatureElement = document.getElementById('temperature');

    // Assuming the API returns data in a format where temperature is available as follows:
    temperatureElement.textContent = `Temperature: ${data?.data?.temperature || 'N/A'}°C`;
}

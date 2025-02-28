import React, { useState, useEffect } from 'react';
import '../App.css';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const apiKey = "aa26a22df55841802f3e3b0c8bfe299e";
  const [locationEnabled, setLocationEnabled] = useState(true);

  const cityOnChange = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationEnabled(true);
            console.log("Latitude:", position.coords.latitude, "Longitude:", position.coords.longitude); // Add this line
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            setLocationEnabled(false);
            if (setError) {
              setError(err.message);
            }
          }
        );
      } else {
        setLocationEnabled(false);
        if (setError) {
          setError("Geolocation is not supported by your browser.");
        }
      }
    };

    getLocation();
  }, []);

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);

        

      if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      if (setError) {
        setError(error.message);
      }
      console.error(error);
    }
  };

  const fetchWeatherData = async () => {
    if (!city) {
      if (setError) {
        setError("Please enter a city name.");
      }
      return;
    }
    if (setError) {
      setError(null);
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

     

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      if (setError) {
        setError("Error fetching weather data. Please check the city name.");
      }
      setWeatherData(null);
    }
  };


  const getFullCountryName = (countryCode) => {
    try {
      const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
      return regionNames.of(countryCode);
    } catch (error) {
      console.error("Error getting country name:", error);
      return countryCode; 
    }
  };


  return (
    <div className='body text-center'>
      <div className="heading text-center">
        <h1>Weather App</h1>
      </div>

      <div className="input-group mt-5">
        <input type="text" className="form-control" placeholder="Enter city name " aria-label="Username" aria-describedby="addon-wrapping" onChange={cityOnChange} />
      </div>

      <div className="button mt-5">
        <button type="button" className="btn btn-danger" onClick={fetchWeatherData}>Get Weather Info</button>
      </div>

      <div className="error mt-3">
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {weatherData && (
        <div className='text-center mt-5'>
          {error && locationEnabled && (
            <p style={{ color: 'red' }}>{error}</p>
          )}

          {weatherData.weather[0].icon && (
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
            />
          )}
          <p>Temperature:{Math.ceil(weatherData.main.temp)}°C</p>
          <p>City: {weatherData.name}</p>
          <p>Description:{weatherData.weather[0].description}</p>
          <p>Country: {getFullCountryName(weatherData.sys.country)}</p>

        </div>
      )}
    </div>
  );
}
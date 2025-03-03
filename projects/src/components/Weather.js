import React, { useState, useEffect } from 'react';
import '../App.css';

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const apiKey = "aa26a22df55841802f3e3b0c8bfe299e";
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [citySearchAttempted, setCitySearchAttempted] = useState(false); // Track city search



  const cityOnChange = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocationEnabled(true);
            console.log("Latitude:", position.coords.latitude, "Longitude:", position.coords.longitude);
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          (err) => {
            setLocationEnabled(false);
            if (setError) {
              setError(err.message);
            }
            setLoading(false);
          }
        );
      } else {
        setLocationEnabled(false);
        if (setError) {
          setError("Geolocation is not supported by your browser.");
        }
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );

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
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async () => {
    setCitySearchAttempted(true);
    if (!city) {
      if (setError) {
        setError("Please enter a city name.");
      }
      return;
    }
    if (setError) {
      setError(null);
    }
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message) {
          throw new Error(errorData.message);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const data = await response.json();
      setWeatherData(data);
      setCity('');
    } catch (err) {
      console.error("Error fetching weather data:", err);
      if (setError) {
        setError(err.message || "Error fetching weather data. Please check the city name.");
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
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

  const toggleShowMore = () => {
    setShowMore(true);
  };

  const handleBack = () => {
    setShowMore(false);
  };

  if (showMore) {
    return (
      <div className='body text-center'>
        <div className="heading text-center">
          <h1>Weather Details</h1>
        </div>
        {weatherData && (
          <div className="mt-5">
            <p>City: {weatherData.name}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Feels Like:{Math.round(weatherData.main.feels_like)}°C</p>
            <p>Minimum Temerature:{Math.round(weatherData.main.temp_min)}°C</p>
            <p>Maximum Temerature:{Math.round(weatherData.main.temp_max)}°C</p>
            <button onClick={handleBack} className="btn btn-primary">
              Back
            </button>
          </div>
        )}
      </div>
    );
  }


  

  return (
    <div className='body text-center'>
      <div className="heading text-center">
        <h1>Weather App</h1>
      </div>

      <div className="input-group mt-5">
        <input
          type="text"
          className="form-control"
          value={loading && city ? "Loading..." : city}
          placeholder={loading && !city ? "Loading..." : "Enter city name"}
          aria-label="Username"
          aria-describedby="addon-wrapping"
          onChange={cityOnChange}
          disabled={loading}
        />
        {loading && city && (
          <div className="input-group-append">
            
          </div>
        )}
      </div>

      <div className="button mt-5">
        <button type="button" className="btn btn-danger" onClick={fetchWeatherData} disabled={loading}>
          Get Weather Info
        </button>
      </div>

      <div className="error mt-3">
        {citySearchAttempted && error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {loading && (
        <div className="mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {weatherData && !loading && (
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
          <button onClick={toggleShowMore} className="btn btn-primary">
            Show More
          </button>

          </div>
      )}
    </div>
  );
}
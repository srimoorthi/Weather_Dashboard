import React from "react";
import "../styles/WeatherMain.css";

export default function WeatherMain({ weatherData }) {
  if (!weatherData) {
    return (
      <div className="weather-main placeholder">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1116/1116453.png"
          alt="weather placeholder"
          className="placeholder-icon"
        />
        <h2>Search for a city 🌍</h2>
        <p>Find out what the weather looks like today.</p>
      </div>
    );
  }

  // if data exists
  const { city, current } = weatherData;
  const date = new Date().toLocaleDateString();

  return (
    <div className="weather-main">
      <div className="top-section">
        <h2 className="city">{city}</h2>
        <p className="date">{date}</p>
      </div>

      <div className="middle-section">
        <img
          src={current.weatherIconUrl[0].value}
          alt={current.weatherDesc[0].value}
          className="weather-icon"
        />
        <h1 className="temp">{current.temp_C}°C</h1>
        <p className="condition">{current.weatherDesc[0].value}</p>
      </div>

      <div className="bottom-section">
        <p>💧 Humidity: {current.humidity}%</p>
        <p>💨 Wind: {current.windspeedKmph} km/h</p>
      </div>
    </div>
  );
}

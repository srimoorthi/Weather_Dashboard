import React from "react";
import "../styles/Highlights.css";

export default function Highlights({ weatherData }) {
  if (!weatherData) {
    return (
      <div className="highlights placeholder">
        <h2>No data yet</h2>
        <p>Search for a city to see weather details.</p>
      </div>
    );
  }

  const { current } = weatherData;

  return (
    <div className="highlights">
      <h2 className="title">Today's Highlights</h2>
      <div className="cards">
        <div className="card">
          <h3>Humidity</h3>
          <p>{current.humidity}%</p>
        </div>
        <div className="card">
          <h3>Wind Speed</h3>
          <p>{current.windspeedKmph} km/h</p>
        </div>
        <div className="card">
          <h3>Pressure</h3>
          <p>{current.pressure} hPa</p>
        </div>
        <div className="card">
          <h3>Visibility</h3>
          <p>{current.visibility} km</p>
        </div>
      </div>
    </div>
  );
}

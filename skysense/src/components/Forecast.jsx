import React from "react";
import "../styles/Forecast.css";

export default function Forecast({ weatherData }) {
  if (!weatherData) {
    return (
      <div className="forecast placeholder">
        <h2>Forecast unavailable</h2>
        <p>Search a city to see the 5-day weather outlook.</p>
      </div>
    );
  }

  const forecastArray = weatherData.weather || weatherData.forecast || [];
  const limitedForecast = forecastArray.slice(0, 5);

  // 👇 Fill empty slots if API gives < 5 days
  while (limitedForecast.length < 5) {
    limitedForecast.push({
      date: null,
      hourly: [],
      placeholder: true,
    });
  }

  return (
    <div className="forecast">
      <h2 className="title">Next 5 Days</h2>
      <div className="forecast-list">
        {limitedForecast.map((day, index) => {
          if (day.placeholder) {
            return (
              <div key={index} className="forecast-card placeholder">
                <p className="day">--</p>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/414/414825.png"
                  alt="No data"
                  className="icon"
                />
                <p className="temp">--°C</p>
                <p className="desc">No data</p>
              </div>
            );
          }

          const dayName = new Date(day.date).toLocaleDateString("en-US", {
            weekday: "short",
          });
          const avgTemp = day.avgtempC || day.hourly?.[4]?.tempC || "-";
          const iconUrl =
            day.hourly?.[4]?.weatherIconUrl?.[0]?.value ||
            "https://cdn-icons-png.flaticon.com/512/1116/1116453.png";
          const desc =
            day.hourly?.[4]?.weatherDesc?.[0]?.value || "No data";

          return (
            <div key={index} className="forecast-card">
              <p className="day">{dayName}</p>
              <img src={iconUrl} alt={desc} className="icon" />
              <p className="temp">{avgTemp}°C</p>
              <p className="desc">{desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import WeatherMain from "../components/WeatherMain";
import Highlights from "../components/Highlights";
import Forecast from "../components/Forecast";
import "../styles/global.css";

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div className="container">
      <Sidebar setWeatherData={setWeatherData} />

      <main className="main">
        <section className="weather">
          <WeatherMain weatherData={weatherData} />
        </section>

        <section className="details">
          <Highlights weatherData={weatherData} />
        </section>

        <section className="forecast-section">
          <Forecast weatherData={weatherData} />
        </section>
      </main>
    </div>
  );
}

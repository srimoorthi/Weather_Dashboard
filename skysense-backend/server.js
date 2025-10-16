import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Get weather by city name (using Open-Meteo)
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    // Step 1️⃣: Geocoding (city → lat/lon)
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoRes = await axios.get(geoUrl);

    if (!geoRes.data.results?.length) {
      return res.status(404).json({ error: "City not found" });
    }

    const { latitude, longitude, name, country } = geoRes.data.results[0];

    // Step 2️⃣: Current weather + daily forecast
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
    const weatherRes = await axios.get(weatherUrl);

    const current = weatherRes.data.current_weather;
    const daily = weatherRes.data.daily;

    // Step 3️⃣: Simplify response
    res.json({
      city: name,
      country,
      temperature: current.temperature,
      windspeed: current.windspeed,
      weathercode: current.weathercode,
      date: current.time,
      sunrise: daily.sunrise[0],
      sunset: daily.sunset[0],
      temp_max: daily.temperature_2m_max[0],
      temp_min: daily.temperature_2m_min[0],
    });
  } catch (err) {
    console.error("Weather fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

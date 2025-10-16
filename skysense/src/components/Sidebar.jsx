    import React, { useState } from "react";
    import axios from "axios";
    import "../styles/Sidebar.css";

    export default function Sidebar({ setWeatherData }) {
    const [city, setCity] = useState("");

    const handleSearch = async () => {
        if (!city) return;

        try {
        // Using wttr.in — no API key required
        const currentRes = await axios.get(`https://wttr.in/${city}?format=j1`);

        const current = currentRes.data.current_condition[0];
        const forecast = currentRes.data.weather.slice(0, 5); // next 5 days

        setWeatherData({
            city,
            current,
            forecast,
        });
        } catch (error) {
        console.error("Weather fetch error:", error);
        alert("Could not find that city 😕");
        }
    };

    return (
        <aside className="sidebar">
        <h2 className="logo">SkySense</h2>
        <div className="search-bar">
            <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleSearch}>🔍</button>
        </div>
        </aside>
    );
    }

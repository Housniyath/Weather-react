import { useState } from "react";

interface WeatherInfo {
  temp: number;
  humidity: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy";
}

const weatherData: Record<string, WeatherInfo> = {
  Cotonou: { temp: 31, humidity: 78, condition: "sunny" },
  Paris: { temp: 14, humidity: 62, condition: "cloudy" },
  Tokyo: { temp: 22, humidity: 55, condition: "rainy" },
  Montreal: { temp: -3, humidity: 80, condition: "snowy" },
};

function App() {
  const [city, setCity] = useState("Cotonou");
  const [weather, setWeather] = useState(weatherData["Cotonou"]);
  const [loading, setLoading] = useState(false);

  const icons = {
    sunny: "☀️",
    cloudy: "☁️",
    rainy: "🌧️",
    snowy: "❄️",
  };

  const conditions = {
    sunny: "Ensoleillé",
    cloudy: "Nuageux",
    rainy: "Pluvieux",
    snowy: "Enneigé",
  };

  const handleCityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setWeather(weatherData[selectedCity]);
  };

  const refreshWeather = () => {
    setLoading(true);

    setTimeout(() => {
      setWeather(weatherData[city]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #1e3c72, #2a5298)",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "30px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            color: "#1e3c72",
            marginBottom: "20px",
          }}
        >
          🌍 Dashboard Météo
        </h2>

        <select
          value={city}
          onChange={handleCityChange}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "15px",
          }}
        >
          {Object.keys(weatherData).map((cityName) => (
            <option key={cityName} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>

        <button
          onClick={refreshWeather}
          style={{
            background: "#1e3c72",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          🔄 Actualiser
        </button>

        {loading ? (
          <h2>⏳ Chargement...</h2>
        ) : (
          <>
            <h2 style={{ color: "#333" }}>{city}</h2>

            <div
              style={{
                fontSize: "70px",
                margin: "15px 0",
              }}
            >
              {icons[weather.condition]}
            </div>

            <div
              style={{
                background: "#f5f7fa",
                padding: "20px",
                borderRadius: "15px",
                textAlign: "left",
              }}
            >
              <p>
                <strong>🌡 Température :</strong>{" "}
                {weather.temp}°C
              </p>

              <p>
                <strong>💧 Humidité :</strong>{" "}
                {weather.humidity}%
              </p>

              <p>
                <strong>🌤 État :</strong>{" "}
                {conditions[weather.condition]}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
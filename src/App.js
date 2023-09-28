import SearchBar from "./components/SearchBar.js";
import WeatherInfo from "./components/Weather.js";
import { useState } from "react";

export default function App() {
  const [locationData, setLocationData] = useState(null);

  const handleLocationDataChange = (event, locationValue) => {
    setLocationData(locationValue);
  };

  return (
    <div className="App">
      <h1>Weather app</h1>
      <SearchBar onLocationChange={handleLocationDataChange} />
      <WeatherInfo locationData={locationData} />
    </div>
  );
}

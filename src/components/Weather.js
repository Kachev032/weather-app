import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWeatherState,
  loadWeather,
  resetState,
} from "../store/reducers/weatherSlice";

const WeatherInfo = ({ locationData }) => {
  const dispatch = useDispatch();
  const weatherState = useSelector(selectWeatherState);
  useEffect(() => {
    if (locationData) {
      dispatch(resetState());
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const temperature = data.main.temp;
          const feelsLike = data.main.feels_like;
          dispatch(
            loadWeather({
              temperature,
              feelsLike,
              name: data.name,
              weather: data.weather,
              main: data.min,
            })
          );
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    } else {
      dispatch(resetState());
    }
  }, [locationData]);

  if (!weatherState.isLoaded || !locationData) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <h1>Weather in {locationData.name}</h1>
      <img
        src={`http://openweathermap.org/img/w/${weatherState.weather[0].icon}.png`}
      />
      <p>{weatherState.weather[0].description}</p>
      <p>Temperature: {weatherState.temperature}°C</p>
      <p>Feels Like: {weatherState.feelsLike}°C</p>
    </Box>
  );
};

export default WeatherInfo;

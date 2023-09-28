import {createSlice} from "@reduxjs/toolkit"

const initialWeatherState = {temperature:null, feelsLike:null,name:null, weather:null, main:null, isLoaded:false}

export const weatherSlice = createSlice({
    name: "weather",
    initialState: initialWeatherState,
    reducers: {
        loadWeather:(state, action)=>{
        state.temperature = action.payload.temperature;
        state.feelsLike = action.payload.feelsLike;
        state.name = action.payload.name;
        state.weather = action.payload.weather;
        state.main = action.payload.main;
        state.isLoaded = true;
        },
        resetState:(state, action) => {
            state = initialWeatherState;
        }

    }
})


export const {loadWeather, resetState} = weatherSlice.actions
export const selectWeatherState = (state) => state.weather;
export default weatherSlice.reducer;
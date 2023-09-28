import { configureStore} from '@reduxjs/toolkit'
import weatherReducer from "./reducers/weatherSlice"
import searchReducer from './reducers/searchSlice'

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        search: searchReducer,
    }
}

) 
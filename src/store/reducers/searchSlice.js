import { createSlice } from "@reduxjs/toolkit";

const initialSearchState = {
  inputValue: "",
  dropdownOptions: [],
  isLoading: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    modifyValue: (state, action) => {
      state.inputValue = action.payload;
    },
    modifyDropdownOptions: (state, action) => {
      state.dropdownOptions = action.payload;
    },
    resetDropdownOptions: (state) => {
      state.dropdownOptions = [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetState: (state) => {
      state = initialSearchState;
    },
  },
});

export const {
  modifyValue,
  modifyDropdownOptions,
  resetDropdownOptions,
  setLoading,
  resetState,
} = searchSlice.actions;
export const selectSearchState = (state) => state.search;
export default searchSlice.reducer;

import React, { useState, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import debounce from "lodash.debounce";
import { Stack } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  modifyDropdownOptions,
  modifyValue,
  selectSearchState,
  resetDropdownOptions,
  setLoading,
} from "../store/reducers/searchSlice";

export default function SearchBar({ onLocationChange }) {
  const dispatch = useDispatch();
  const searchState = useSelector(selectSearchState);

  // Api call fetch
  const loadOptions = useCallback((inputValue) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        const modifiedOptions = json.map((option) => ({
          ...option,
          value: `${option.lat}, ${option.lon}`,
          label: `${option.name}, ${option.country}`,
        }));

        dispatch(modifyDropdownOptions(modifiedOptions));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

  const debouncedLoadOptions = useCallback(debounce(loadOptions, 1000), [
    loadOptions,
  ]);

  const handleInputChange = (event, newInputValue) => {
    dispatch(setLoading(true));
    dispatch(resetDropdownOptions);
    dispatch(modifyValue(newInputValue));
    debouncedLoadOptions(newInputValue);
  };

  return (
    <Stack width={"100%"} alignItems={"center"}>
      <Autocomplete
        freeSolo
        style={{ width: 300 }}
        options={searchState.dropdownOptions}
        inputValue={searchState.inputValue}
        onInputChange={handleInputChange}
        onChange={onLocationChange}
        loading={searchState.isLoading}
        getOptionLabel={(option) => option.label || ""}
        noOptionsText={"Location not found"}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter location"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {searchState.isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Stack>
  );
}

// src/slices/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IForecastData } from "../services/data_service/transform_weather";

interface ISystemState {
  weatherData: IForecastData;
  tempUnit: "F" | "C";
}

const initialState: ISystemState = {
  weatherData: {},
  tempUnit: "F",
};

const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    setWeatherData: (
      state = initialState,
      action: PayloadAction<{
        value: any;
      }>
    ) => {
      const value = action.payload.value;
      state.weatherData = value;
    },
    UpdateTempUnit: (
      state = initialState,
      action: PayloadAction<{
        value: "F" | "C";
      }>
    ) => {
      const value = action.payload.value;
      state.tempUnit = value;
    },
  },
});

export const { setWeatherData, UpdateTempUnit } = systemSlice.actions;
export default systemSlice.reducer;

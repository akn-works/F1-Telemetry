import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDrivers } from "../services/api";

export const fetchDrivers = createAsyncThunk(
  "f1/fetchDrivers",
  async () => {
    const data = await getDrivers();
    return data;
  }
);

const f1Slice = createSlice({
  name: "f1",
  initialState: {
    drivers: [],
    speed: 290,
    loading: false,
    error: null,
    darkMode: true,
  },
  reducers: {
    updateSpeed: (state) => {
      state.speed = Math.floor(Math.random() * 20) + 280;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state) => {
        state.loading = false;
        state.error = "Error loading drivers";
      });
  },
});

export const { updateSpeed, toggleDarkMode } = f1Slice.actions;
export default f1Slice.reducer;
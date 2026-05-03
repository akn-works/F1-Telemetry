import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { openF1Api, jolpiApi } from '../services/api';

const FALLBACK_SESSION_KEY = 9158; // Hardcoded fallback (2023 Las Vegas GP)

// Fetch Standings
export const fetchStandings = createAsyncThunk(
  'f1/fetchStandings',
  async ({ limit = 30, offset = 0, year = 'current' }, { rejectWithValue }) => {
    try {
      const response = await jolpiApi.get(`/${year}/driverStandings.json`, {
        params: { limit, offset }
      });
      return response.data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Latest Session Telemetry
export const fetchLatestTelemetry = createAsyncThunk(
  'f1/fetchLatestTelemetry',
  async (_, { rejectWithValue }) => {
    try {
      // 1. Try to fetch the latest race session
      const sessionRes = await openF1Api.get('/sessions', {
        params: { session_name: 'Race', year: new Date().getFullYear() }
      });
      
      let sessionKey = FALLBACK_SESSION_KEY;
      if (sessionRes.data && sessionRes.data.length > 0) {
         // Get the most recent one
         const latestSession = sessionRes.data[sessionRes.data.length - 1];
         sessionKey = latestSession.session_key;
      }

      // 2. Fetch car data for that session (Speed, RPM)
      // We will get car 1 (Verstappen) telemetry for this session
      const telemetryRes = await openF1Api.get('/car_data', {
        params: { session_key: sessionKey, driver_number: 1 }
      });

      const data = telemetryRes.data || [];
      // To prevent massive arrays from crashing the browser, slice the latest 500 data points
      return data.slice(-500); 
    } catch (error) {
      console.warn("Dynamic fetch failed, falling back to hardcoded session key...", error);
      
      // Fallback behavior
      try {
        const fallbackRes = await openF1Api.get('/car_data', {
           params: { session_key: FALLBACK_SESSION_KEY, driver_number: 1 }
        });
        return (fallbackRes.data || []).slice(-500);
      } catch (fallbackError) {
        return rejectWithValue(fallbackError.message);
      }
    }
  }
);

const f1Slice = createSlice({
  name: 'f1',
  initialState: {
    standings: [],
    telemetry: [],
    standingsStatus: 'idle', // idle, loading, succeeded, failed
    telemetryStatus: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStandings.pending, (state) => {
        state.standingsStatus = 'loading';
      })
      .addCase(fetchStandings.fulfilled, (state, action) => {
        state.standingsStatus = 'succeeded';
        state.standings = action.payload;
      })
      .addCase(fetchStandings.rejected, (state, action) => {
        state.standingsStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchLatestTelemetry.pending, (state) => {
        state.telemetryStatus = 'loading';
      })
      .addCase(fetchLatestTelemetry.fulfilled, (state, action) => {
        state.telemetryStatus = 'succeeded';
        state.telemetry = action.payload;
      })
      .addCase(fetchLatestTelemetry.rejected, (state, action) => {
        state.telemetryStatus = 'failed';
        state.error = action.payload;
      });
  }
});

export default f1Slice.reducer;

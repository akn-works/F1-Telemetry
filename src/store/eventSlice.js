import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [
    {
      id: '1',
      name: 'Noida F1 Watch Party',
      date: '2026-05-15',
      location: 'Sector 18, Noida',
      description: 'Join us for the Imola GP!',
      maxAttendees: 50,
      meetupType: 'Watch Party',
      contactLink: 'https://discord.gg/example'
    }
  ],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push({ ...action.payload, id: Date.now().toString() });
    },
    updateEvent: (state, action) => {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(e => e.id !== action.payload);
    }
  }
});

export const { addEvent, updateEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;

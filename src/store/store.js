import { configureStore } from '@reduxjs/toolkit';
import f1Reducer from './f1Slice';
import eventReducer from './eventSlice';

export const store = configureStore({
  reducer: {
    f1: f1Reducer,
    events: eventReducer,
  },
});

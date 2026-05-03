import { configureStore } from "@reduxjs/toolkit";
import f1Reducer from "./f1Slice";

export const store = configureStore({
  reducer: {
    f1: f1Reducer,
  },
});
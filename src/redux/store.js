import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import submissionReducer from "./submissionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    submission: submissionReducer,
  },
});

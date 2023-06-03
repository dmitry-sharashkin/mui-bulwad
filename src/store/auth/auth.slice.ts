import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = {
  isSessionActive: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedOut(state) {
      state.isSessionActive = false;
    },
    loggedIn(state) {
      state.isSessionActive = true;
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsAuthActive = (state: RootState) =>
  state.auth.isSessionActive;

export default authSlice.reducer;

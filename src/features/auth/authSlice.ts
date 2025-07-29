import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string }>) {
      state.isAuthenticated = true;
      state.user = { username: action.payload.username };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
    },
    signup(state, action: PayloadAction<{ username: string }>) {
      state.isAuthenticated = true;
      state.user = { username: action.payload.username };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    loadUser(state) {
      const user = localStorage.getItem("user");
      if (user) {
        state.isAuthenticated = true;
        state.user = JSON.parse(user);
      }
    },
  },
});

export const { login, logout, signup, loadUser } = authSlice.actions;
export default authSlice.reducer;

// client/src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');
const initialRole = localStorage.getItem('role');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken || null,
    role: initialRole || null,
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { token, role, user } = action.payload;
      state.token = token;
      state.role = role;
      state.user = user;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

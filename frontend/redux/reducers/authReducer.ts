import { createSlice } from '@reduxjs/toolkit';
interface AuthState {
  user: {
    email: string;
    name: string;
    surname: string;
    createdAt: Date;
    role: string;
  } | null;
  token: string | null;
}
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  } as AuthState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;

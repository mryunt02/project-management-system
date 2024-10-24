// frontend/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login } from './reducers/authReducer'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

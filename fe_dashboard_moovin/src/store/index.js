import { configureStore } from '@reduxjs/toolkit';
import chartReducer from '../slices/chartSlice';

export const store = configureStore({
  reducer: {
    chart: chartReducer,
  },
});
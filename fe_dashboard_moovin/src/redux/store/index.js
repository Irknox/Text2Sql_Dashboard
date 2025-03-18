import { configureStore } from '@reduxjs/toolkit';
import sales_data_reducer from '../slices/last_six_months_slice';

export const store = configureStore({
  reducer: {
    sales_chart_data:sales_data_reducer,
  },
});
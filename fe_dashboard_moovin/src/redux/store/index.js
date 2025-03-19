import { configureStore } from '@reduxjs/toolkit';
import sales_data_reducer from '../slices/last_six_months_slice';
import sales_chart_reducer from '../slices/sales_week_slice';

export const store = configureStore({
  reducer: {
    sales_chart_data: sales_chart_reducer, 
    last_six_months_data: sales_data_reducer,
  },
});

store.subscribe(() => {
  console.log("Nuevo estado de Redux:", store.getState());
});

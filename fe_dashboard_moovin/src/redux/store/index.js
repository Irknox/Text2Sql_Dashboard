import { configureStore } from '@reduxjs/toolkit';
import balanceCardReducer from '../slices/balance_card_slice';
import variationCardReducer from '../slices/variation_card_slice';
import CurrentSalesCardReducer from '../slices/current_sales_slice';
import sales_week_reducer from '../slices/sales_week_slice';
import sales_data_reducer from '../slices/last_six_months_slice';

export const store = configureStore({
  reducer: {
    sales_chart_data: sales_week_reducer,
    balance: balanceCardReducer,
    variation: variationCardReducer,
    current_sales: CurrentSalesCardReducer,
    sales_six_months:sales_data_reducer
  },
});

// Agregar un listener para verificar los cambios en Redux
store.subscribe(() => {
  console.log("Nuevo estado de Redux:", store.getState());
});
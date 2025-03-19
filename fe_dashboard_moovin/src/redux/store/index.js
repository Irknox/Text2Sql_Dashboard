import { configureStore } from '@reduxjs/toolkit';
import sales_data_reducer from '../slices/last_six_months_slice';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import sales_chart_reducer from '../slices/sales_week_slice';

export const store = configureStore({
  reducer: {
    sales_chart_data: sales_chart_reducer, 
    last_six_months_data: sales_data_reducer,
  },
});

=======
import balanceCardReducer from '../slices/balance_card_slice';
import variationCardReducer from '../slices/variation_card_slice';
import CurrentSalesCardReducer from '../slices/current_sales_slice';

export const store = configureStore({
  reducer: {
    sales_chart_data: sales_data_reducer,
    balance: balanceCardReducer,
    variation: variationCardReducer,
    current_sales: CurrentSalesCardReducer,
  },
});

// Agregar un listener para verificar los cambios en Redux
>>>>>>> e2ef17ad03d4c172ceaef0c96942322cf3ebd3bc
=======
import balanceCardReducer from '../slices/balance_card_slice';
import variationCardReducer from '../slices/variation_card_slice';
import CurrentSalesCardReducer from '../slices/current_sales_slice';

export const store = configureStore({
  reducer: {
    sales_chart_data: sales_data_reducer,
    balance: balanceCardReducer,
    variation: variationCardReducer,
    current_sales: CurrentSalesCardReducer,
  },
});

// Agregar un listener para verificar los cambios en Redux
>>>>>>> e2ef17ad03d4c172ceaef0c96942322cf3ebd3bc
=======
import balanceCardReducer from '../slices/balance_card_slice';
import variationCardReducer from '../slices/variation_card_slice';
import CurrentSalesCardReducer from '../slices/current_sales_slice';

export const store = configureStore({
  reducer: {
    sales_chart_data: sales_data_reducer,
    balance: balanceCardReducer,
    variation: variationCardReducer,
    current_sales: CurrentSalesCardReducer,
  },
});

// Agregar un listener para verificar los cambios en Redux
>>>>>>> e2ef17ad03d4c172ceaef0c96942322cf3ebd3bc
store.subscribe(() => {
  console.log("Nuevo estado de Redux:", store.getState());
});

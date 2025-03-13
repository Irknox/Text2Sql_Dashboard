import { configureStore } from '@reduxjs/toolkit';
import chartReducer from '../slices/chartSlice';
import dataUsageReducer from '../slices/data_usage_os_version';

export const store = configureStore({
  reducer: {
    chart: chartReducer,
    dataUsage: dataUsageReducer,
  },
});
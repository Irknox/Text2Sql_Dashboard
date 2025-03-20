import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import{fetch_sales_per_week_data} from "../../services/Sales_per_week_services";

// Thunk para obtener los datos del gráfico de ventas
export const fetchSalesWeekData = createAsyncThunk(
  'Sales_week/fetchSalesWeekData',
  async (_, thunkAPI) => {
    try {
      const response = await fetch_sales_per_week_data();
      return response;
    } catch (error) {
      console.error("Error al obtener los datos del gráfico de ventas:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice de Redux para el gráfico de ventas
const sales_week_slice = createSlice({
  name: 'sales_chart_data',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesWeekData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSalesWeekData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchSalesWeekData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default sales_week_slice.reducer;
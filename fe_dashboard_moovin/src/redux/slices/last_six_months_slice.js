import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetch_sales_data } from '@/services/sales_data_services';

// Thunk para obtener los datos
export const fetchChartData = createAsyncThunk(
  'chart/fetchChartData', // Nombre de la acción
  async (_, thunkAPI) => {
    try {
      const response = await fetch_sales_data();
      return response.data; // Devuelve los datos directamente
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return thunkAPI.rejectWithValue(error.message); // Manejo de errores adecuado
    }
  }
);

// Slice de Redux
const sales_data_slice = createSlice({
  name: 'sales_chart_data',
  initialState: {
    data: null,
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export default sales_data_slice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentSalesData } from "../../services/Cards_services";

export const fetch_current_sales = createAsyncThunk(
  "balance/fetch_current_sales",
  async (_, { rejectWithValue }) => {
    try {
      const current_sales = await getCurrentSalesData();
      return current_sales; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const CurrentSalesCardSlice = createSlice({
  name: 'current_sales',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch_current_sales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetch_current_sales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetch_current_sales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default CurrentSalesCardSlice.reducer;
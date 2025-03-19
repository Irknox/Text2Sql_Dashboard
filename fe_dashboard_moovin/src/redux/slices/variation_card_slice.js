import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSalesVariationData } from "../../services/Cards_services";

export const fetch_variation_data = createAsyncThunk(
  "balance/fetch_variation_data",
  async (_, { rejectWithValue }) => {
    try {
      const variation_data = await getSalesVariationData();
      console.log("variation_data", variation_data);
      return variation_data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const VariationCardSlice = createSlice({
  name: 'variation',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch_variation_data.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetch_variation_data.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetch_variation_data.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default VariationCardSlice.reducer;
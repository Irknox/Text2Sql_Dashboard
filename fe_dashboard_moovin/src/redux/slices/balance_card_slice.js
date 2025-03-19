import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBalanceData } from "../../services/Cards_services";

export const fetchBalanceData = createAsyncThunk(
  "balance/fetchBalanceData",
  async (_, { rejectWithValue }) => {
    try {
      const balanceData = await getBalanceData();      
      return balanceData; // Devuelve directamente los datos
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




const balanceCardSlice = createSlice({
  name: 'balance',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalanceData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBalanceData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchBalanceData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default balanceCardSlice.reducer;
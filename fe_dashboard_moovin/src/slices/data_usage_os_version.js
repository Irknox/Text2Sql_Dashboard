import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetch_data_usage_by_version_and_contract } from '../services/data_usage_os_version_service';

export const fetch_data_usage = createAsyncThunk(
  'dataUsage/fetch_data_usage',
  async () => {
    const data = await fetch_data_usage_by_version_and_contract();
    return data;
  }
);

const dataUsageSlice = createSlice({
  name: 'dataUsage',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch_data_usage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetch_data_usage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetch_data_usage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataUsageSlice.reducer;
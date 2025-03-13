import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChartData = createAsyncThunk(
  'chart/fetchChartData',
  async (dataset_id) => {
    const response = await fetch("http://localhost:8000/get-province-distribution/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dataset_id }),
    });
    const data = await response.json();
    return data.result[0].data.map(item => ({
      name: item.provincia,
      value: item.count
    }));
  }
);

const chartSlice = createSlice({
  name: 'chart',
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
        state.error = action.error.message;
      });
  },
});

export default chartSlice.reducer;
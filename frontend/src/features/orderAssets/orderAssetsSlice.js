import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderAssetsService from './orderAssetsService';

export const fetchOrderAssets = createAsyncThunk('orderAssets/fetchOrderAssets', async (_, thunkApi) => {
  try {
    return await orderAssetsService.fetchOrderAssets();
  }
  catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message)
      || error.message
      || error.toString();
    return thunkApi.rejectWithValue(message);
  }
})

const initialState = {
  assets: [
    {
      _id: '',
      assetType: '',
      bankName: '',
      provider: '',
      companyName: '',
      propertyAddress: '',
    }
  ],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};


const orderAssetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderAssets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderAssets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entities = { ...state.entities, ...action.payload.entities.assets };
      })
      .addCase(fetchOrderAssets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = orderAssetsSlice.actions;
export default orderAssetsSlice.reducer;
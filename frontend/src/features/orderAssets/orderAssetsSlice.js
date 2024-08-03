import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderAssetsService from './orderAssetsService';

// export const fetchOrderAssets = createAsyncThunk('orderAssets/fetchOrderAssets', async (_, thunkApi) => {
//   try {
//     return await orderAssetsService.fetchOrderAssets();
//   }
//   catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message)
//       || error.message
//       || error.toString();
//     return thunkApi.rejectWithValue(message);
//   }
// })

const initialState = [];


const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    updateAssetsSlice: (state, action) => {
        if (Array.isArray(action.payload)) {
            return action.payload;
        } else {
            state.push(action.payload);
        }
    },
    resetAssetsSlice: (state) => initialState,
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchOrderAssets.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(fetchOrderAssets.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.isSuccess = true;
  //       state.entities = { ...state.entities, ...action.payload.entities.assets };
  //     })
  //     .addCase(fetchOrderAssets.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.isError = true;
  //       state.message = action.payload;
  //     });
  // },
});

export const { resetAssetsSlice, updateAssetsSlice } = assetsSlice.actions;
export default assetsSlice.reducer;
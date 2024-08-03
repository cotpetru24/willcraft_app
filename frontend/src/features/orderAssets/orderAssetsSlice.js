// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import orderAssetsService from './orderAssetsService';


// const initialState = [];


// export const createAssetThunk = createAsyncThunk(
//   'assets/createAssetThunk',
//   async (assetData, thunkApi) => {

//       // Get the userId from the state
//       const userId = thunkApi.getState().auth.user._id;

//       // Add userId to assetData
//       const updatedAssetData = { ...assetData, userId };

//       try {
//           const token = thunkApi.getState().auth.user.token;
//           const createAssetResponse = await orderAssetsService.createAsset(updatedAssetData, token);

//           return createAssetResponse
//       }
//       catch (error) {
//           const message =
//               (error.response && error.response.data && error.response.data.message)
//               || error.message
//               || error.toString();
//           return thunkApi.rejectWithValue(message);
//       }
//   }
// );




// const assetsSlice = createSlice({
//   name: 'assets',
//   initialState,
//   reducers: {
//     updateAssetsSlice: (state, action) => {
//         if (Array.isArray(action.payload)) {
//             return action.payload;
//         } else {
//             state.push(action.payload);
//         }
//     },
//     resetAssetsSlice: (state) => initialState,
//   },
//   // extraReducers: (builder) => {
//   //   builder
//   //     .addCase(fetchOrderAssets.pending, (state) => {
//   //       state.isLoading = true;
//   //     })
//   //     .addCase(fetchOrderAssets.fulfilled, (state, action) => {
//   //       state.isLoading = false;
//   //       state.isSuccess = true;
//   //       state.entities = { ...state.entities, ...action.payload.entities.assets };
//   //     })
//   //     .addCase(fetchOrderAssets.rejected, (state, action) => {
//   //       state.isLoading = false;
//   //       state.isError = true;
//   //       state.message = action.payload;
//   //     });
//   // },
// });

// export const { resetAssetsSlice, updateAssetsSlice } = assetsSlice.actions;
// export default assetsSlice.reducer;



// export {
//   createAssetThunk,
// };




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderAssetsService from './orderAssetsService';

const initialState = [];

// Create Asset Thunk
export const createAssetThunk = createAsyncThunk(
  'assets/createAssetThunk',
  async (assetData, thunkApi) => {
    console.log(`create asset thunk called`)
    // Get the userId from the state
    const userId = thunkApi.getState().auth.user._id;

    // Add userId to assetData
    const updatedAssetData = { ...assetData, userId };

    try {
      const token = thunkApi.getState().auth.user.token;
      const createAssetResponse = await orderAssetsService.createAsset(updatedAssetData, token);

      return createAssetResponse;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateAssetThunk = createAsyncThunk(
  'assets/updateAssetThunk',
  async (assetData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const updatedAssetData = await orderAssetsService.updateAsset(assetData, token);

      return updatedAssetData;
    }
    catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message
        || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
)



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
  // Uncomment and complete extraReducers if needed
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

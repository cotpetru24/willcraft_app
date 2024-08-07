import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import orderAssetsService from './orderAssetsService';
import peopleService from '../people/peopleService';


const initialState = [];

// Create Asset Thunk
// export const createExecutorThunk = createAsyncThunk(
//   'executors/createExecutorThunk',
//   async (executorData, thunkApi) => {
//     console.log(`create asset thunk called`)
//     // Get the userId from the state
//     const userId = thunkApi.getState().auth.user._id;

//     // Add userId to assetData
//     const updatedExecutorData = { ...executorData, userId };

//     try {
//       const token = thunkApi.getState().auth.user.token;
//       const createExecutorResponse = await peopleService.createPerson(updatedExecutorData, token);

//       return createExecutorResponse;
//     }
//     catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkApi.rejectWithValue(message);
//     }
//   }
// );


// export const updateExecutorThunk = createAsyncThunk(
//   'executors/updateExecutorThunk',
//   async (executorData, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       const updatedExecutorData = await peopleService.updatePerson(executorData, token);

//       return updatedExecutorData;
//     }
//     catch (error) {
//       const message = (error.response && error.response.data && error.response.data.message)
//         || error.message
//         || error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// )


const additionalExecutorsSlice = createSlice({
  name: 'additionalExecutors',
  initialState,
  reducers: {
    updateAdditionalExecutorsSlice: (state, action) => {
      if (Array.isArray(action.payload)) {
        return action.payload;
      } else {
        state.push(action.payload);
      }
    },
    removeAdditionalExecutorSlice: (state, action) => {
      return state.filter(executor => executor._id !== action.payload);
    },

    resetAdditionalExecutorsSlice: (state) => initialState,
  },
});


export const {
  resetAdditionalExecutorsSlice: resetAdditionalExecutorsSlice,
  updateAdditionalExecutorsSlice: updateAdditionalExecutorsSlice,
  removeAdditionalExecutorSlice: removeAdditionalExecutorSlice
} = additionalExecutorsSlice.actions;
export default additionalExecutorsSlice.reducer;

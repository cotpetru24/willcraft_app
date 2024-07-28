import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateOrder, createOrder, getOrder, createPerson, getPerson, updatePerson } from "./orderService"; // Import named exports
import { updateTestatorSlice } from "../people/testatorSlice";


const initialState = {
    orderId: '',
    userId: '',
    status: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};



// Thunk for creating an order
export const createOrderThunk = createAsyncThunk(
    'orders/createOrder',
    async (orderData, thunkAPI) => {
        const userId = thunkAPI.getState().auth.user._id;
        const updatedOrderData = { ...orderData, userId };
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await createOrder(updatedOrderData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getOrderThunk = createAsyncThunk(
    'orders/getOrder',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const response = await getOrder(id, token);
            const testator = response.peopleAndRoles.find(p => p.role.includes("testator"));

            // Ensure response contains the testator data
            if (!testator) {
                throw new Error('Testator data is missing in the response');
            }
            thunkAPI.dispatch(updateTestatorSlice(testator.personId));

            return response;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.error('Error in getOrderThunk:', message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//need to test this function--------------------------
// export const updateOrderThunk = createAsyncThunk(
//     'orders/updateOrder',
//     async ({ id, orderData }, thunkAPI) => {
//         try {
//             const token = thunkAPI.getState().auth.user.token;
//             return await updateOrder(id, orderData, token);
//         } catch (error) {
//             const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// );

export const updateOrderThunk = createAsyncThunk(
    'orders/updateOrder',
    async ({ id, updateType, updateData }, thunkAPI) => {

        console.log(`update order called in order slice`)
      try {
        const token = thunkAPI.getState().auth.user.token;
        return await updateOrder(id, updateType, updateData, token);
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  


const currentOrderSlice = createSlice({
    name: 'currentOrder',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder


            .addCase(createOrderThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrderThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderId = action.payload._id;
                state.userId = action.payload.userId;
                state.status = action.payload.status;
                state.peopleAndRoles = action.payload.peopleAndRoles;
                state.assetsAndDistribution = action.payload.assetsAndDistribution;
            })
            .addCase(createOrderThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })


            .addCase(updateOrderThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrderThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderId = action.payload._id;
                state.userId = action.payload.userId;
                state.status = action.payload.status;
                state.peopleAndRoles = action.payload.peopleAndRoles;
                state.assetsAndDistribution = action.payload.assetsAndDistribution;
            })
            .addCase(updateOrderThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })


            .addCase(getOrderThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderId = action.payload._id;
                state.userId = action.payload.userId;
                state.status = action.payload.status;
            })
            .addCase(getOrderThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { reset } = currentOrderSlice.actions;

export default currentOrderSlice.reducer;

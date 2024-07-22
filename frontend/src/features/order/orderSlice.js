import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
// import { Order } from "../../schemas/schemas";


const initialState = {
    orderId: '',
    userId: '',
    status: '',
    peopleAndRoles: {},
    assetsAndDistribution: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    currentStep: 0,
};

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData, thunkAPI) => {
        // Get the userId from the state
        const userId = thunkAPI.getState().auth.user._id;

        const updatedOrderData = { ...orderData, userId };
        try {
            const token = thunkAPI.getState().auth.user.token;
            // const response = await orderService.createOrder(orderData);
            return await orderService.createOrder(updatedOrderData, token);

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getOrder = createAsyncThunk(
    'orders/getOrder',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await orderService.getOrder(id, token)
        }
        catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)




const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        reset: (state) => {
            state.orderId = '';
            state.userId = '';
            state.status = '';
            state.peopleAndRoles = {};
            state.assetsAndDistribution = {};
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
            state.currentStep = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderId = action.payload._id;
                state.userId = action.payload.userId;
                state.status = action.payload.status;
                state.peopleAndRoles = action.payload.peopleAndRoles;
                state.assetsAndDistribution = action.payload.assetsAndDistribution;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })




            .addCase(getOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orderId = action.payload._id;
                state.userId = action.payload.userId;
                state.status = action.payload.status;
                state.peopleAndRoles= action.payload.peopleAndRoles;
                state.assetsAndDistribution= action.payload.assetsAndDistribution;
                // state.peopleAndRoles = action.payload.peopleAndRoles;
                // state.assetsAndDistribution = action.payload.assetsAndDistribution;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

// export const { reset, updateTestator, updateCurrentStep } = orderSlice.actions;
export const { reset } = orderSlice.actions;

export default orderSlice.reducer;

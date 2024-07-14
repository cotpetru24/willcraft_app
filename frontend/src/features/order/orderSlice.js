import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";



export const saveOrderProgress = createAsyncThunk('order/saveOrderProgress', async ({ step, data }, thunkApi) => {
    try {
        // Save progress to the backend or local storage
        // Example: const response = await orderService.saveProgress(step, data);
        // return response;
        return { step, data };
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

// Async thunks
export const fetchOrders = createAsyncThunk('order/fetchOrders', async (_, thunkApi) => {
    try {
        const response = await orderService.fetchOrders();
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

export const fetchOrderById = createAsyncThunk('order/fetchOrderById', async (orderId, thunkApi) => {
    try {
        const response = await orderService.fetchOrderById(orderId);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

export const createOrder = createAsyncThunk('order/createOrder', async (testatorData, thunkApi) => {
    try {
        const response = await orderService.createOrder(testatorData);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

export const updateOrder = createAsyncThunk('order/updateOrder', async ({ orderId, orderData }, thunkApi) => {
    try {
        const response = await orderService.updateOrder(orderId, orderData);
        return response;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});

const initialState = {
    entities: {
        people: {},
        assets: {},
        order: {},
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    currentStep:0,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
            state.currentStep = 0;
        },
        updateTestator: (state, action) => {
            state.entities.people.testator = {
                ...state.entities.people.testator,
                ...action.payload
            };
        },
        updateCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.entities = {
                    ...state.entities,
                    order: action.payload.result,
                    people: action.payload.entities.people,
                    assets: action.payload.entities.assets,
                };
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.entities = {
                    ...state.entities,
                    order: action.payload.result,
                    people: action.payload.entities.people,
                    assets: action.payload.entities.assets,
                };
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.entities = {
                    ...state.entities,
                    order: action.payload.result,
                    people: action.payload.entities.people,
                    assets: action.payload.entities.assets,
                };
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.entities = {
                    ...state.entities,
                    order: action.payload.result,
                    people: action.payload.entities.people,
                    assets: action.payload.entities.assets,
                };
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(saveOrderProgress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(saveOrderProgress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Save progress to the state
                state.currentStep = action.payload.step;
                state.formData = action.payload.data;
            })
            .addCase(saveOrderProgress.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, updateTestator, updateCurrentStep } = orderSlice.actions;

export default orderSlice.reducer;

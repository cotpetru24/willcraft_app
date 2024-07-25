import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateOrder, createOrder, getOrder, createPerson, getPerson, updatePerson } from "./orderService"; // Import named exports

console.log({ updateOrder, createOrder, getOrder, createPerson, getPerson, updatePerson }); // Add this line to debug

const initialState = {
    orderId: '',
    userId: '',
    status: '',
    peopleAndRoles: [],
    assetsAndDistribution: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    currentStep: 0,
};

// Thunk for creating a person and optionally creating an order
export const createPersonThunk = createAsyncThunk(
    'orders/createPerson',
    async (personData, thunkAPI) => {
        const userId = thunkAPI.getState().auth.user._id;
        const updatedPersonData = { ...personData, userId };

        try {
            const token = thunkAPI.getState().auth.user.token;
            const orderId = thunkAPI.getState().order.orderId;

            const personResponse = await createPerson(updatedPersonData, token);

            if (!orderId) {
                const orderData = { peopleAndRoles: [{ personId: personResponse._id, role: ['testator'] }] };
                const createdOrder = await thunkAPI.dispatch(createOrderThunk(orderData)).unwrap();
                return { ...personResponse, orderId: createdOrder._id };
            } else {
                return personResponse;
            }
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updatePersonThunk = createAsyncThunk(
    'orders/people/updatePerson',
    async ({ id, personData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await updatePerson(id, personData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateOrderThunk = createAsyncThunk(
    'orders/updateOrder',
    async ({ id, orderData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await updateOrder(id, orderData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

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

// Thunk for getting an order
export const getOrderThunk = createAsyncThunk(
    'orders/getOrder',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await getOrder(id, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
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
                state.peopleAndRoles = action.payload.peopleAndRoles;
                state.assetsAndDistribution = action.payload.assetsAndDistribution;
            })
            .addCase(getOrderThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createPersonThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPersonThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { _id, title, fullLegalName, fullAddress, dob, email, tel, userId, orderId } = action.payload;
                state.peopleAndRoles.push({ personId: { _id, title, fullLegalName, fullAddress, dob, email, tel, userId }, role: ['testator'] });
            })
            .addCase(createPersonThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updatePersonThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePersonThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const updatedPerson = action.payload;
                const personIndex = state.peopleAndRoles.findIndex(person => person.personId._id === updatedPerson._id);
                if (personIndex >= 0) {
                    state.peopleAndRoles[personIndex].personId = updatedPerson;
                }
            })
            .addCase(updatePersonThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = orderSlice.actions;

export default orderSlice.reducer;

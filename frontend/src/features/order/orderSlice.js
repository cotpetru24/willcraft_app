import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

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
export const createPerson = createAsyncThunk(
    'orders/createPerson',
    async (personData, thunkAPI) => {
        const userId = thunkAPI.getState().auth.user._id;
        const updatedPersonData = { ...personData, userId };

        try {
            const token = thunkAPI.getState().auth.user.token;
            const orderId = thunkAPI.getState().order.orderId;

            const personResponse = await orderService.createPerson(updatedPersonData, token);

            if (!orderId) {
                const orderData = { peopleAndRoles: [{ personId: personResponse._id, role: ['testator'] }] };
                const createdOrder = await thunkAPI.dispatch(createOrder(orderData)).unwrap();
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

export const updatePerson = createAsyncThunk(
    'orders/people/updatePerson',
    async ({id, personData}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await orderService.updatePerson(id, personData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// Thunk for creating an order
export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData, thunkAPI) => {
        const userId = thunkAPI.getState().auth.user._id;
        const updatedOrderData = { ...orderData, userId };
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await orderService.createOrder(updatedOrderData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Thunk for getting an order
export const getOrder = createAsyncThunk(
    'orders/getOrder',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await orderService.getOrder(id, token);
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
                state.peopleAndRoles = action.payload.peopleAndRoles;
                state.assetsAndDistribution = action.payload.assetsAndDistribution;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createPerson.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPerson.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { _id, title, fullLegalName, fullAddress, dob, email, tel, userId, orderId } = action.payload;
                state.peopleAndRoles.push({ personId: { _id, title, fullLegalName, fullAddress, dob, email, tel, userId }, role: ['testator'] });
            })
            .addCase(createPerson.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(updatePerson.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePerson.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const updatedPerson = action.payload;
                const personIndex = state.peopleAndRoles.findIndex(person => person.personId._id === updatedPerson._id);
                if (personIndex >= 0) {
                  state.peopleAndRoles[personIndex].personId = updatedPerson;
                }
              })
            .addCase(updatePerson.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = orderSlice.actions;

export default orderSlice.reducer;

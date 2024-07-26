import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateOrder, createOrder, getOrder, createPerson, getPerson, updatePerson } from "../order/orderService"; // Import named exports

console.log({ updateOrder, createOrder, getOrder, createPerson, getPerson, updatePerson }); // Add this line to debug

const initialState = {
    executors: [
        {
            _id: '',
            title: '',
            fullLegalName: '',
            fullAddress: '',
            dob: '',
            email: '',
            tel: '',
        }
    ],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};


export const updatePersonThunk = createAsyncThunk(
    'orders/people/updatePerson',
    async ({ id, personData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await updatePerson(id, personData, token);
            console.log(`update person called`)

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const createPersonThunk = createAsyncThunk(
    'orders/createPerson',
    async (personData, thunkAPI) => {
        const userId = thunkAPI.getState().auth.user._id;
        const { role, ...updatedPersonData } = { ...personData, userId }; // Destructure role

        try {
            const token = thunkAPI.getState().auth.user.token;
            const orderId = thunkAPI.getState().order.orderId;

            const personResponse = await createPerson(updatedPersonData, token);

            if (!orderId) {
                console.log('no order id')
                const orderData = { peopleAndRoles: [{ personId: personResponse._id, role: ['testator'] }] };
                const createdOrder = await thunkAPI.dispatch(createOrder(orderData)).unwrap();
                return { ...personResponse, orderId: createdOrder._id, role }; // Include role in returned payload
            } else {
                console.log(`order id when creating a new person ${orderId}`)
                return { ...personResponse, role }; // Include role in returned payload
            }
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);



const executorsSlice = createSlice({
    name: 'executors',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder

            .addCase(createPersonThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPersonThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { _id, title, fullLegalName, fullAddress, dob, email, tel, userId, orderId, role, maritalStatus } = action.payload;
                state.peopleAndRoles.push({
                    personId: { _id, title, fullLegalName, fullAddress, dob, email, tel, maritalStatus, userId }, role: [role] // Use the role from the payload
                });
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

export const { reset } = executorsSlice.actions;

export default executorsSlice.reducer;

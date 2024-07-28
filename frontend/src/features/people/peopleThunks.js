import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderThunk } from "../order/orderSlice";
import peopleService from "./peopleService";


export const createPersonThunk = createAsyncThunk(
    'people/createPerson',
    async (personData, thunkApi) => {
        // Get the userId from the state
        const userId = thunkApi.getState().auth.user._id;
        // Add userId to personData
        const updatedPersonData = { ...personData, userId };


        try {
            const token = thunkApi.getState().auth.user.token;
            const createPersonResponse = await peopleService.createPerson(updatedPersonData, token);

            //create a new order if there is no orderId
            const orderId = thunkApi.getState().currentOrder.orderId;
            if (!orderId) {
                const orderData = {
                    peopleAndRoles: [{ personId: createPersonResponse._id, role: ['testator'] }],
                };

                const newOrder = await thunkApi.dispatch(createOrderThunk(orderData)).unwrap();

                return { ...createPersonResponse, orderId: newOrder._id }; // Return both person and new order ID
            } else {
                return createPersonResponse;
            }

        }
        catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();
            return thunkApi.rejectWithValue(message);
        }
    });

export const updatePersonThunk = createAsyncThunk(
    'people/updatePerson',
    async (personData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;


            //add this to people service
            return await peopleService.updatePerson( personData, token);


        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);





















// export const getPerson = createAsyncThunk('people/fetchPeople', async (_, thunkApi) => {
//     try {
//         return await peopleService.fetchPeople();
//     }
//     catch (error) {
//         const message =
//             (error.response && error.response.data && error.response.data.message)
//             || error.message
//             || error.toString();
//         return thunkApi.rejectWithValue(message);
//     }
// });

const peopleThunks = {
    createPersonThunk,
    updatePersonThunk
}

export default peopleThunks;

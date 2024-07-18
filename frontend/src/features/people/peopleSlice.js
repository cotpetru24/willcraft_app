import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import peopleService from "./peopleService";
import { useState } from '@reduxjs/toolkit'
import { createOrder } from "../order/orderSlice";

const initialState = {
    people: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};



export const createPerson = createAsyncThunk('api/people',
    async (personData, thunkApi) => {
        // Get the userId from the state
        const userId = thunkApi.getState().auth.user._id;
        // Add userId to personData
        const updatedPersonData = { ...personData, userId };


        try {
            const token = thunkApi.getState().auth.user.token;
            const orderId = thunkApi.getState().order.orderId;

            const testatorData = await peopleService.createPerson(updatedPersonData, token);
            console.log('Response:', testatorData);

            if (!orderId) {
                console.log('Creating a new order since no orderId exists');
                const orderData = { 
                    peopleAndRoles: [{ personId: testatorData._id, role: ['testator'] }],
                    // userId 
                };
                const createdOrder = await thunkApi.dispatch(createOrder(orderData)).unwrap();
                console.log('Created Order:', createdOrder);

                return { ...testatorData, orderId: createdOrder._id }; // Return both person and new order ID
            } else {
                return testatorData;
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




export const getPerson = createAsyncThunk('people/fetchPeople', async (_, thunkApi) => {
    try {
        return await peopleService.fetchPeople();
    }
    catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message)
            || error.message
            || error.toString();
        return thunkApi.rejectWithValue(message);
    }
});



const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {
        reset: state => initialState
    },

    extraReducers: (builder) => {
        builder
            .addCase(createPerson.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPerson.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { _id, title, fullLegalName, fullAddress, dob, email, tel, userId, orderId } = action.payload;
                state.people.push({ _id, title, fullLegalName, fullAddress, dob, email, tel, userId });

            })
            .addCase(createPerson.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = peopleSlice.actions;
export default peopleSlice.reducer;

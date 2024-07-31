import { createSlice } from "@reduxjs/toolkit";
import testatorThunks from "./testatorThunks";

const initialState = {
    _id: '',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: '',
    maritalStatus: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};


const testatorSlice = createSlice({
    name: 'testator',
    initialState,
    reducers: {
        updateTestatorSlice: (state, action) => {
            const { _id, title, fullLegalName, fullAddress, dob, email, tel, maritalStatus } = action.payload;
            state._id = _id;
            state.title = title;
            state.fullLegalName = fullLegalName;
            state.fullAddress = fullAddress;
            state.dob = dob;
            state.email = email || '';
            state.tel = tel || '';
            state.maritalStatus = maritalStatus || '';
        },
        resetTestatorSlice: (state) => initialState,
    },
    extraReducers: (builder) => {

        builder


            //create Testator cases 
            .addCase(testatorThunks.createTestatorThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(testatorThunks.createTestatorThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                const { _id, title, fullLegalName, fullAddress, email, dob, tel, maritalStatus } = action.payload;

                state._id = _id;
                state.title = title;
                state.fullLegalName = fullLegalName;
                state.fullAddress = fullAddress;
                state.dob = dob;
                state.email = email || '';
                state.tel = tel || '';
                state.maritalStatus = maritalStatus || '';
            })
            .addCase(testatorThunks.createTestatorThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })


            //Update testator cases
            .addCase(testatorThunks.updateTestatorThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(testatorThunks.updateTestatorThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                const { _id, title, fullLegalName, fullAddress, dob, email, tel, maritalStatus } = action.payload;

                state._id = _id;
                state.title = title;
                state.fullLegalName = fullLegalName;
                state.fullAddress = fullAddress;
                state.dob = dob;
                state.email = email || '';
                state.tel = tel || '';
                state.maritalStatus = maritalStatus || '';
            })
            .addCase(testatorThunks.updateTestatorThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { updateTestatorSlice, resetTestatorSlice } = testatorSlice.actions;

export default testatorSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import peopleThunks from "./peopleThunks";

const initialState = {
    _id:'',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel:'',
    maritalStatus:'',
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
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder



            //create Testator cases 
            .addCase(peopleThunks.createPersonThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(peopleThunks.createPersonThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { _id, title, fullLegalName, fullAddress, dob, email, tel, maritalStatus } = action.payload;
                state._id = _id;
                state.title=title;
                state.fullLegalName=fullLegalName;
                state.fullAddress=fullAddress;
                state.dob=dob;
                state.email=email||'';
                state.tel=tel ||'';
                state.maritalStatus=maritalStatus ||'';
              })
            .addCase(peopleThunks.createPersonThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })




            //Update testator cases
            .addCase(peopleThunks.updatePersonThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(peopleThunks.updatePersonThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { _id, title, fullLegalName, fullAddress, dob, email, tel, maritalStatus } = action.payload;
                state._id = _id;
                state.title=title;
                state.fullLegalName=fullLegalName;
                state.fullAddress=fullAddress;
                state.dob=dob;
                state.email=email||'';
                state.tel=tel ||'';
                state.maritalStatus=maritalStatus ||'';
            })
            .addCase(peopleThunks.updatePersonThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { updateTestatorSlice, reset } = testatorSlice.actions;

export default testatorSlice.reducer;

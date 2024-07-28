import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import peopleThunks from "./peopleThunks";

const initialState = {
    _id:'',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel:'',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};


const spouseOrPartnerSlice = createSlice({
    name: 'spouseOrPartner',
    initialState,
    reducers: {
        updateSpouseOrPartnerSlice: (state, action) => {
            const { _id, title, fullLegalName, fullAddress, dob, email, tel } = action.payload;
            state._id = _id;
            state.title = title;
            state.fullLegalName = fullLegalName;
            state.fullAddress = fullAddress;
            state.dob = dob;
            state.email = email || '';
            state.tel = tel || '';
        },
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder



            //create SpouseOrPartner cases 
            .addCase(peopleThunks.createPersonThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(peopleThunks.createPersonThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { _id, title, fullLegalName, fullAddress, dob, email, tel } = action.payload;
                state._id = _id;
                state.title=title;
                state.fullLegalName=fullLegalName;
                state.fullAddress=fullAddress;
                state.dob=dob;
                state.email=email||'';
                state.tel=tel ||'';
              })
            .addCase(peopleThunks.createPersonThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })




            //Update SpouseOrPartner cases
            .addCase(peopleThunks.updatePersonThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(peopleThunks.updatePersonThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { _id, title, fullLegalName, fullAddress, dob, email, tel } = action.payload;
                state._id = _id;
                state.title=title;
                state.fullLegalName=fullLegalName;
                state.fullAddress=fullAddress;
                state.dob=dob;
                state.email=email||'';
                state.tel=tel ||'';
            })
            .addCase(peopleThunks.updatePersonThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { updateSpouseOrPartnerSlice, reset } = spouseOrPartnerSlice.actions;

export default spouseOrPartnerSlice.reducer;


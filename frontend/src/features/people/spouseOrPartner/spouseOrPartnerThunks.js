import { createAsyncThunk } from "@reduxjs/toolkit";
import peopleService from "../peopleService";


export const createSpouseOrPartnerThunk = createAsyncThunk(
    'people/createSpouseOrPartner',
    async (personData, thunkApi) => {
        // Get the userId from the state
        const userId = thunkApi.getState().auth.user._id;
        // Add userId to personData
        const updatedPersonData = { ...personData, userId };

        try {
            const token = thunkApi.getState().auth.user.token;
            const createSpouseOrPartnerResponse = await peopleService.createPerson(updatedPersonData, token);

            return createSpouseOrPartnerResponse
        }
        catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();
            return thunkApi.rejectWithValue(message);
        }
    });

export const updateSpouseOrPartnerThunk = createAsyncThunk(
    'people/updateSpouseOrPartner',
    async (personData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;

            //add this to people service
            return await peopleService.updatePerson(personData, token);
        }
        catch (error) {
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

const spouseOrPartnerThunks = {
    createSpouseOrPartnerThunk,
    updateSpouseOrPartnerThunk
}

export default spouseOrPartnerThunks;

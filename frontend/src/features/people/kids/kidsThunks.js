import { createAsyncThunk } from "@reduxjs/toolkit";
import peopleService from "../peopleService";


export const createKidThunk = createAsyncThunk(
    'people/createKid',
    async (kidData, thunkApi) => {

        // Get the userId from the state
        const userId = thunkApi.getState().auth.user._id;

        // Add userId to personData
        const updatedKidData = { ...kidData, userId };

        try {
            const token = thunkApi.getState().auth.user.token;
            const createSpouseOrPartnerResponse = await peopleService.createPerson(updatedKidData, token);

            return createSpouseOrPartnerResponse
        }
        catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();
            return thunkApi.rejectWithValue(message);
        }
    }
);


export const updateKidThunk = createAsyncThunk(
    'people/updateKid',
    async (kidData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const updateSpouseOrPartner = await peopleService.updatePerson(kidData, token);

            return updateSpouseOrPartner;
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const kidThunks = {
    createKidThunk,
    updateKidThunk
}

export default kidThunks;

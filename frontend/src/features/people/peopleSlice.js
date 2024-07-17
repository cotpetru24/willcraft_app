import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import peopleService from "./peopleService";

const initialState = {
    people: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};



export const createPerson = createAsyncThunk('people/create',
    async (personData, thunkApi) => {
        try {
            const token = thunkApi.getState().auth.user.token;
            return await peopleService.createPerson(personData, token);
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
                state.people.push(action.payload)
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

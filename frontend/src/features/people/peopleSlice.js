import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import peopleService from "./peopleService";

const initialState = {
    people: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const fetchPeople = createAsyncThunk('people/fetchPeople', async (_, thunkApi) => {
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

export const storePerson = createAsyncThunk('people/storePerson', async (personData, thunkApi) => {
    try {
        return await peopleService.storePerson(personData);
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
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // .addCase(fetchPeople.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(fetchPeople.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            //     state.people = { ...state.people, ...action.payload.entities.people };
            // })
            // .addCase(fetchPeople.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.message = action.payload;
            // })
            .addCase(storePerson.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(storePerson.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Add the new person to the people state
                state.people[action.payload.id] = action.payload;
            })
            .addCase(storePerson.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = peopleSlice.actions;
export default peopleSlice.reducer;

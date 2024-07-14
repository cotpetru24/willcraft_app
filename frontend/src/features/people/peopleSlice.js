import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import peopleService from "./peopleService";


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
})

const initialState = {
    entities: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};


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
            .addCase(fetchPeople.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPeople.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.entities = { ...state.entities, ...action.payload.entities.people };
            })
            .addCase(fetchPeople.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
})

export const { reset } = peopleSlice.actions;
export default peopleSlice.reducer;
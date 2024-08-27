import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderThunk } from "../../currentOrder/currentOrderSlice";
import { createMessage } from "./messagesService";


export const createMessageThunk = createAsyncThunk(
    'messages/createMessage',
    async (messageData, thunkApi) => {

        // Get the userId from the state
        const userId = thunkApi.getState().auth.user._id;

        if (userId) {
            const updatedMessageData = { ...messageData, userId };
        }

        try {
            const createMessageResponse = userId
                ? await createMessage(updatedMessageData)
                : await createMessage(messageData);

            return createMessageResponse;

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


const messagesThunks = {
    createMessageThunk
}

export default messagesThunks;

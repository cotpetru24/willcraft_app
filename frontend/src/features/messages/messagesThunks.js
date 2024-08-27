import { createAsyncThunk } from "@reduxjs/toolkit";
import { createMessage } from "./messagesService";

// export const createMessageThunk = createAsyncThunk(
//     'messages/createMessage',
//     async (messageData, thunkApi) => {
//         console.log('createMessageThunk called');
        
//         // Get the userId from the state
//         const userId = thunkApi.getState().auth.user._id;
//         console.log('userId:', userId);

//         // Declare updatedMessageData outside of the if block
//         let updatedMessageData = messageData;

//         if (userId) {
//             updatedMessageData = { ...messageData, userId };
//         }

//         // Log the final message data that will be sent to the API
//         console.log('Final message data being sent:', updatedMessageData);

//         try {
//             const createMessageResponse = userId
//                 ? await createMessage(updatedMessageData)
//                 : await createMessage(messageData);

//             // Log the response from the API
//             console.log('Response from createMessage API:', createMessageResponse);

//             return createMessageResponse;

//         } catch (error) {
//             // Log any error that occurs during the API call
//             console.error('Error in createMessageThunk:', error);

//             const message =
//                 (error.response && error.response.data && error.response.data.message) ||
//                 error.message ||
//                 error.toString();

//             // Log the error message being returned
//             console.error('Returning error message:', message);

//             return thunkApi.rejectWithValue(message);
//         }
//     }
// );



export const createMessageThunk = createAsyncThunk(
    'messages/createMessage',
    async (messageData, thunkApi) => {
        console.log('createMessageThunk called');
        
        // Get the user from the state
        const user = thunkApi.getState().auth.user;
        const userId = user ? user._id : null;
        console.log('userId:', userId);

        // Include userId in messageData only if it exists
        const updatedMessageData = userId ? { ...messageData, userId } : messageData;

        // Log the final message data that will be sent to the API
        console.log('Final message data being sent:', updatedMessageData);

        try {
            // Send the message data to the API
            const createMessageResponse = await createMessage(updatedMessageData);

            // Log the response from the API
            console.log('Response from createMessage API:', createMessageResponse);

            return createMessageResponse;

        } catch (error) {
            // Log any error that occurs during the API call
            console.error('Error in createMessageThunk:', error);

            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            // Log the error message being returned
            console.error('Returning error message:', message);

            return thunkApi.rejectWithValue(message);
        }
    }
);


const messagesThunks = {
    createMessageThunk
}

export default messagesThunks;

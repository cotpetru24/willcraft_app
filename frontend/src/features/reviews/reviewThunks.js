import { createAsyncThunk } from "@reduxjs/toolkit";
import { createReview } from "./reviewService";





export const createReviewThunk = createAsyncThunk(
    'messages/createMessage',
    async (reviewData, thunkApi) => {
        console.log('createReviewThunk called');
        
 

        // Log the final message data that will be sent to the API
        console.log('review data:', reviewData);

        try {
            const token = thunkApi.getState().auth.user.token;
            // Send the message data to the API
            const createReviewResponse = await createReview(reviewData, token);

            // Log the response from the API
            console.log('Response from createMessage API:', createReviewResponse);

            return createReviewResponse;

        } catch (error) {
            // Log any error that occurs during the API call
            console.error('Error in createReviewThunk:', error);

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


const reviewThunks = {
    createReviewThunk
}

export default reviewThunks;

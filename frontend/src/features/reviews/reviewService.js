import axios from "axios";
const API_URL = '/api/reviews/';



export const createReview = async (reviewData, token ) => {
    console.log('create review service called');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, reviewData, config);
    return response.data;

}



const reviewsService = { createReview};

export default reviewsService;

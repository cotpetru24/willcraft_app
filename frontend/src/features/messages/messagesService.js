import axios from "axios";
const API_URL = '/api/messages/';



export const createMessage = async (messageData, ) => {
    console.log('create message service called');

    const response = await axios.post(API_URL, messageData);
    return response.data;
}



const messagesService = { createMessage};

export default messagesService;

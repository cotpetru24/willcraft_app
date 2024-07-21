import axios from "axios";
const API_URL = '/api/orders/';


const createOrder = async (orderData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, orderData, config);
    return response.data;
}


const getOrder = async (id, token)=>{
    const config ={
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + id, config)
    return response.data
}


const orderService = { createOrder, getOrder };

export default orderService;
import axios from "axios";
const API_URL = '/api/order/';

// const fetchOrders = async ()=>{
//     const response = await axios.get(API_URL);
//     const normalizedData = normalize(response.data, [order]);
//     return normalizedData;
// }

// const fetchOrderById = async (orderId)=>{
//     const response = await axios(`${API_URL}${orderId}`);
//     const normalizedData = normalize(response.data, order)
//     return normalizedData;
// }

// const updateOrder = async (orderId, orderData) => {
//     const response = await axios.put(`${API_URL}${orderId}`, orderData);
//     const normalizedData =normalize(response.data, order);
//     return normalizedData;
// }











const createOrder = async (orderData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, orderData, config);
    return response.data;
}














// const orderService = {
//     fetchOrders,
//     fetchOrderById,
//     createOrder,
//     updateOrder,
// };



const orderService = { createOrder };

export default orderService;
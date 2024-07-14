import axios from "axios";
import { normalize } from "normalizr";
import { order } from "../../schemas/schemas";

const API_URL = '/api/orders';

const fetchOrders = async ()=>{
    const response = await axios.get(API_URL);
    const normalizedData = normalize(response.data, [order]);
    return normalizedData;
}

const fetchOrderById = async (orderId)=>{
    const response = await axios(`${API_URL}${orderId}`);
    const normalizedData = normalize(response.data, order)
    return normalizedData;
}

const createOrder = async (testatorData)=>{
    const response = await axios.post(API_URL, {
        ...testatorData,
        status: 'creatingOrder'
    })
    const normalizedData = normalize(response.data, order);
    return normalizedData;
}

const updateOrder = async (orderId, orderData) => {
    const response = await axios.put(`${API_URL}${orderId}`, orderData);
    const normalizedData =normalize(response.data, order);
    return normalizedData;
}

const orderService = {
    fetchOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
};

export default orderService;
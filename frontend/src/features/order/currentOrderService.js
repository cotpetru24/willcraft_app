import axios from 'axios';
const API_ORDER_URL = '/api/orders/';



export const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_ORDER_URL, orderData, config);
  return response.data;
};

export const getOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(API_ORDER_URL + id, config);
  return response.data;
};

// export const updateOrder = async (id, orderData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
//   const response = await axios.put(API_ORDER_URL + id, orderData, config);
//   return response.status;
// };



export const updateOrder = async (id, updateType, updateData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
      // 'Content-Type': 'application/json'
    }
  };
  const response = await axios.put(API_ORDER_URL+id, { updateType, updateData }, config);
  return response.data;
};

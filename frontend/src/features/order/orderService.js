
// // Order-related API calls
// const createOrder = async (orderData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
//   const response = await axios.post(API_ORDER_URL, orderData, config);
//   return response.data;
// };



//
// const updateOrder = async(id, orderData, token)=>{
//   const config ={
//     headers:{
//       Authorization:`Bearer ${token}`
//     }
//   }
//   const response = axios.put(API_ORDER_URL+id, orderData, config)
//   return (await response).data;
// }

// const orderService = { updateOrder, createOrder, getOrder, createPerson, getPerson, updatePerson };

// export default orderService;



import axios from 'axios';

const API_ORDER_URL = '/api/orders/';


// Order-related API calls
export const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_ORDER_URL, orderData, config);
  return response.data;
};

// export const getOrder = async (id, token) => {
//   console.log(`get order called in orderservice with id ${id}`)
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
//   console.log(`get order url in orderservice: ${API_ORDER_URL + id}`)

//   const response = await axios.get(API_ORDER_URL + id, config);
//   return response.data;
// };

export const getOrder = async (id, token) => {
  console.log(`get order called in orderservice with id ${id}`);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  console.log(`get order url in orderservice: ${API_ORDER_URL + id}`);

  const response = await axios.get(API_ORDER_URL + id, config);
  console.log(`API response from getOrder:`, response.data); // Log the API response
  return response.data;
};


















export const updateOrder = async (id, orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put(API_ORDER_URL + id, orderData, config);
  return response.status;
};




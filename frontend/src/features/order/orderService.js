import axios from 'axios';

const API_ORDER_URL = '/api/orders/';
const API_PEOPLE_URL = '/api/orders/people/';

// Order-related API calls
const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_ORDER_URL, orderData, config);
  return response.data;
};

const getOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_ORDER_URL + id, config);
  return response.data;
};

// People-related API calls
const createPerson = async (personData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_PEOPLE_URL, personData, config);
  return response.data;
};

const getPerson = async () => {
  const response = await axios.get(API_PEOPLE_URL);
  return response.data;
};


const updatePerson = async(id, personData, token)=>{
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
     const response = axios.put(API_PEOPLE_URL+id, personData,config);
     return (await response).data;
}

const updateOrder = async(id, orderData, token)=>{
  const config ={
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
  const response = axios.put(API_ORDER_URL+id, orderData, config)
  return (await response).data;
}

const orderService = { updateOrder, createOrder, getOrder, createPerson, getPerson, updatePerson };

export default orderService;

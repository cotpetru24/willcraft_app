import axios from 'axios';

const API_ORDER_URL = '/api/orders/';
const API_PEOPLE_URL = '/api/people/';

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

const orderService = { createOrder, getOrder, createPerson, getPerson };

export default orderService;

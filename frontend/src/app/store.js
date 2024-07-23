import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import orderReducer from '../features/order/orderSlice';
import ordersReducer from '../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,  
    orders: ordersReducer,
    order: orderReducer,
  }
});
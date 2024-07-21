import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import peopleReducer from '../features/people/peopleSlice';
import orderReducer from '../features/order/orderSlice';
import assetsReducer from '../features/orderAssets/orderAssetsSlice';
import ordersReducer from '../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,  
    orders: ordersReducer,
    order: orderReducer,
    people: peopleReducer
    // assets: assetsReducer,

  }
});
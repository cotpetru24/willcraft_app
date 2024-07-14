import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import peopleReducer from '../features/people/peopleSlice';
import orderReducer from '../features/order/orderSlice';
import assetsReducer from '../features/orderAssets/orderAssetsSlice'

export const store = configureStore({
  reducer: {
    order: orderReducer,
    // people: peopleReducer,
    // assets: assetsReducer,
    auth: authReducer,  
  }
});
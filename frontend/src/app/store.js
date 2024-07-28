import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import currentOrderReducer from '../features/order/orderSlice';
import ordersReducer from '../features/orders/ordersSlice';
import testatorReducer from '../features/people/testatorSlice';
import spouseOrPartnerReducer from '../features/people/spouseOrPartnerSlice';
import childrenReducer from '../features/people/childrenSlice';
import beneficiariesReducer from '../features/people/beneficiariesSlice';
import executorsReducer from '../features/people/executorsSlice';
import orderAssetsReducer from '../features/orderAssets/orderAssetsSlice';
import stepReducer from '../features/orderSteps/orderStepSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,  
    orders: ordersReducer,
    currentOrder: currentOrderReducer,
    step: stepReducer,
    testator:testatorReducer,
    // spouseOrPartner: spouseOrPartnerReducer,
    // children: childrenReducer,
    // beneficiaries: beneficiariesReducer,
    // assets: orderAssetsReducer,
    // executorsSlice: executorsReducer,

  },
  devTools: process.env.NODE_ENV !== 'production',
});




// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import rootReducer from './reducers'; // Your root reducer that combines all slices

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//     auth: authReducer,  
//     orders: ordersReducer,
//     order: orderReducer,
// });

// const persistor = persistStore(store);

// export { store, persistor };

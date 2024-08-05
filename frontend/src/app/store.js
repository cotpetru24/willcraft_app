import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import authReducer from '../features/auth/authSlice';
import currentOrderReducer from '../features/order/currentOrderSlice';
import ordersReducer from '../features/orders/ordersSlice';
import testatorReducer from '../features/people/testator/testatorSlice';
import spouseOrPartnerReducer from '../features/people/spouseOrPartner/spouseOrPartnerSlice';
import stepReducer from '../features/orderSteps/orderStepSlice'
import kidsReducer from '../features/people/kids/kidsSlice'
import assetsReducer from '../features/orderAssets/orderAssetsSlice'
import additionalBeneficiariesReducer from '../features/people/additionalBeneficiaries/additionalBeneficiariesSlice'
import executorsReducer from '../features/executors/executorsSlice'




export const store = configureStore({
  reducer: {
    auth: authReducer,  
    orders: ordersReducer,
    currentOrder: currentOrderReducer,

    //not sure if this is needed. if not => delete
    step: stepReducer,

    testator:testatorReducer,
    spouseOrPartner: spouseOrPartnerReducer,
    kids: kidsReducer,
    additionalBeneficiaries: additionalBeneficiariesReducer,
    assets: assetsReducer,
    executors: executorsReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
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

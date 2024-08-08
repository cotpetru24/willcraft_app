import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { loadState, saveState } from '../utils/localStorageUtils';
import logger from 'redux-logger';

import authReducer from '../features/auth/authSlice';
import currentOrderReducer from '../features/currentOrder/currentOrderSlice';
import ordersReducer from '../features/orders/ordersSlice';
import testatorReducer from '../features/people/testator/testatorSlice';
import spouseOrPartnerReducer from '../features/people/spouseOrPartner/spouseOrPartnerSlice';
import stepReducer from '../features/orderSteps/orderStepSlice';
import kidsReducer from '../features/people/kids/kidsSlice';
import assetsReducer from '../features/orderAssets/orderAssetsSlice';
import additionalBeneficiariesReducer from '../features/people/additionalBeneficiaries/additionalBeneficiariesSlice';
import additionalExecutorsReducer from '../features/additionalExecutors/additionalExecutorsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  currentOrder: currentOrderReducer,
  testator: testatorReducer,
  spouseOrPartner: spouseOrPartnerReducer,
  step: stepReducer,
  kids: kidsReducer,
  assets: assetsReducer,
  additionalBeneficiaries: additionalBeneficiariesReducer,
  additionalExecutors: additionalExecutorsReducer,
});

// Define the preloaded state using consistent keys
const preloadedState = {
  auth: loadState('auth'),
  orders: loadState('orders'),
  currentOrder: loadState('currentOrder'),
  testator: loadState('testator'),
  spouseOrPartner: loadState('spouseOrPartner'),
  kids: loadState('kids'),
  additionalBeneficiaries: loadState('additionalBeneficiaries'),
  assets: loadState('assets'),
  additionalExecutors: loadState('additionalExecutors'),
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(() => {
  saveState('auth', store.getState().auth);
  saveState('orders', store.getState().orders);
  saveState('currentOrder', store.getState().currentOrder);
  saveState('testator', store.getState().testator);
  saveState('spouseOrPartner', store.getState().spouseOrPartner);
  saveState('kids', store.getState().kids);
  saveState('additionalBeneficiaries', store.getState().additionalBeneficiaries);
  saveState('assets', store.getState().assets);
  saveState('additionalExecutors', store.getState().additionalExecutors);
});

export default store;







// import { configureStore } from '@reduxjs/toolkit';

// import rootReducer from './reducers';
// import { loadState, saveState } from '../utils/localStorageUtils';

// import logger from 'redux-logger';
// import authReducer from '../features/auth/authSlice';
// import currentOrderReducer from '../features/currentOrder/currentOrderSlice';
// import ordersReducer from '../features/orders/ordersSlice';
// import testatorReducer from '../features/people/testator/testatorSlice';
// import spouseOrPartnerReducer from '../features/people/spouseOrPartner/spouseOrPartnerSlice';
// import stepReducer from '../features/orderSteps/orderStepSlice';
// import kidsReducer from '../features/people/kids/kidsSlice';
// import assetsReducer from '../features/orderAssets/orderAssetsSlice';
// import additionalBeneficiariesReducer from '../features/people/additionalBeneficiaries/additionalBeneficiariesSlice';
// import additionalExecutorsReducer from '../features/additionalExecutors/additionalExecutorsSlice';




// const rootReducer = combineReducers({
//   auth: authReducer,
//   orders: ordersReducer,
//   currentOrder: currentOrderReducer,
//   testator: testatorReducer,
//   spouseOrPartner: spouseOrPartnerReducer,
//   step: stepReducer,
//   kids: kidsReducer,
//   assets: assetsReducer,
//   additionalBeneficiaries: additionalBeneficiariesReducer,
//   additionalExecutors: additionalExecutorsReducer,
// });




// // Define the preloaded state using consistent keys
// const preloadedState = {
//   auth: loadState('auth'),
//   orders: loadState('orders'),
//   currentOrder: loadState('currentOrder'),
//   testator: loadState('testator'),
//   spouseOrPartner: loadState('spouseOrPartner'),
//   kids: loadState('kids'),
//   additionalBeneficiaries: loadState('additionalBeneficiaries'),
//   assets: loadState('assets'),
//   additionalExecutors: loadState('additionalExecutors'),
// };

// export const store = configureStore({
//   reducer: rootReducer,
//   preloadedState,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//   devTools: process.env.NODE_ENV !== 'production',
// });

// store.subscribe(() => {
//   saveState('auth', store.getState().auth);
//   saveState('orders', store.getState().orders);
//   saveState('currentOrder', store.getState().currentOrder);
//   saveState('testator', store.getState().testator);
//   saveState('spouseOrPartner', store.getState().spouseOrPartner);
//   saveState('kids', store.getState().kids);
//   saveState('additionalBeneficiaries', store.getState().additionalBeneficiaries);
//   saveState('assets', store.getState().assets);
//   saveState('additionalExecutors', store.getState().additionalExecutors);
// });




// import { configureStore } from '@reduxjs/toolkit';



// import rootReducer from './reducers';
// import { loadState, saveState } from '../utils/localStorageUtils';

// import logger from 'redux-logger'
// import authReducer from '../features/auth/authSlice';
// import currentOrderReducer from '../features/currentOrder/currentOrderSlice';
// import ordersReducer from '../features/orders/ordersSlice';
// import testatorReducer from '../features/people/testator/testatorSlice';
// import spouseOrPartnerReducer from '../features/people/spouseOrPartner/spouseOrPartnerSlice';
// import stepReducer from '../features/orderSteps/orderStepSlice'
// import kidsReducer from '../features/people/kids/kidsSlice'
// import assetsReducer from '../features/orderAssets/orderAssetsSlice'
// import additionalBeneficiariesReducer from '../features/people/additionalBeneficiaries/additionalBeneficiariesSlice'
// import additionalExecutorsReducer from '../features/additionalExecutors/additionalExecutorsSlice';




// const preloadedState = {
//   orders: loadState('ordersReducer'),
//   currentOrder: loadState('currentOrderReducer'),
//   testator:loadState('testatorReducer'),
//   spouseOrPartner: loadState('spouseOrPartnerReducer'),
//   kids: loadState('kidsReducer'),
//   additionalBeneficiaries: loadState('additionalBeneficiariesReducer'),
//   assets: loadState('assetsReducer'),
//   additionalExecutors: loadState('additionalExecutorsReducer'),
// };





// export const store = configureStore({
//   reducer: rootReducer,
//   auth: authReducer, 
//   preloadedState,


//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
//   devTools: process.env.NODE_ENV !== 'production',
// });

// store.subscribe(() => {
//     saveState('orders', store.getState().orders);
//     saveState('currentOrder', store.getState().currentOrder);
//     saveState('testator', store.getState().testator);
//     saveState('spouseOrPartner', store.getState().spouseOrPartner);
//     saveState('kids', store.getState().kids);
//     saveState('additionalBeneficiaries', store.getState().additionalBeneficiaries);
//     saveState('assets', store.getState().assets);
//     saveState('additionalExecutors', store.getState().additionalExecutors);

// });


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

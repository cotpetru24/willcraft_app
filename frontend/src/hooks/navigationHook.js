// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { updateOrderThunk } from '../features/order/currentOrderSlice';

// const useNavigateAndUpdateOrder = (shouldNavigate, orderId, orderData) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (shouldNavigate) {
//       const updateOrder = async () => {
//         await dispatch(updateOrderThunk({ id: orderId, orderData }));
//         navigate('/creatingOrder');
//       };
//       updateOrder();
//     }
//   }, [shouldNavigate, orderId, orderData, dispatch, navigate, updateOrderThunk]);
// };

// export default useNavigateAndUpdateOrder;

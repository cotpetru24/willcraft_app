// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateCurrentStep, updateOrder } from '../features/order/orderSlice';
// import Testator from './Testator';
// import Executor from './Executor';
// import ProgressBar from './ProgressBar';

// const steps = [
//   'Testator',
//   'Executor',
//   'Assets',
//   'Beneficiaries',
//   'AssetDistribution',
//   'OrderReview'
// ];

// const OrderNavigation = () => {
//   const dispatch = useDispatch();
//   const currentStep = useSelector((state) => state.order.currentStep);
//   const order = useSelector((state) => state.order.entities.order);

//   const handleNext = (formData) => {
//     // Dispatch action to save current step data
//     if (currentStep === 0) {
//       dispatch(updateOrder({ orderId: order.id, orderData: { testator: formData } }));
//     } else if (currentStep === 1) {
//       dispatch(updateOrder({ orderId: order.id, orderData: { executor: formData } }));
//     } // Add other steps as needed

//     if (currentStep < steps.length - 1) {
//       dispatch(updateCurrentStep(currentStep + 1));
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 0) {
//       dispatch(updateCurrentStep(currentStep - 1));
//     }
//   };

//   const renderStep = (step) => {
//     switch (step) {
//       case 0:
//         return <Testator onNext={handleNext} />;
//       // case 1:
//       //   return <Executor onNext={handleNext} />;
//       // case 2:
//       //   return <Assets onNext={handleNext} />;
//       // case 3:
//       //   return <Beneficiaries onNext={handleNext} />;
//       // case 4:
//       //   return <AssetDistribution onNext={handleNext} />;
//       // case 5:
//       //   return <OrderReview onNext={handleNext} />;
//       default:
//         return <Testator onNext={handleNext} />;
//     }
//   };

//   return (
//     <div>
//       <ProgressBar />
//       <div>{renderStep(currentStep)}</div>
//       <div className="order-navigation-container">
//         <div id='back-btn-container'>
//           {currentStep > 0 && <button onClick={handleBack}>Back</button>}
//         </div>
//         <div id='next-btn-container'>
//           {currentStep < steps.length - 1 && <button onClick={() => handleNext()}>Next</button>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderNavigation;

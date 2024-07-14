import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentStep } from '../features/order/orderSlice';
import Testator from './Testator';
import Executor from './Executor';
import Assets from './Assets';
import Beneficiaries from './Beneficiaries';
import AssetDistribution from './AssetDistribution';
import OrderReview from './OrderReview';
import ProgressBar from './ProgressBar';

const steps = [
  'Testator',
  'Executor',
  'Assets',
  'Beneficiaries',
  'AssetDistribution',
  'OrderReview'
];

const OrderNavigation = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.order.currentStep);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      dispatch(updateCurrentStep(currentStep + 1));
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      dispatch(updateCurrentStep(currentStep - 1));
    }
  };

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return <Testator />;
      case 1:
        return <Executor />;
      case 2:
        return <Assets />;
      case 3:
        return <Beneficiaries />;
      case 4:
        return <AssetDistribution />;
      case 5:
        return <OrderReview />;
      default:
        return <Testator />;
    }
  };

  return (
    <div>
      <ProgressBar />

      <div>{renderStep(currentStep)}</div>
      <div className="order-navigation-container">
        <div id='back-btn-container'>
          {currentStep > 0 && <button onClick={handleBack}>Back</button>}
        </div>
        <div id='next-btn-container'>
          {currentStep < steps.length - 1 && <button onClick={handleNext}>Next</button>}
        </div>
      </div>
    </div>
  );
};

export default OrderNavigation;

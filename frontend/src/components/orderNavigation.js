import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nextStep, prevStep } from '../features/orderSteps/orderStepSlice';

const steps = ['/testator', '/spouseOrPartner', '/beneficiaries', '/assets', '/executors'];

const OrderNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector((state) => state.step.currentStep);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      dispatch(nextStep());
      navigate(steps[currentStep + 1]);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      dispatch(prevStep());
      navigate(steps[currentStep - 1]);
    }
  };

  return (
    <div>
      <button onClick={handlePrev} disabled={currentStep === 0}>
        Back
      </button>
      <button onClick={handleNext} disabled={currentStep === steps.length - 1}>
        Continue
      </button>
    </div>
  );
};

export default OrderNavigation;

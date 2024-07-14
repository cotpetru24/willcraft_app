import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderWithTestator, updateOrder } from '../features/order/orderSlice';

const OrderCreation = () => {
  const dispatch = useDispatch();
  const order = useSelector(state => state.order.entities.order);
  const user = useSelector(state => state.auth.user);

  const [testator, setTestator] = useState({ firstName: '', lastName: '' });

  const handleCreateOrder = () => {
    if (user) {
      dispatch(createOrderWithTestator({ userId: user.id, ...testator }));
    }
  };

  const handleUpdateOrder = (updatedData) => {
    if (order.id) {
      dispatch(updateOrder({ orderId: order.id, orderData: updatedData }));
    }
  };

  if (!order.id) {
    return (
      <div>
        <h1>Create Order</h1>
        <input
          type="text"
          placeholder="First Name"
          value={testator.firstName}
          onChange={(e) => setTestator({ ...testator, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={testator.lastName}
          onChange={(e) => setTestator({ ...testator, lastName: e.target.value })}
        />
        <button onClick={handleCreateOrder}>Create Order</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Continue Order</h1>
      {/* Form elements to update order details */}
      <button onClick={() => handleUpdateOrder({ status: 'creatingOrder', people: [], assets: [] })}>Save</button>
    </div>
  );
};

export default OrderCreation;












import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';


import React, { useState } from 'react';
import { saveOrderProgress } from '../features/order/orderSlice';
import Testator from './Testator';
import Executor from './Executor';
import Assets from './Assets';
import Beneficiaries from './Beneficiaries';
import AssetDistribution from './AssetDistribution';
import OrderReview from './OrderReview';



const steps = [
  'Testator',
  'Executor',
  'Assets',
  'Beneficiaries',
  'AssetDistribution',
  'OrderReview'
];



const OrderNavigation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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
    <section className='progress-bar'>
      <div className='progress-bar-container'>
        <ul>
          <li>
            <Link to='/testator'>Back</Link>
          </li>
          <li>
            <Link to='/executor'>save and continue later</Link>
          </li>
          <li>
            <Link to='/assets'>Next</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default OrderNavigation;

// return (
//   <div>
//     <div>{renderStep(currentStep)}</div>
//     <div className="navigation-buttons">
//       {currentStep > 0 && <button onClick={handleBack}>Back</button>}
//       {currentStep < steps.length - 1 && <button onClick={handleNext}>Next</button>}
//       {/* <button onClick={handleSaveAndContinueLater}>Save and Continue Later</button> */}
//     </div>
//   </div>
// );
// };

// export default OrderNavigation;


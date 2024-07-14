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

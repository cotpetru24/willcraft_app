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






// const Testator = ({ onNext }) => {


//     const handlePlaceSelected = (place) => {
//         console.log('Selected place: ', place);
//     };



//     const dispatch = useDispatch();
//     const people = useSelector(state => state.order.entities.people);

//     const [testator, setTestator] = useState({
//         fullName: '',
//         address: '',
//         dob: '',
//         email: '',
//         tel: '',
//         gender: '',
//         maritalStatus: '',
//         role: 'testator'
//     });

//     const [countryPhoneCode, setPhone] = useState(""); // Initialize the phone state here

//     useEffect(() => {
//         if (people.testator) {
//             setTestator(people.testator);
//         }
//     }, [people]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         const updatedTestator = { ...testator, [name]: value };
//         setTestator(updatedTestator);
//     };

//     const isFieldValid = (field) => field && field.trim() !== '';


//     return (
//         <>
//             <div className="section-container">
//                 <section className="creating-order-heading">
//                     <h1>Personal information</h1>
//                 </section>
//                 <section className="form">
//                     <form>
//                         <div className="form-group">
//                             <label htmlFor="fullName">Full legal name</label>
//                             <input
//                                 type="text"
//                                 id="fullName"
//                                 name="fullName"
//                                 value={testator.fullName}
//                                 onChange={handleInputChange}
//                                 required
//                                 className={isFieldValid(testator.fullName) ? 'input-valid' : 'input-invalid'}
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="address">Full address</label>
//                             <AddressAutocomplete
//                                 name="address"
//                                 value={testator.address}
//                                 handleInputChange={handleInputChange}
//                                 onPlaceSelected={handlePlaceSelected}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="dob">Date of Birth</label>
//                             <input
//                                 type="date"
//                                 id="dob"
//                                 name="dob"
//                                 value={testator.dob}
//                                 onChange={handleInputChange}
//                                 required
//                                 className={isFieldValid(testator.postcode) ? 'input-valid' : 'input-invalid'}

//                             /><br />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="email">Email (optional)</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={testator.email}
//                                 onChange={handleInputChange}
//                                 required

//                             /><br />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="tel">Phone Number (optional)</label>

//                             <input
//                                 type="tel"
//                                 id="tel"
//                                 name="tel"
//                                 value={testator.tel}
//                                 onChange={handleInputChange}
//                                 required

//                             /><br />
//                         </div>

//                         <div className="form-group">
//                             <label>Gender</label>
//                             <div className="radio-group">
//                                 <input
//                                     type="radio"
//                                     id="male"
//                                     name="gender"
//                                     value="male"
//                                     checked={testator.gender === 'male'}
//                                     onChange={handleInputChange}
//                                     className={isFieldValid(testator.postcode) ? 'input-valid' : 'input-invalid'}

//                                 />
//                                 <label htmlFor="male">Male</label>
//                             </div>
//                             <div className="radio-group">
//                                 <input
//                                     type="radio"
//                                     id="female"
//                                     name="gender"
//                                     value="female"
//                                     checked={testator.gender === 'female'}
//                                     onChange={handleInputChange}
//                                 />
//                                 <label htmlFor="female">Female</label>
//                             </div>
//                         </div>

//                         <div className="form-group">
//                             <label>Marital Status</label>
//                             <div className="radio-group">
//                                 <input
//                                     type="radio"
//                                     id="married"
//                                     name="maritalStatus"
//                                     value="married"
//                                     checked={testator.maritalStatus === 'married'}
//                                     onChange={handleInputChange}
//                                     className={isFieldValid(testator.maritalStatus) ? 'input-valid' : 'input-invalid'}
//                                 />
//                                 <label htmlFor="married">Married</label>
//                             </div>
//                             <div className="radio-group">
//                                 <input
//                                     type="radio"
//                                     id="single"
//                                     name="maritalStatus"
//                                     value="single"
//                                     checked={testator.maritalStatus === 'single'}
//                                     onChange={handleInputChange}
//                                 />
//                                 <label htmlFor="single">Single</label>
//                             </div>
//                         </div>
//                     </form>
//                 </section>

//                 <section className="form spouse-form-container">
//                     <button>+ Add spouse or partner</button>
//                 </section>

//                 <section className="form children-form-container">
//                     <button>+ Add child</button>
//                 </section>
//                 <PersonForm/>
//             </div>
//         </>
//     );
// }

// export default Testator;

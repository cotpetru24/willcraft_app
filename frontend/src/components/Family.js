import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonForm from "./PersonForm";
import useNavigateAndUpdateOrder from "../hooks/navigationHook";
import { createPersonThunk, updateOrderThunk, updatePersonThunk } from "../features/order/orderSlice"; // Update imports

const Family = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector(state => state.order);

  const [initialSpouseFormData, setInitialSpouseFormData] = useState({
    _id: '',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: ''
  });

  const handleMaritalStatusChange = (e) => {
    const newMaritalStatus = e.target.value;
    setMaritalStatus(newMaritalStatus);

    const testator = order.peopleAndRoles.find(p => p.role.includes("testator"));
    if (testator) {
      const testatorId = testator.personId._id;
      console.log(`updating person id: ${testatorId} adding status ${newMaritalStatus}`)
      dispatch(updatePersonThunk({ id: testatorId, personData: { maritalStatus: e.target.value } }))
      console.log(`updating person after`)

    }
  }

  const [maritalStatus, setMaritalStatus] = useState('')
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    const spouseData = order.peopleAndRoles.find(p => p.role.includes("spouseOrPartner"));
    if (spouseData) {
      const { personId } = spouseData;
      setInitialSpouseFormData({
        _id: personId._id || '',
        title: personId.title || '',
        fullLegalName: personId.fullLegalName || '',
        fullAddress: personId.fullAddress || '',
        dob: personId.dob || '',
        email: personId.email || '',
        tel: personId.tel || ''
      });
    }
  }, [order]);

  const onSubmit = async (formData, role) => {
    if (formData._id) {
      await dispatch(updatePersonThunk({ id: formData._id, personData: formData })); // Update thunk name
      setShouldNavigate(true);
    } else {
      console.log('creating new person triggered');
      const createdPerson = await dispatch(createPersonThunk({ ...formData, role })).unwrap(); // Update thunk name
      console.log(`the new person: ${JSON.stringify(createdPerson)}`);
      if (createdPerson) {
        console.log(`orderID= ${order.orderId}`);
        console.log(`orderData= ${JSON.stringify(order)}`);
        setShouldNavigate(true);
      }
    }
  };

  useNavigateAndUpdateOrder(shouldNavigate, order.orderId, order);

  return (
    <>
      <section>
        <div className="creatingOrder-section-heading-container">
          <h1>Your details</h1>
        </div>

        <div className="marital-status-container">
          <div>
            <h4>Are you married or have a partner?</h4>
          </div>
          <div className="marital-status-options-container">
            <div className="marital-status-radio-container">
              <input type="radio" id="marital-status-yes" name="marital-status" value="spouseOrPartner" onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-yes">Yes</label>
            </div>
            <div className="marital-status-radio-container">
              <input type="radio" id="marital-status-no" name="marital-status" value="sigle" onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-no">No</label>
            </div>
          </div>
        </div>

        {maritalStatus === 'spouseOrPartner' &&
          (
            <div className="creatingOrder-section-main-content-container">
              <PersonForm
                role="spouseOrPartner"
                initialFormData={initialSpouseFormData}
                onSubmit={onSubmit}
              />
            </div>
          )}
        <div className="creatingOrder-section-navigation-container">
          <button onClick={() => { navigate('/creatingOrder') }}>Back</button>
        </div>
      </section>
    </>
  );
}

export default Family;

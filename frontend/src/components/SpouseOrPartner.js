import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonForm from "./PersonForm";
import useNavigateAndUpdateOrder from "../hooks/navigationHook";
import OrderNavigation from "./OrderNavigation";
import { updatePersonThunk } from "../features/people/peopleThunks";

const SpouseOrPartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOrder = useSelector(state => state.currentOrder);
  const testator = useSelector(state=>state.testator)
  const spouseOrPartnerData = useSelector(state=> state.spouseOrPartner)


  const [initialSpouseFormData, setInitialSpouseFormData] = useState({
    _id: '',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: ''
  });


  const handleBack = () => {
    navigate('/creatingOrder');
  };

  const handleSaveAndContinue = () => {
    console.log("spouse form saved");
    navigate('/family');
  };


  const handleMaritalStatusChange = (e) => {
    const newMaritalStatus = e.target.value;
    setMaritalStatus(newMaritalStatus);

    if (testator) {
      const testatorId = testator._id;
      console.log(`updating person id: ${testatorId} adding status ${newMaritalStatus}`)
      dispatch(updatePersonThunk({ id: testatorId, personData: { maritalStatus: e.target.value } }))
      console.log(`updating person after`)

    }
  }

  const [maritalStatus, setMaritalStatus] = useState('')
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (spouseOrPartnerData) {
      setInitialSpouseFormData({
        _id: spouseOrPartnerData._id || '',
        title: spouseOrPartnerData.title || '',
        fullLegalName: spouseOrPartnerData.fullLegalName || '',
        fullAddress: spouseOrPartnerData.fullAddress || '',
        dob: spouseOrPartnerData.dob || '',
        email: spouseOrPartnerData.email || '',
        tel: spouseOrPartnerData.tel || ''
      });
    }
  }, [spouseOrPartnerData]);

  // const onSubmit = async (formData, role) => {
  //   if (formData._id) {
  //     await dispatch(updatePersonThunk({ id: formData._id, personData: formData })); // Update thunk name
  //     setShouldNavigate(true);
  //   } else {
  //     console.log('creating new person triggered');
  //     const createdPerson = await dispatch(createPersonThunk({ ...formData, role })).unwrap(); // Update thunk name
  //     console.log(`the new person: ${JSON.stringify(createdPerson)}`);
  //     if (createdPerson) {
  //       console.log(`orderID= ${currentOrder.orderId}`);
  //       console.log(`orderData= ${JSON.stringify(currentOrder)}`);
  //       setShouldNavigate(true);
  //     }
  //   }
  // };

  useNavigateAndUpdateOrder(shouldNavigate, currentOrder.orderId, currentOrder);

  return (
    <>
      <section>
        <div className="creatingOrder-section-heading-container">
          <h1>Your details</h1>
        </div>

        <div className="marital-status-container">
          <div>
            <h4>What is your marital status?</h4>
          </div>
          <div className="marital-status-options-container">
            <div className="marital-status-radio-container">
              <input type="radio" id="marital-status-yes" name="marital-status" value="married" onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-yes">Married</label>
            </div>
            <div className="marital-status-radio-container">
              <input type="radio" id="marital-status-no" name="marital-status" value="partner" onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-no">Living with partner</label>
            </div>
            <div className="marital-status-radio-container">
              <input type="radio" id="marital-status-no" name="marital-status" value="widowed" onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-no">Widowed</label>
            </div>
            <div className="marital-status-radio-container">
              <input type="radio" id="marital-status-no" name="marital-status" value="single" onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-no">Single</label>
            </div>
          </div>
        </div>

        {(maritalStatus === 'married' || maritalStatus === 'partner') &&
          (
            <div className="creatingOrder-section-main-content-container">
              <PersonForm
                role="spouseOrPartner"
                initialFormData={initialSpouseFormData}
                // onSubmit={onSubmit}
              />
            </div>
          )}


        <OrderNavigation
          onBack={handleBack}
          onSaveAndContinue={handleSaveAndContinue}
        />
      </section>
    </>
  );
}

export default SpouseOrPartner;

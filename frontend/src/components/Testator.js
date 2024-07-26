import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonForm from "./PersonForm";
import OrderNavigation from "./OrderNavigation";

const Testator = () => {
  const [initialTestatorFormData, setInitialTestatorFormData] = useState({
    _id: '',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: ''
  });

  const navigate = useNavigate();
  const testatorData = useSelector(state => state.testator);

  useEffect(() => {
    if (testatorData) {
      setInitialTestatorFormData({
        _id: testatorData._id || '',
        title: testatorData.title || '',
        fullLegalName: testatorData.fullLegalName || '',
        fullAddress: testatorData.fullAddress || '',
        dob: testatorData.dob || '',
        email: testatorData.email || '',
        tel: testatorData.tel || ''
      });
    }
  }, [testatorData]);

  const handleCancel = () => {
    navigate("/creatingOrder");
  };

  const handleBack = () => {
    navigate('/creatingOrder');
  };

  const handleSaveAndContinue = () => {
    //here must update the testator slice , create or update person and create the order if !order._id
    console.log("Testator form saved");
    navigate('/creatingOrder');
  };

  return (
    <>
      <section>
        <div className="creatingOrder-section-heading-container">
          <h1>Your details</h1>
        </div>
        <div className="creatingOrder-section-main-content-container">
          <PersonForm
            role="testator"
            initialFormData={initialTestatorFormData}
            // onCancel={handleCancel}
            // onSave={handleSaveAndContinue}
          />
        </div>
        <OrderNavigation
          onBack={handleBack}
          onSaveAndContinue={handleSaveAndContinue}
        />
      </section>
    </>
  );
}

export default Testator;

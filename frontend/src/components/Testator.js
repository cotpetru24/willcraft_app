import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonForm from "./PersonForm";
import { createPersonThunk, updatePersonThunk } from "../features/order/orderSlice";
import OrderNavigation from "./OrderNavigation";

const Testator = () => {
  const [initialFormData, setInitialFormData] = useState({
    _id: '',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: ''
  });

  const handleCancel = () => {
    // Logic specific to Testator when cancel is clicked
    navigate("/creatingOrder");
};

const handleSave = () => {
    // Logic specific to Testator when save is clicked
    console.log("Testator form saved");
    // Dispatch actions or perform any other operations here
};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const order = useSelector(state => state.order);

  useEffect(() => {
    const personData = order.peopleAndRoles.find(p => p.role.includes("testator"));
    if (personData) {
      const { personId } = personData;
      setInitialFormData({
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

  const onSubmit = (formData) => {
    if (formData._id) {
      dispatch(updatePersonThunk({ id: formData._id, personData: formData }));
    } else {
      dispatch(createPersonThunk(formData));
    }
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
            initialFormData={initialFormData}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        </div>
        <div className="creatingOrder-section-navigation-container">
          <button onClick={() => { navigate('/creatingOrder') }}>Back</button>
        </div>
        <OrderNavigation/>
      </section>
    </>
  );
}

export default Testator;

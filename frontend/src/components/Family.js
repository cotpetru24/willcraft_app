import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonForm from "./PersonForm";
import { createPerson, updatePerson } from "../features/order/orderSlice";

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
    setMaritalStatus(e.target.value)
  }

  const [maritalStatus, setMaritalStatus] = useState('')



  useEffect(() => {
    const spouseData = order.peopleAndRoles.find(p => p.role.includes("spouse"));
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

  const onSubmit = (formData) => {
    if (formData._id) {
      dispatch(updatePerson({ id: formData._id, personData: formData }));
    } else {
      dispatch(createPerson(formData));
    }
    navigate('/creatingOrder');
  };

  return (
    <>
      <section>
        <div className="creatingOrder-section-heading-container">
          <h1>Your details</h1>
        </div>

        <div className="marital-status-container">
          <div>
            <h4>Are you maried or live have a partner ?</h4>
          </div>
          <div className="marital-status-options-container">
            <div className="marital-status-radio-container">
              <input type="radio" id="marital-status-yes" name="marital-status" value="yes" onChange={handleMaritalStatusChange}></input>
              <label htmlFor="matital-status-yes">Yes</label>
            </div>
            <div className="marital-status-radio-container">
              <input type="radio" id="marital-status-no" name="marital-status" value="no" onChange={handleMaritalStatusChange}></input>
              <label htmlFor="matital-status-no">No</label>
            </div>
          </div>
        </div>

        {maritalStatus === 'yes' &&
          (
            <div className="creatingOrder-section-main-content-container">
              <PersonForm
                role="partner"
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

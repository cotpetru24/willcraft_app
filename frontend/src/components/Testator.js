import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderNavigation from "./OrderNavigation";
import AddressAutocomplete from "./AddressAutocomplete";
import DateInput from "./DateInput";
import constants from "../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateTestatorSlice } from "../features/people/testatorSlice";

const Testator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const testator = useSelector((state) => state.testator);

  const [testatorFormData, setTestatorFormData] = useState({
    _id: '',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: ''
  });

  useEffect(() => {
    if (testator) {
      setTestatorFormData({
        _id: testator._id || '',
        title: testator.title || '',
        fullLegalName: testator.fullLegalName || '',
        fullAddress: testator.fullAddress || '',
        dob: testator.dob || '',
        email: testator.email || '',
        tel: testator.tel || ''
      });
    }
  }, [testator]);

  const handleSaveAndContinue = () => {
    navigate('/creatingOrder');
  };

  const handleBack = () => {
    navigate('/creatingOrder');
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTestatorFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Dispatch the change to the Redux store
    dispatch(updateTestatorSlice({ ...testatorFormData, [name]: value }));
  };

  const handlePlaceSelected = (address) => {
    setTestatorFormData((prevData) => ({
      ...prevData,
      fullAddress: address
    }));

    // Dispatch the change to the Redux store
    dispatch(updateTestatorSlice({ ...testatorFormData, fullAddress: address }));
  };

  return (
    <>
      <section>
        <div className="creatingOrder-section-heading-container">
          <h1>Your details</h1>
        </div>
        <div className="creatingOrder-section-main-content-container">
          <form>
            <div className="section-container">
              <section className="form person-form">
                <div className="title-and-fullName-container">
                  <div className="name-group">
                    <label htmlFor="title">Title</label>
                    <select
                      id="title"
                      name="title"
                      value={testatorFormData.title}
                      onChange={handleOnChange}
                      required
                    >
                      {constants.titles.map(title => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="name-group">
                    <label htmlFor="fullLegalName">Full legal name</label>
                    <input
                      type="text"
                      id="fullLegalName"
                      name="fullLegalName"
                      value={testatorFormData.fullLegalName}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="fullAddress">Full address</label>
                  <AddressAutocomplete
                    name="fullAddress"
                    value={testatorFormData.fullAddress}
                    onPlaceSelected={handlePlaceSelected}
                    handleInputChange={handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <DateInput
                    id="dob"
                    name="dob"
                    value={testatorFormData.dob}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email (optional)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={testatorFormData.email}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tel">Phone Number (optional)</label>
                  <input
                    type="tel"
                    id="tel"
                    name="tel"
                    value={testatorFormData.tel}
                    onChange={handleOnChange}
                  />
                </div>
              </section>
            </div>
          </form>
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

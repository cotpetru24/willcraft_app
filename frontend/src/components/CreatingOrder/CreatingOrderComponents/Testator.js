import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreatingOrderNavigation from "../CreatigOrderNavigation";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import DateInput from "../../Common/DateInput";
import constants from "../../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateTestatorSlice } from "../../../features/people/testator/testatorSlice";
import testatorThunks from "../../../features/people/testator/testatorThunks";

const Testator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const testator = useSelector((state) => state.testator);

  // Use useRef to store the "saved" state
  const savedTestatorData = useRef(null);

  const [testatorFormData, setTestatorFormData] = useState({
    _id: '',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: '',
    maritalStatus: '',
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
        tel: testator.tel || '',
        maritalStatus: testator.maritalStatus || '',
      });

      // Store the initial state as "saved" state if it's not already saved
      if (!savedTestatorData.current) {
        savedTestatorData.current = JSON.parse(JSON.stringify(testator));
      }

    }
  }, [testator]
  );


  const handleBack = () => {
    // Revert to the "saved" state
    if (savedTestatorData.current) {
      dispatch(updateTestatorSlice(savedTestatorData.current));
    }
    navigate('/creatingOrder');
  };


  const handleSaveAndContinue = async () => {
    if (!testator._id) {
      await dispatch(testatorThunks.createTestatorThunk(testator));
    } else {
      await dispatch(testatorThunks.updateTestatorThunk(testator));
    }
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
            <div className="section-form-container">
              <section className="form person-form">
                <div className="form-title-and-fullName-container">
                  <div className="name-group">
                    <label htmlFor="title">Title</label>
                    <select
                      id="title"
                      name="title"
                      value={testatorFormData.title}
                      onChange={handleOnChange}
                      required
                    >
                      {Object.values(constants.title).map((title, index) => (
                        <option key={index} value={title}>
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
        <CreatingOrderNavigation
          onBack={handleBack}
          onSaveAndContinue={handleSaveAndContinue}
        />
      </section>
    </>
  );
}

export default Testator;

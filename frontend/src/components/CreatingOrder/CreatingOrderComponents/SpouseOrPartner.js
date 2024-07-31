import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderNavigation from "../CreatigOrderNavigation";
import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import DateInput from "../../Common/DateInput";
import { updateTestatorSlice } from "../../../features/people/testator/testatorSlice";
import { updateSpouseOrPartnerSlice, resetSpouseOrPartnerSlice } from "../../../features/people/spouseOrPartner/spouseOrPartnerSlice";
import spouseOrPartnerThunks from "../../../features/people/spouseOrPartner/spouseOrPartnerThunks";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/order/currentOrderSlice";
import testatorThunks from "../../../features/people/testator/testatorThunks";



const SpouseOrPartner = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentOrder = useSelector(state => state.currentOrder);
  const testator = useSelector(state => state.testator)
  const spouseOrPartner = useSelector(state => state.spouseOrPartner)

  const [currentMaritalStatus, setMaritalStatus] = useState(testator.maritalStatus)

  // Use useRef to store the "saved" state
  const savedSpouseOrPartnerData = useRef(null);
  const savedTestatorData = useRef(null);
  const initialMaritalStatus = useRef(testator.maritalStatus);

  const [spouseOrPartnerFormData, setSpouseOrPartnerFormData] = useState({
    _id: '',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: ''
  });


  useEffect(() => {
    if (spouseOrPartner) {
      setSpouseOrPartnerFormData({
        _id: spouseOrPartner._id || '',
        title: spouseOrPartner.title || '',
        fullLegalName: spouseOrPartner.fullLegalName || '',
        fullAddress: spouseOrPartner.fullAddress || '',
        dob: spouseOrPartner.dob || '',
        email: spouseOrPartner.email || '',
        tel: spouseOrPartner.tel || ''
      });

      // Store the initial state as "saved" state if it's not already saved
      if (!savedSpouseOrPartnerData.current) {
        savedSpouseOrPartnerData.current = JSON.parse(JSON.stringify(spouseOrPartner));
      }

      if (!savedTestatorData.current) {
        savedTestatorData.current = JSON.parse(JSON.stringify(testator));
      }

    }
  }, [spouseOrPartner]
  );


  useEffect(() => {
    // Check if the marital status has changed to 'single'
    if ((initialMaritalStatus.current !== constants.maritalStatus.SINGLE
      || currentMaritalStatus === constants.maritalStatus.WIDOWED)
      && (
        currentMaritalStatus === constants.maritalStatus.SINGLE
        || currentMaritalStatus === constants.maritalStatus.WIDOWED)
    ) {
      dispatch(resetSpouseOrPartnerSlice());
    }
  }, [currentMaritalStatus, dispatch]
  );


  const handleBack = () => {
    // Revert to the "saved" state
    if (savedTestatorData.current) {
      dispatch(updateTestatorSlice(savedTestatorData.current));
    }
    if (savedSpouseOrPartnerData.current) {
      dispatch(updateSpouseOrPartnerSlice(savedSpouseOrPartnerData.current));
    }
    navigate('/creatingOrder');
  };


  const handleSaveAndContinue = async (e) => {
    e.preventDefault();

    let updatedPeopleAndRoles = currentOrder.peopleAndRoles;

    // Check if marital status changed from spouse/partner to single or widowed
    if ((initialMaritalStatus.current === constants.maritalStatus.MARRIED
      || initialMaritalStatus.current === constants.maritalStatus.PARTNER)
      && (currentMaritalStatus !== constants.maritalStatus.MARRIED
        && currentMaritalStatus !== constants.maritalStatus.PARTNER)) {

      updatedPeopleAndRoles = currentOrder.peopleAndRoles.filter(pr => 
        !pr.role.includes(constants.role.SPOUSE) && !pr.role.includes(constants.role.PARTNER)
      );
      
      // Update the current order slice
      const updatedOrder = {
        ...currentOrder,
        peopleAndRoles: updatedPeopleAndRoles
      };

      await dispatch(updateCurrentOrderSlice(updatedOrder));

      await dispatch(updateOrderThunk(updatedOrder));
    }
    else {
      if (!spouseOrPartner._id
        && (currentMaritalStatus === constants.maritalStatus.MARRIED
          || currentMaritalStatus === constants.maritalStatus.PARTNER)
      ) {
        const createSpouseOrPartnerResponse = await dispatch(
          spouseOrPartnerThunks.createSpouseOrPartnerThunk(spouseOrPartner)).unwrap();

        if (createSpouseOrPartnerResponse) {
          let role;
          if (currentMaritalStatus === constants.maritalStatus.MARRIED) role = constants.role.SPOUSE;
          if (currentMaritalStatus === constants.maritalStatus.PARTNER) role = constants.role.PARTNER;

          // Update the peopleAndRoles with the new spouse/partner
          updatedPeopleAndRoles = [
            ...currentOrder.peopleAndRoles,
            {
              personId: createSpouseOrPartnerResponse._id,
              role: [role]
            }
          ];

          // Update the current order slice
          const updatedOrder = {
            ...currentOrder,
            peopleAndRoles: updatedPeopleAndRoles
          };

          await dispatch(updateCurrentOrderSlice(updatedOrder));

          await dispatch(updateOrderThunk(updatedOrder));
        }
      } else {

        await dispatch(spouseOrPartnerThunks.updateSpouseOrPartnerThunk(spouseOrPartner));
      }
    }

    // Update testator's marital status if it has changed
    if (initialMaritalStatus.current !== currentMaritalStatus) {

      await dispatch(testatorThunks.updateTestatorThunk({ ...testator, maritalStatus: currentMaritalStatus }));
    }

    navigate('/creatingOrder');
  };


  const handleMaritalStatusChange = (e) => {
    const updatedMaritalStatus = e.target.value;
    setMaritalStatus(updatedMaritalStatus);

    if (testator) {
      dispatch(updateTestatorSlice({ ...testator, maritalStatus: updatedMaritalStatus }))
    }
  }


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSpouseOrPartnerFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));







    // Dispatch the change to the Redux store
    dispatch(updateSpouseOrPartnerSlice({ ...spouseOrPartnerFormData, [name]: value }));
  };


  const handlePlaceSelected = (address) => {
    setSpouseOrPartnerFormData((prevData) => ({
      ...prevData,
      fullAddress: address
    }));

    // Dispatch the change to the Redux store
    dispatch(updateSpouseOrPartnerSlice({ ...spouseOrPartnerFormData, fullAddress: address }));
  };


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
              <input
                type="radio"
                id="marital-status-married"
                name="marital-status"
                value={constants.maritalStatus.MARRIED}
                checked={currentMaritalStatus === constants.maritalStatus.MARRIED}
                onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-yes">Married</label>
            </div>
            <div className="marital-status-radio-container">
              <input
                type="radio"
                id="marital-status-partner"
                name="marital-status"
                value={constants.maritalStatus.PARTNER}
                checked={currentMaritalStatus === constants.maritalStatus.PARTNER}
                onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-no">Living with partner</label>
            </div>
            <div className="marital-status-radio-container">
              <input
                type="radio"
                id="marital-status-widowed"
                name="marital-status"
                value={constants.maritalStatus.WIDOWED}
                checked={currentMaritalStatus === constants.maritalStatus.WIDOWED}
                onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-no">Widowed</label>
            </div>
            <div className="marital-status-radio-container">
              <input
                type="radio"
                id="marital-status-single"
                name="marital-status"
                value={constants.maritalStatus.SINGLE}
                checked={currentMaritalStatus === constants.maritalStatus.SINGLE}
                onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-no">Single</label>
            </div>
          </div>
        </div>


        {(currentMaritalStatus === constants.maritalStatus.MARRIED
          || currentMaritalStatus === constants.maritalStatus.PARTNER)
          &&
          (
            <div className="section-form-container">

              <form onSubmit={handleSaveAndContinue}>
                <div className="form-heading">
                  <h3>Please enter your {currentMaritalStatus === constants.maritalStatus.MARRIED
                    ? constants.role.SPOUSE
                    : currentMaritalStatus === constants.maritalStatus.PARTNER
                      ? constants.role.PARTNER : ""} details.</h3>
                </div>
                <div className="form-main-container">
                  <div className="form-title-and-fullName-container">
                    <div className="name-group">
                      <label htmlFor="title">Title</label>
                      <select
                        id="title"
                        name="title"
                        value={spouseOrPartnerFormData.title}
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
                        value={spouseOrPartnerFormData.fullLegalName}
                        onChange={handleOnChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="fullAddress">Full address</label>
                    <AddressAutocomplete
                      name="fullAddress"
                      value={spouseOrPartnerFormData.fullAddress}
                      onPlaceSelected={handlePlaceSelected}
                      handleInputChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <DateInput
                      id="dob"
                      name="dob"
                      value={spouseOrPartnerFormData.dob}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email (optional)</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={spouseOrPartnerFormData.email}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tel">Phone Number (optional)</label>
                    <input
                      type="tel"
                      id="tel"
                      name="tel"
                      value={spouseOrPartnerFormData.tel}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
              </form>
            </div>
          )}

        <div className="section-navigation-container">
          <OrderNavigation
            onBack={handleBack}
            onSaveAndContinue={handleSaveAndContinue}
          />
        </div>

      </section>
    </>
  );
}

export default SpouseOrPartner;


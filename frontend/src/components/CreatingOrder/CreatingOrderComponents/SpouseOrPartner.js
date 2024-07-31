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
  const currentOrderId = currentOrder.orderId;

  console.log(`current orderId = ${currentOrder.orderId}`);

  const testator = useSelector(state => state.testator)
  const spouseOrPartner = useSelector(state => state.spouseOrPartner)

  const [currentMaritalStatus, setMaritalStatus] = useState(testator.maritalStatus)
  console.log(`current marital status = ${currentMaritalStatus}`)


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


  const handleMaritalStatusChange = (e) => {
    const updatedMaritalStatus = e.target.value;
    setMaritalStatus(updatedMaritalStatus);

    if (testator) {
      dispatch(updateTestatorSlice({ ...testator, maritalStatus: updatedMaritalStatus }))
    }
  }


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

    console.log(`current orderId in handlesaveandnavifgate = ${currentOrder.orderId}`)
    if (!spouseOrPartner._id) {
      const createSpouseOrPartnerResponse = await dispatch(spouseOrPartnerThunks.createSpouseOrPartnerThunk(spouseOrPartner)).unwrap();

      if (createSpouseOrPartnerResponse) {
        let role;
        // if (currentMaritalStatus === constants.role.MARRIED) role = constants.role.MARRIED;
        // if (currentMaritalStatus === constants.role.PARTNER) role = constants.role.PARTNER;
        if (currentMaritalStatus === "married") role = "spouse";
        if (currentMaritalStatus === "partner") role = "partner";
        console.log(`role for updating the order = ${role}.    in spouse or partner commponent`)

        // Update the peopleAndRoles with the new spouse/partner
        updatedPeopleAndRoles = [
          ...currentOrder.peopleAndRoles,
          {
            personId: createSpouseOrPartnerResponse._id,
            role: [role]
          }
        ];


        // Update the current order slice
        const updatedCurrentOrder = {
          ...currentOrder,
          peopleAndRoles: updatedPeopleAndRoles
        };

        // Update the current order slice
        await dispatch(updateCurrentOrderSlice(updatedCurrentOrder));

        // const updatedCurrentOrder = useSelector(state => state.currentOrder);
        console.log(`dispatching update order thunk order data = ${JSON.stringify(currentOrder)}`)
        await dispatch(updateOrderThunk(updatedCurrentOrder))
      }
      else {
        await dispatch(spouseOrPartnerThunks.updateSpouseOrPartnerThunk(spouseOrPartner));
      }



      // updateTestatorThunk({maritalStatus: currentMaritalStatus})

      if (initialMaritalStatus.current !== currentMaritalStatus) {
        // dispatch(updateTestatorSlice({ ...testator, maritalStatus: currentMaritalStatus }))
        console.log(`update testator thunk called in spouse or partner slide on save. 
        Saved marital status= ${initialMaritalStatus.current}, current marital status = ${currentMaritalStatus}`)
        await dispatch(testatorThunks.updateTestatorThunk({ ...testator, maritalStatus: currentMaritalStatus }))
      }
      navigate('/creatingOrder');
    };
  }

  // const handleSaveAndContinue = async (e) => {
  //   e.preventDefault();
  //   console.log(`current orderId in handleSaveAndContinue = ${currentOrder.orderId}`);

  //   // Check if the marital status has changed to single or widowed and remove spouse/partner if necessary
  //   if ((initialMaritalStatus.current === constants.role.SPOUSE || initialMaritalStatus.current === constants.role.PARTNER) &&
  //       (currentMaritalStatus !== constants.role.SPOUSE && currentMaritalStatus !== constants.role.PARTNER)) {
  //     // await dispatch(removeSpouseOrPartner(spouseOrPartner._id));
  //   } else {
  //     if (!spouseOrPartner._id) {
  //       const createSpouseOrPartnerResponse = await dispatch(spouseOrPartnerThunks.createSpouseOrPartnerThunk(spouseOrPartner)).unwrap();

  //       if (createSpouseOrPartnerResponse) {
  //         let role;
  //         // if (currentMaritalStatus === constants.role.SPOUSE) role = constants.role.SPOUSE;
  //         // if (currentMaritalStatus === constants.role.PARTNER) role = constants.role.PARTNER;
  //         if (currentMaritalStatus === 'spouse') role = 'spouse';
  //         if (currentMaritalStatus === 'partner') role = 'partner';

  //         console.log(`role for updating the order = ${role}.    in spouse or partner component`);

  //         await dispatch(updateOrderThunk({
  //           id: currentOrderId,
  //           updateType: 'peopleAndRoles',
  //           updateData: {
  //             personId: createSpouseOrPartnerResponse._id, // The ID of the person whose role you want to update
  //             role: [role] // The new role for this person
  //           }
  //         }));
  //       }
  //     } else {
  //       await dispatch(spouseOrPartnerThunks.updateSpouseOrPartnerThunk(spouseOrPartner));
  //     }
  //   }

  //   // Update testator's marital status if it has changed
  //   if (initialMaritalStatus.current !== currentMaritalStatus) {
  //     console.log(`update testator thunk called in spouse or partner slide on save. 
  //       Saved marital status= ${initialMaritalStatus.current}, current marital status = ${currentMaritalStatus}`);


  //     await dispatch(testatorThunks.updateTestatorThunk({...testator, maritalStatus: currentMaritalStatus}));
  //   }

  //   navigate('/creatingOrder');
  // };


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
                id="marital-status-yes"
                name="marital-status"
                value={constants.maritalStatus.MARRIED}
                checked={currentMaritalStatus === constants.maritalStatus.MARRIED}
                onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-yes">Married</label>
            </div>
            <div className="marital-status-radio-container">
              <input
                type="radio"
                id="marital-status-no"
                name="marital-status"
                value={constants.maritalStatus.PARTNER}
                checked={currentMaritalStatus === constants.maritalStatus.PARTNER}
                onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-no">Living with partner</label>
            </div>
            <div className="marital-status-radio-container">
              <input
                type="radio"
                id="marital-status-no"
                name="marital-status"
                value={constants.maritalStatus.WIDOWED}
                checked={currentMaritalStatus === constants.maritalStatus.WIDOWED}
                onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-no">Widowed</label>
            </div>
            <div className="marital-status-radio-container">
              <input
                type="radio"
                id="marital-status-no"
                name="marital-status"
                value={constants.maritalStatus.SINGLE}
                checked={currentMaritalStatus === constants.maritalStatus.SINGLE}
                onChange={handleMaritalStatusChange}></input>
              <label htmlFor="marital-status-no">Single</label>
            </div>
          </div>
        </div>


        {(currentMaritalStatus === 'married' || currentMaritalStatus === 'partner') &&
          (
            <div className="section-form-container">

              <form onSubmit={handleSaveAndContinue}>
                <div className="form-heading">
                  <h3>Please enter your {currentMaritalStatus === 'married' ? "spouse" : currentMaritalStatus === 'partner' ? "partner" : ""} details.</h3>
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


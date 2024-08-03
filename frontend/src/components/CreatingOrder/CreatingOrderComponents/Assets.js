


import OrderNavigation from "../CreatigOrderNavigation";
import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import DateInput from "../../Common/DateInput";
import SectionListItem from "../../SectionListItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTestatorSlice } from "../../../features/people/testator/testatorSlice";
import { useState, useRef, useEffect } from "react";
import testatorThunks from "../../../features/people/testator/testatorThunks";
import { resetKidsSlice, updateKidsSlice } from "../../../features/people/kids/kidsSlice";
import styles from "../../../common/styles";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/order/currentOrderSlice";
import { createPerson } from "../../../features/people/peopleService";
import { createKidThunk } from "../../../features/people/kids/kidsThunks";

const Assets = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    // // const testator = useSelector(state => state.testator);
    // const currentOrder = useSelector(state => state.currentOrder);

    // const [showAssetsForm, setShowAssetsForm] = useState(false);
    // const [editAssetsIndex, setEditAssetsIndex] = useState(null); // New state to track the index of the kid being edited

    // // Use useRef to store the "saved" state
    // const savedAssetsData = useRef(null);
    // // const savedTestatorData = useRef(null);
    // const initialHasChildrenStatus = useRef(testator.hasChildrenStatus);

    // let asset;

    // const [assetFormData, setAssetFormData] = useState({
    //     _id: '',
    //     title: '',
    //     fullLegalName: '',
    //     fullAddress: '',
    //     dob: '',
    //     email: '',
    //     tel: ''
    // });

    // useEffect(() => {
    //     if (asset) {
    //         setKidFormData({
    //             _id: kidFormData._id || '',
    //             title: kidFormData.title || '',
    //             fullLegalName: kidFormData.fullLegalName || '',
    //             fullAddress: kidFormData.fullAddress || '',
    //             dob: kidFormData.dob || '',
    //             email: kidFormData.email || '',
    //             tel: kidFormData.tel || ''
    //         })
    //     }
    //     // Store the initial state as "saved" state if it's not already saved
    //     if (!savedTestatorData.current) {
    //         savedTestatorData.current = JSON.parse(JSON.stringify(testator));
    //     }
    //     if (!savedKidsData.current) {
    //         savedKidsData.current = JSON.parse(JSON.stringify(kids));
    //     }
    // }, [kids]);

    // const handleHasChildrenStatusChange = (e) => {
    //     setShowKidsForm(false);

    //     const updatedHasChildrenStatus = e.target.value;
    //     setHasChildrenStatus(updatedHasChildrenStatus);

    //     if (testator) {
    //         dispatch(updateTestatorSlice({ ...testator, hasChildrenStatus: updatedHasChildrenStatus }));
    //     }
    //     if (kids) {
    //         dispatch(resetKidsSlice());
    //     }
    // };

    // const handleShowKidsForm = () => {
    //     setShowKidsForm(prevState => !prevState);
    // };

    // const handleOnChange = (e) => {
    //     const { name, value } = e.target;
    //     setKidFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };

    // const handleKidFormAdd = (e) => {
    //     e.preventDefault();

    //     if (editKidIndex !== null) {
    //         const updatedKids = kids.map((kid, index) =>
    //             index === editKidIndex ? kidFormData : kid
    //         );
    //         dispatch(updateKidsSlice(updatedKids));
    //         setEditKidIndex(null); // Reset the edit index
    //     } else {
    //         dispatch(updateKidsSlice([...kids, kidFormData]));
    //     }

    //     resetKidForm();
    //     setShowKidsForm(false);
    // };

    // const resetKidForm = () => {
    //     setKidFormData({
    //         _id: '',
    //         title: '',
    //         fullLegalName: '',
    //         fullAddress: '',
    //         dob: '',
    //         email: '',
    //         tel: ''
    //     });
    //     setEditKidIndex(null); // Reset the edit index
    // };

    // const handleRemoveKid = (index) => {
    //     const updatedKids = kids.filter((_, i) => i !== index);
    //     dispatch(updateKidsSlice(updatedKids));
    // };

    // const handleEditKid = (index) => {
    //     const kidToEdit = kids[index];
    //     setKidFormData({
    //         _id: kidToEdit._id || '',
    //         title: kidToEdit.title || '',
    //         fullLegalName: kidToEdit.fullLegalName || '',
    //         fullAddress: kidToEdit.fullAddress || '',
    //         dob: kidToEdit.dob || '',
    //         email: kidToEdit.email || '',
    //         tel: kidToEdit.tel || ''
    //     });
    //     setEditKidIndex(index); // Set the edit index
    //     setShowKidsForm(true);
    // };





    // // const handleSaveAndContinue = async (e) => {
    // //     e.preventDefault();
    // //     // Update testator's hasChildrenStatus if it has changed
    // //     if (initialHasChildrenStatus.current !== currentHasChildrenStatus) {
    // //         await dispatch(testatorThunks.updateTestatorThunk({ ...testator, hasChildrenStatus: currentHasChildrenStatus }));
    // //     }


    // //     const updatedKids = [];

    // //     // Create each kid and update kids slice with returned IDs
    // //     for (const kid of kids) {
    // //         const response = await dispatch(createKidThunk(kid)).unwrap();
    // //         updatedKids.push({
    // //             ...kid,
    // //             _id: response._id
    // //         });
    // //     }


    // //     // // Create each kid
    // //     // for (const kid of kids) {
    // //     //     await dispatch(createKidThunk(kid));
    // //     // }

    // //     const updatedOrder = {
    // //         ...currentOrder,
    // //         peopleAndRoles: [
    // //             ...currentOrder.peopleAndRoles.filter(pr => pr.role !== constants.role.KID), // Remove existing kids to avoid duplicates
    // //             ...kids.map(kid => ({
    // //                 personId: kid._id,
    // //                 role: [constants.role.KID]
    // //             }))
    // //         ]
    // //     };


    // //     await dispatch(updateCurrentOrderSlice(updatedOrder));
    // //     await dispatch(updateOrderThunk(updatedOrder));

    // //     navigate('/creatingOrder');
    // // };


    // const handleSaveAndContinue = async (e) => {
    //     e.preventDefault();

    //     // Update testator's hasChildrenStatus if it has changed
    //     if (initialHasChildrenStatus.current !== currentHasChildrenStatus) {
    //         await dispatch(testatorThunks.updateTestatorThunk({ ...testator, hasChildrenStatus: currentHasChildrenStatus }));
    //     }

    //     const updatedKids = [];

    //     // Create each kid and update kids slice with returned IDs
    //     for (const kid of kids) {
    //         const response = await dispatch(createKidThunk(kid)).unwrap();
    //         updatedKids.push({
    //             ...kid,
    //             _id: response._id
    //         });
    //     }

    //     // Update kids slice with new kids including their IDs
    //     await dispatch(updateKidsSlice(updatedKids));

    //     // Prepare updated order with the new kids IDs
    //     const updatedOrder = {
    //         ...currentOrder,
    //         peopleAndRoles: [
    //             ...currentOrder.peopleAndRoles.filter(pr => !pr.role.includes(constants.role.KID)), // Remove existing kids to avoid duplicates
    //             ...updatedKids.map(kid => ({
    //                 personId: kid._id,
    //                 role: [constants.role.KID]
    //             }))
    //         ]
    //     };

    //     // Update the currentOrder slice
    //     await dispatch(updateCurrentOrderSlice(updatedOrder));
    //     // Update the order in the backend
    //     await dispatch(updateOrderThunk(updatedOrder));

    //     navigate('/creatingOrder');
    // };






    // const handleBack = () => {
    //     console.log(`handle back called`);
    //     // Revert to the "saved" state
    //     if (savedTestatorData.current) {
    //         dispatch(updateTestatorSlice(savedTestatorData.current));
    //         console.log(`dispatched update testator slice`);
    //     }
    //     if (savedKidsData.current) {
    //         dispatch(updateKidsSlice(savedKidsData.current));
    //         console.log(`dispatched update kids slice`);
    //     }
    //     navigate('/creatingOrder');
    // };

    // const handlePlaceSelected = (address) => {
    //     setKidFormData((prevData) => ({
    //         ...prevData,
    //         fullAddress: address
    //     }));
    // };



    const [assetType, setAssetType] = useState(Object.values(constants.assetType)[0]);
    const handleAssetTypeChange = (e) => {
        const selectedType = e.target.value;
        setAssetType(selectedType);
    };



    return (
        <>
            <section className="section-container">
                <div>
                    <div className="creatingOrder-section-heading-container">
                        <h1>Your Assets</h1>
                    </div>
                    <div className="has-children-container">
                        <div>
                            <h4>Do you have children ?</h4>
                        </div>
                        <div className="has-children-options-container">
                            <div className="has-children-radio-container">
                                <input
                                    type="radio"
                                    id="has-children-yes"
                                    name="has-children"
                                    value="yes"
                                // checked={currentHasChildrenStatus === "yes"}
                                // onChange={handleHasChildrenStatusChange}
                                >
                                </input>
                                <label htmlFor="has-children-yes">Yes</label>
                            </div>
                            <div className="has-children-radio-container">
                                <input
                                    type="radio"
                                    id="has-children-no"
                                    name="has-children"
                                    value="no"
                                // checked={currentHasChildrenStatus === "no"}
                                // onChange={handleHasChildrenStatusChange}
                                >
                                </input>
                                <label htmlFor="has-children-no">No</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* {(currentHasChildrenStatus === "yes") &&
                    ( */}
                <>
                    <div className="section-content-container">
                        <div className="section-controll-container">
                            <div className="section-list-container">
                                <p>List item here</p>
                                {/* {kids.map((kid, index) => (
                                            <SectionListItem
                                                // key={index}
                                                // buttonsDisabled={showKidsForm}
                                                // data={kid}
                                                // onRemove={() => handleRemoveKid(index)}
                                                // onEdit={() => handleEditKid(index)}
                                            />
                                        ))} */}
                            </div>
                            <div className="sectio-add-btn-container">
                                <button
                                    className="section-add-btn"
                                // onClick={handleShowKidsForm}
                                // style={showKidsForm ? styles.disabledButton : {}}
                                // disabled={showKidsForm}
                                >
                                    +Add Asset
                                </button>
                            </div>
                        </div>

                        {/* {showKidsForm &&
                                    ( */}
                        <div className="section-form-container">
                        <form>
            <div className="form-main-container">
                <div className="form-group">
                    <label htmlFor="assetType">Asset type</label>
                    <select
                        id="assetType"
                        name="assetType"
                        onChange={handleAssetTypeChange}
                        value={assetType}
                        required
                    >
                        <option value="" disabled>Select asset type</option>
                        {Object.values(constants.assetType).map((title, index) => (
                            <option key={index} value={title}>
                                {title}
                            </option>
                        ))}
                    </select>
                </div>
                {assetType === constants.assetType.PROPERTY && (
                    <div className="form-group">
                        <label htmlFor="propertyAddress">Address</label>
                        <input
                            type="text"
                            id="propertyAddress"
                            name="propertyAddress"
                        />
                    </div>
                )}
                {assetType === constants.assetType.BANK_ACCOUNT && (
                    <div className="form-group">
                        <label htmlFor="bankName">Bank name</label>
                        <input
                            type="text"
                            id="bankName"
                            name="bankName"
                        />
                    </div>
                )}
                {assetType === constants.assetType.STOCKS_AND_SHARES && (
                    <div className="form-group">
                        <label htmlFor="companyName">Company name</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                        />
                    </div>
                )}
                {(assetType === constants.assetType.PENSION || assetType === constants.assetType.LIFE_INSURANCE) && (
                    <div className="form-group">
                        <label htmlFor="provider">Provider</label>
                        <input
                            type="text"
                            id="provider"
                            name="provider"
                        />
                    </div>
                )}
                { assetType === constants.assetType.OTHER && (
                    <div className="form-group">
                        <label htmlFor="assetDetails">Details</label>
                        <input
                            type="text"
                            id="assetDetails"
                            name="assetDetails"
                        />
                    </div>
                )}
            </div>
            <div className="form-btns-container">
                <button
                    className="form-btn"
                    type="button"
                >
                    Cancel
                </button>
                <button
                    className="form-btn"
                    type="submit"
                >
                    Add
                </button>
            </div>
        </form>
                        </div>
                        {/* ) */}
                        {/* } */}
                    </div>
                </>
                {/* )
                } */}
                <>
                    <div className="section-navigation-container">
                        <OrderNavigation
                        // onBack={handleBack}
                        // onSaveAndContinue={handleSaveAndContinue}
                        // buttonsDisabled={showKidsForm}
                        />
                    </div>
                </>
            </section>
        </>
    )
}

export default Assets;


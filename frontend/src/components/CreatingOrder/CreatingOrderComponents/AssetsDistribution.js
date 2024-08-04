


import OrderNavigation from "../CreatigOrderNavigation";
import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import DateInput from "../../Common/DateInput";
import SectionListItem from "../../SectionListItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import styles from "../../../common/styles";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/order/currentOrderSlice";
import { createPerson } from "../../../features/people/peopleService";
import { updateAssetsSlice, createAssetThunk, updateAssetThunk } from "../../../features/orderAssets/orderAssetsSlice"
import { updateAdditionalBeneficiariesSlice } from "../../../features/people/additionalBeneficiaries/additionalBeneficiariesSlice";









const AssetsDistribution = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentOrder = useSelector(state => state.currentOrder);
    const assets = useSelector(state => state.assets)

    const additionalBeneficiaries = useSelector(state => state.additionalBeneficiaries)


    const spouseOrPartner = useSelector(state => state.spouseOrPartner);
    const kids = useSelector(state => state.kids);

    const family = [].concat(spouseOrPartner, kids);

    // console.log(`family = ${JSON.stringify(family)}`);

    const [showAdditionalBeneficiaryForm, setShowAdditionalBeneficiaryForm] = useState(false);
    const [editAdditionalBeneficiaryIndex, setEditAdditionalBeneficiaryIndex] = useState(null); // New state to track the index of the kid being edited

    // Use useRef to store the "saved" state
    const savedAdditionalBeneficiariesData = useRef(null);
    const savedCurentOrderData = useRef(null);

    let beneficiary;

    const [additionalBeneficiaryFormData, setAdditionalBeneficiaryFormData] = useState({
        _id: '',
        title: '',
        fullLegalName: '',
        fullAddress: '',
        dob: '',
        email: '',
        tel: ''

    });

    console.log(`showAdditionalBeneficiaryForm = ${showAdditionalBeneficiaryForm}`)

    useEffect(() => {
        if (beneficiary) {
            setAdditionalBeneficiaryFormData({
                // _id: additionalBeneficiaryFormData._id || '',
                // assetType: additionalBeneficiaryFormData.assetType || '',
                // bankName: additionalBeneficiaryFormData.bankName || '',
                // provider: additionalBeneficiaryFormData.provider || '',
                // companyName: additionalBeneficiaryFormData.companyName || '',
                // propertyAddress: additionalBeneficiaryFormData.propertyAddress || '',
                // otherAssetDetails: additionalBeneficiaryFormData.otherAssetDetails || '',

            })
        }
        // Store the initial state as "saved" state if it's not already saved
        if (!savedAdditionalBeneficiariesData.current) {
            savedAdditionalBeneficiariesData.current = JSON.parse(JSON.stringify(assets));
        }
    }, [additionalBeneficiaries]);


    const handleShowAdditionalBeneficiaryForm = () => {
        setShowAdditionalBeneficiaryForm(prevState => !prevState);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setAdditionalBeneficiaryFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAdditionalBeneficiaryFormAdd = (e) => {
        console.log(`asset form add called `)
        e.preventDefault();

        if (editAdditionalBeneficiaryIndex !== null) {
            const updatedAdditionalBeneficiaries = additionalBeneficiaries.map((beneficiary, index) =>
                index === editAdditionalBeneficiaryIndex ? additionalBeneficiaryFormData : beneficiary
            );
            console.log(`asset form add meets the if condition `)

            dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));
            setEditAdditionalBeneficiaryIndex(null); // Reset the edit index
        } else {
            console.log(`asset form add else statement `)

            dispatch(updateAdditionalBeneficiariesSlice([...additionalBeneficiaries, additionalBeneficiaryFormData]));
        }

        resetAdditionalBeneficiaryForm();
        setShowAdditionalBeneficiaryForm(false);
    };

    const resetAdditionalBeneficiaryForm = () => {
        setAdditionalBeneficiaryFormData({
            _id: '',
            title: '',
            fullLegalName: '',
            fullAddress: '',
            dob: '',
            email: '',
            tel: ''

        });
        setEditAdditionalBeneficiaryIndex(null); // Reset the edit index
    };

    const handleRemoveAdditionalBeneficiary = (index) => {
        const updatedAdditionalBeneficiaries = additionalBeneficiaries.filter((_, i) => i !== index);
        dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));
    };

    const handleEditAdditionalBeneficiary = (index) => {
        const beneficiaryToEdit = additionalBeneficiaries[index];
        setAdditionalBeneficiaryFormData({
            _id: beneficiaryToEdit._id || '',
            title: beneficiaryToEdit.title || '',
            fullLegalName: beneficiaryToEdit.fullLegalName || '',
            fullAddress: beneficiaryToEdit.fullAddress || '',
            dob: beneficiaryToEdit.dob || '',
            email: beneficiaryToEdit.email || '',
            tel: beneficiaryToEdit.tel || ''
        });
        setEditAdditionalBeneficiaryIndex(index); // Set the edit index
        setShowAdditionalBeneficiaryForm(true);
    };




    const handleSaveAndContinue = async (e) => {
        e.preventDefault();

        const updatedAssets = [];

        // Create each kid and update kids slice with returned IDs
        for (const asset of assets) {
            let response;
            if (asset._id) {
                console.log(`asset data sent to create asset thunk = ${JSON.stringify(asset)}`)
                response = await dispatch(updateAssetThunk(asset)).unwrap();
            }
            else {
                console.log(`asset data sent to update asset thunk = ${JSON.stringify(asset)}`)
                response = await dispatch(createAssetThunk(asset)).unwrap();
            }
            updatedAssets.push({
                ...asset,
                _id: response._id
            });

        }

        console.log(`updated assets = ${JSON.stringify(updatedAssets)}`)


        // Update kids slice with new kids including their IDs
        await dispatch(updateAssetsSlice(updatedAssets));

        // Prepare updated order with the new kids IDs
        const updatedOrder = {
            ...currentOrder,
            assetsAndDistribution: [
                // ...currentOrder.assetsAndDistribution, // Remove existing kids to avoid duplicates
                ...updatedAssets.map(asset => ({
                    assetId: asset._id,
                    assetDistribution: []
                }))
            ]
        };
        console.log(`updated order = ${JSON.stringify(updatedOrder)}`)


        // Update the currentOrder slice
        await dispatch(updateCurrentOrderSlice(updatedOrder));
        // Update the order in the backend
        await dispatch(updateOrderThunk(updatedOrder));

        navigate('/creatingOrder');
    };






    const handleBack = () => {
        console.log(`handle back called`);
        // Revert to the "saved" state

        if (savedAdditionalBeneficiariesData.current) {
            dispatch(updateAdditionalBeneficiariesSlice(savedAdditionalBeneficiariesData.current));
            console.log(`dispatched update kids slice`);
        }
        navigate('/creatingOrder');
    };

    const handlePlaceSelected = (address) => {
        setAdditionalBeneficiaryFormData((prevData) => ({
            ...prevData,
            propertyAddress: address
        }));
    };



    // const [assetType, setAssetType] = useState('');
    // const handleAssetTypeChange = (e) => {
    //     const selectedType = e.target.value;
    //     setAssetType(selectedType);
    // };





    return (
        <>
            <section className="section-container">
                <div>
                    <div className="creatingOrder-section-heading-container">
                        <h1>Assets distribution</h1>
                    </div>
                    <div className="has-children-container">
                        <div>
                            <h4>Please select or/and add the people to receive the assets and their share.</h4>
                        </div>
                    </div>
                </div>
                <>
                    <div className="section-content-container">
                        <div className="section-controll-container">
                            <div className="section-list-container">
                                {assets.map((asset, assetIndex) => (
                                    <div className="asset-distribution-container" key={`asset-${assetIndex}`}>
                                        <SectionListItem
                                            buttonsDisabled={showAdditionalBeneficiaryForm}
                                            data={asset}
                                            onRemove={() => handleRemoveAdditionalBeneficiary(assetIndex)}
                                            onEdit={() => handleEditAdditionalBeneficiary(assetIndex)}
                                            section="assetsDistribution-asset"
                                        />
                                        {family.map((person, personIndex) => (
                                            <SectionListItem
                                                key={`asset-${assetIndex}-person-${personIndex}`}
                                                buttonsDisabled={showAdditionalBeneficiaryForm}
                                                data={person}
                                                onRemove={() => handleRemoveAdditionalBeneficiary(personIndex)}
                                                onEdit={() => handleEditAdditionalBeneficiary(personIndex)}
                                                section="assetDistribution-people"
                                            />
                                        ))}
                                        <button
                                            className="section-add-btn"
                                            onClick={handleShowAdditionalBeneficiaryForm}
                                            style={showAdditionalBeneficiaryForm ? styles.disabledButton : {}}
                                            disabled={showAdditionalBeneficiaryForm}
                                        >
                                            +Add Beneficiary
                                        </button>
                                    </div>
                                ))}

                            </div>
                            <div className="sectio-add-btn-container">

                            </div>
                        </div>
                        {showAdditionalBeneficiaryForm &&
                            (
                                <div className="section-form-container">
                                    <form onSubmit={handleAdditionalBeneficiaryFormAdd}>
                                        <div className="form-main-container">
                                            <div className="form-title-and-fullName-container">
                                                <div className="name-group">
                                                    <label htmlFor="title">Title</label>
                                                    <select
                                                        id="title"
                                                        name="title"
                                                        value={additionalBeneficiaryFormData.title}
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
                                                        className="fullLegalName"
                                                        id="fullLegalName"
                                                        name="fullLegalName"
                                                        value={additionalBeneficiaryFormData.fullLegalName}
                                                        onChange={handleOnChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="fullAddress">Full address</label>
                                                <AddressAutocomplete
                                                    name="fullAddress"
                                                    value={additionalBeneficiaryFormData.fullAddress}
                                                    onPlaceSelected={handlePlaceSelected}
                                                    handleInputChange={handleOnChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="dob">Date of Birth</label>
                                                <DateInput
                                                    id="dob"
                                                    name="dob"
                                                    value={additionalBeneficiaryFormData.dob}
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email (optional)</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={additionalBeneficiaryFormData.email}
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="tel">Phone Number (optional)</label>
                                                <input
                                                    type="tel"
                                                    id="tel"
                                                    name="tel"
                                                    value={additionalBeneficiaryFormData.tel}
                                                    onChange={handleOnChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-btns-container">
                                            <button
                                                className="form-btn"
                                                type="button"
                                                onClick={() => {
                                                    handleShowAdditionalBeneficiaryForm();
                                                    resetAdditionalBeneficiaryForm();
                                                }}
                                            >Cancel</button>
                                            <button
                                                className="form-btn"
                                                type="submit"
                                            >{editAdditionalBeneficiaryIndex !== null ? "Update" : "Add"}</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                    {/* <div className="form-btns-container">
                        <button
                            className="form-btn"
                            type="button"
                            onClick={() => {
                                handleShowAdditionalBeneficiaryForm();
                                resetAdditionalBeneficiaryForm();
                            }}
                        >Cancel</button>
                        <button
                            className="form-btn"
                            type="submit"
                        >{editAdditionalBeneficiaryIndex !== null ? "Update" : "Add"}</button>
                    </div> */}
                </>

                <>
                    <div className="section-navigation-container">
                        <OrderNavigation
                            onBack={handleBack}
                            onSaveAndContinue={handleSaveAndContinue}
                            buttonsDisabled={showAdditionalBeneficiaryForm}
                        />
                    </div>
                </>
            </section >
        </>
    )
}

export default AssetsDistribution;


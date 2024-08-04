


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
import { updateAssetsSlice, createAssetThunk, updateAssetThunk } from "../../../features/orderAssets/orderAssetsSlice"
import { Button } from 'react-bootstrap'









const AssetsDistribution = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentOrder = useSelector(state => state.currentOrder);
    const assets = useSelector(state => state.assets)

    const allPeople = useSelector(state => state.allPeople)

    const [showAssetForm, setshowAssetForm] = useState(false);
    const [editAssetIndex, setEditAssetIndex] = useState(null); // New state to track the index of the kid being edited

    // Use useRef to store the "saved" state
    const savedAssetsData = useRef(null);
    // const savedTestatorData = useRef(null);

    let asset;

    const [assetFormData, setAssetFormData] = useState({
        _id: '',
        assetType: '',
        bankName: '',
        provider: '',
        companyName: '',
        propertyAddress: '',
        otherAssetDetails: ''

    });

    useEffect(() => {
        if (asset) {
            setAssetFormData({
                // _id: assetFormData._id || '',
                // assetType: assetFormData.assetType || '',
                // bankName: assetFormData.bankName || '',
                // provider: assetFormData.provider || '',
                // companyName: assetFormData.companyName || '',
                // propertyAddress: assetFormData.propertyAddress || '',
                // otherAssetDetails: assetFormData.otherAssetDetails || '',

            })
        }
        // Store the initial state as "saved" state if it's not already saved
        if (!savedAssetsData.current) {
            savedAssetsData.current = JSON.parse(JSON.stringify(assets));
        }
    }, [assets]);


    const handleshowAssetForm = () => {
        setshowAssetForm(prevState => !prevState);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setAssetFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAssetFormAdd = (e) => {
        console.log(`asset form add called `)
        e.preventDefault();

        if (editAssetIndex !== null) {
            const updatedAssets = assets.map((asset, index) =>
                index === editAssetIndex ? assetFormData : asset
            );
            console.log(`asset form add meets the if condition `)

            dispatch(updateAssetsSlice(updatedAssets));
            setEditAssetIndex(null); // Reset the edit index
        } else {
            console.log(`asset form add else statement `)

            dispatch(updateAssetsSlice([...assets, assetFormData]));
        }

        resetAssetForm();
        setshowAssetForm(false);
    };

    const resetAssetForm = () => {
        setAssetFormData({
            _id: '',
            assetType: '',
            bankName: '',
            provider: '',
            companyName: '',
            propertyAddress: '',
            otherAssetDetails: '',

        });
        setEditAssetIndex(null); // Reset the edit index
    };

    const handleRemoveAsset = (index) => {
        const updatedAssets = assets.filter((_, i) => i !== index);
        dispatch(updateAssetsSlice(updatedAssets));
    };

    const handleEditAsset = (index) => {
        const assetToEdit = assets[index];
        setAssetFormData({
            _id: assetToEdit._id || '',
            assetType: assetToEdit.assetType || '',
            bankName: assetToEdit.bankName || '',
            provider: assetToEdit.provider || '',
            companyName: assetToEdit.companyName || '',
            propertyAddress: assetToEdit.propertyAddress || '',
            otherAssetDetails: assetToEdit.otherAssetDetails || '',
        });
        setEditAssetIndex(index); // Set the edit index
        setshowAssetForm(true);
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

        if (savedAssetsData.current) {
            dispatch(updateAssetsSlice(savedAssetsData.current));
            console.log(`dispatched update kids slice`);
        }
        navigate('/creatingOrder');
    };

    const handlePlaceSelected = (address) => {
        setAssetFormData((prevData) => ({
            ...prevData,
            propertyAddress: address
        }));
    };



    const [assetType, setAssetType] = useState('');
    // const handleAssetTypeChange = (e) => {
    //     const selectedType = e.target.value;
    //     setAssetType(selectedType);
    // };

    // const handleAssetTypeChange = (e) => {
    //     const selectedType = e.target.value;
    //     setAssetFormData(prevState => ({
    //         ...prevState,
    //         assetType: selectedType
    //     }));
    // };


    const handleAssetTypeChange = (e) => {
        const selectedType = e.target.value;
        setAssetType(selectedType);  // Update the assetType state
        setAssetFormData(prevState => ({
            ...prevState,
            assetType: selectedType
        }));
    };



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
                                {/* {assets.map((asset, assetIndex) => (
                                    <div key={`asset-${assetIndex}`}>
                                        <SectionListItem
                                            buttonsDisabled={showAssetForm}
                                            data={asset}
                                            onRemove={() => handleRemoveAsset(assetIndex)}
                                            onEdit={() => handleEditAsset(assetIndex)}
                                            section="assetsDistribution-asset"
                                        />
                                        {allPeople.filter(p => !p.role.includes(constants.role.TESTATOR)).map((person, personIndex) => (
                                            <SectionListItem
                                                key={`asset-${assetIndex}-person-${personIndex}`}
                                                buttonsDisabled={showAssetForm}
                                                data={person}
                                                onRemove={() => handleRemoveAsset(personIndex)}
                                                onEdit={() => handleEditAsset(personIndex)}
                                                section="assetDistribution-people"
                                            />
                                        ))}
                                    </div>
                                ))} */}


                                {assets.map((asset, assetIndex) => (
                                    <div className="asset-distribution-container" key={`asset-${assetIndex}`}>
                                        <SectionListItem
                                            buttonsDisabled={showAssetForm}
                                            data={asset}
                                            onRemove={() => handleRemoveAsset(assetIndex)}
                                            onEdit={() => handleEditAsset(assetIndex)}
                                            section="assetsDistribution-asset"
                                        />
                                        {allPeople.filter(p => !p.role.includes(constants.role.TESTATOR)).map((person, personIndex) => (
                                            <SectionListItem
                                                key={`asset-${assetIndex}-person-${personIndex}`}
                                                buttonsDisabled={showAssetForm}
                                                data={person}
                                                onRemove={() => handleRemoveAsset(personIndex)}
                                                onEdit={() => handleEditAsset(personIndex)}
                                                section="assetDistribution-people"
                                            />
                                        ))}
                                        <button
                                            className="section-add-btn"
                                            onClick={handleshowAssetForm}
                                            style={showAssetForm ? styles.disabledButton : {}}
                                            disabled={showAssetForm}
                                        >
                                            +Add Beneficiary
                                        </button>
                                    </div>
                                ))}

                            </div>
                            <div className="sectio-add-btn-container">

                            </div>
                        </div>

                        {showAssetForm &&
                            (
                                <div className="section-form-container">
                                    <form onSubmit={handleAssetFormAdd}>
                                        <div className="form-main-container">
                                            <div className="form-group">
                                                <label htmlFor="assetType">Asset type</label>
                                                <select
                                                    id="assetType"
                                                    name="assetType"
                                                    value={assetFormData.assetType}
                                                    onChange={handleAssetTypeChange}
                                                    required
                                                >
                                                    <option value="" disabled>Select asset type</option>
                                                    {Object.values(constants.assetType).map((assetType, index) => (
                                                        <option key={index} value={assetType}>
                                                            {assetType}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {assetFormData.assetType === constants.assetType.PROPERTY && (
                                                <div className="form-group">
                                                    <label htmlFor="propertyAddress">Property address</label>
                                                    <AddressAutocomplete
                                                        id="propertyAddress"
                                                        name="propertyAddress"
                                                        value={assetFormData.propertyAddress}
                                                        onPlaceSelected={handlePlaceSelected}
                                                        handleInputChange={handleOnChange}
                                                    />
                                                </div>
                                            )}
                                            {assetFormData.assetType === constants.assetType.BANK_ACCOUNT && (
                                                <div className="form-group">
                                                    <label htmlFor="bankName">Bank name</label>
                                                    <input
                                                        type="text"
                                                        id="bankName"
                                                        name="bankName"
                                                        value={assetFormData.bankName}
                                                        onChange={handleOnChange}
                                                    />
                                                </div>
                                            )}
                                            {assetFormData.assetType === constants.assetType.STOCKS_AND_SHARES && (
                                                <div className="form-group">
                                                    <label htmlFor="companyName">Company name</label>
                                                    <input
                                                        type="text"
                                                        id="companyName"
                                                        name="companyName"
                                                        value={assetFormData.companyName}
                                                        onChange={handleOnChange}
                                                    />
                                                </div>
                                            )}
                                            {(assetFormData.assetType === constants.assetType.PENSION || assetType === constants.assetType.LIFE_INSURANCE) && (
                                                <div className="form-group">
                                                    <label htmlFor="provider">Provider</label>
                                                    <input
                                                        type="text"
                                                        id="provider"
                                                        name="provider"
                                                        value={assetFormData.provider}
                                                        onChange={handleOnChange}
                                                    />
                                                </div>
                                            )}
                                            {assetFormData.assetType === constants.assetType.OTHER && (
                                                <div className="form-group">
                                                    <label htmlFor="otherAssetDetails">Details</label>
                                                    <input
                                                        type="text"
                                                        id="otherAssetDetails"
                                                        name="otherAssetDetails"
                                                        value={assetFormData.otherAssetDetails}
                                                        onChange={handleOnChange}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-btns-container">
                                            <button
                                                className="form-btn"
                                                type="button"
                                                onClick={() => {
                                                    handleshowAssetForm();
                                                    resetAssetForm();
                                                }}
                                            >Cancel</button>
                                            <button
                                                className="form-btn"
                                                type="submit"
                                            >{editAssetIndex !== null ? "Update" : "Add"}</button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    </div>
                </>
                {/* )
                } */}
                <>
                    <div className="section-navigation-container">
                        <OrderNavigation
                            onBack={handleBack}
                            onSaveAndContinue={handleSaveAndContinue}
                            buttonsDisabled={showAssetForm}
                        />
                    </div>
                </>
            </section>
        </>
    )
}

export default AssetsDistribution;


import OrderNavigation from "../CreatigOrderNavigation";
import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import SectionListItem from "../../SectionListItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import styles from "../../../common/styles";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";
import { updateAssetsSlice, createAssetThunk, updateAssetThunk } from "../../../features/orderAssets/orderAssetsSlice"


const Assets = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentOrder = useSelector(state => state.currentOrder);
    const assets = useSelector(state => state.assets)

    const [showAssetForm, setshowAssetForm] = useState(false);
    const [editAssetIndex, setEditAssetIndex] = useState(null);

    const savedAssetsData = useRef(null);

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
    const [assetType, setAssetType] = useState('');


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
        e.preventDefault();

        if (editAssetIndex !== null) {
            const updatedAssets = assets.map((asset, index) =>
                index === editAssetIndex ? assetFormData : asset
            );
            dispatch(updateAssetsSlice(updatedAssets));
            setEditAssetIndex(null); // Reset the edit index
        } else {
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
        setEditAssetIndex(null);
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
        setEditAssetIndex(index);
        setshowAssetForm(true);
    };


    const handleSaveAndContinue = async (e) => {
        e.preventDefault();

        const updatedAssets = [];

        // Create or update each asset
        for (const asset of assets) {
            let response;
            if (asset._id) {
                response = await dispatch(updateAssetThunk(asset)).unwrap();
            }
            else {
                response = await dispatch(createAssetThunk(asset)).unwrap();
            }
            updatedAssets.push({
                ...asset,
                _id: response._id
            });
        }

        // Update assets slice with new assets including their IDs
        await dispatch(updateAssetsSlice(updatedAssets));

        // Prepare updated order with the new asset IDs
        const updatedOrder = {
            ...currentOrder,
            assetsAndDistribution: [
                ...updatedAssets.map(asset => ({
                    assetId: asset._id,
                    assetDistribution: []
                }))
            ]
        };

        // Update the currentOrder slice
        await dispatch(updateCurrentOrderSlice(updatedOrder));
        // Update the order in the backend
        await dispatch(updateOrderThunk(updatedOrder));

        navigate('/creatingOrder');
    };


    const handleBack = () => {
        if (savedAssetsData.current) {
            dispatch(updateAssetsSlice(savedAssetsData.current));
        }
        navigate('/creatingOrder');
    };


    const handlePlaceSelected = (address) => {
        setAssetFormData((prevData) => ({
            ...prevData,
            propertyAddress: address
        }));
    };


    const handleAssetTypeChange = (e) => {
        const selectedType = e.target.value;
        setAssetType(selectedType);
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
                        <h1>Your Assets</h1>
                    </div>
                    <div className="has-children-container">
                        <div>
                            <h4>Please add all the assets that you want to include in the will.</h4>
                        </div>
                    </div>
                </div>
                <div className="section-content-container">
                    <div className="section-controll-container">
                        <div className="section-list-container">
                            {assets.map((asset, index) => (
                                <SectionListItem
                                    key={index}
                                    buttonsDisabled={showAssetForm}
                                    data={asset}
                                    onRemove={() => handleRemoveAsset(index)}
                                    onEdit={() => handleEditAsset(index)}
                                    section="assets"
                                />
                            ))}
                        </div>
                        <div className="sectio-add-btn-container">
                            <button
                                className="section-add-btn"
                                onClick={handleshowAssetForm}
                                style={showAssetForm ? styles.disabledButton : {}}
                                disabled={showAssetForm}
                            >
                                +Add Asset
                            </button>
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

export default Assets;


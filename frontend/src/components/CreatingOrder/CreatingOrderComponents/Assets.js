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
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";


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
            <Container>
                <Row className="mt-3 mb-4 justify-content-center">
                    <Col xs={12} md={4} className="mx-auto">
                        <h1 className="auth-header">Your Assets</h1>
                    </Col>
                </Row>
                <Row className="mt-3 mb-4 justify-content-center">
                    <Col xs={12} className="mx-auto d-flex justify-content-center">
                        <h5>Please add all the assets that you want to include in the will.</h5>
                    </Col>
                </Row>
                <Row className="justify-content-between">
                    <Col md={5} className="mt-4">
                        <Row>
                            <Col >
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
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    variant="primary"
                                    className="m-3"
                                    onClick={handleshowAssetForm}
                                    style={showAssetForm ? styles.disabledButton : {}}
                                    disabled={showAssetForm}
                                >
                                    +Add Asset
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} className="pt-4">
                        {showAssetForm && (
                            <Row>
                                <Col >
                                    <Form onSubmit={handleAssetFormAdd}>
                                        <Form.Group className="mb-3" controlId="formGroupAssetType">
                                            <Form.Label className="bold-label">Asset type</Form.Label>
                                            <Form.Control
                                                as="select"
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
                                            </Form.Control>
                                        </Form.Group>
                                        {assetFormData.assetType === constants.assetType.PROPERTY && (
                                            <Form.Group className="mb-3" controlId="formGroupPropertyAddress">
                                                <Form.Label className="bold-label">Property Address</Form.Label>
                                                <AddressAutocomplete
                                                    id="propertyAddress"
                                                    name="propertyAddress"
                                                    value={assetFormData.propertyAddress}
                                                    onPlaceSelected={handlePlaceSelected}
                                                    handleInputChange={handleOnChange}
                                                />
                                            </Form.Group>
                                        )}
                                        {assetFormData.assetType === constants.assetType.BANK_ACCOUNT && (
                                            <Form.Group className="mb-3" controlId="formGroupBankName">
                                                <Form.Label className="bold-label">Bank name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="bankName"
                                                    name="bankName"
                                                    value={assetFormData.bankName}
                                                    onChange={handleOnChange}
                                                />
                                            </Form.Group>
                                        )}
                                        {assetFormData.assetType === constants.assetType.STOCKS_AND_SHARES && (
                                            <Form.Group className="mb-3" controlId="formGroupCompanyName">
                                                <Form.Label className="bold-label">Company name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="companyName"
                                                    name="companyName"
                                                    value={assetFormData.companyName}
                                                    onChange={handleOnChange}
                                                />
                                            </Form.Group>
                                        )}
                                        {(assetFormData.assetType === constants.assetType.PENSION 
                                        || assetFormData.assetType === constants.assetType.LIFE_INSURANCE) && (
                                            <Form.Group className="mb-3" controlId="formGroupProvider">
                                                <Form.Label className="bold-label">Provider</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="provider"
                                                    name="provider"
                                                    value={assetFormData.provider}
                                                    onChange={handleOnChange}
                                                />
                                            </Form.Group>
                                        )}
                                        {assetFormData.assetType === constants.assetType.OTHER && (
                                            <Form.Group className="mb-3" controlId="formGroupAssetDetails">
                                                <Form.Label className="bold-label">Details</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="otherAssetDetails"
                                                    name="otherAssetDetails"
                                                    value={assetFormData.otherAssetDetails}
                                                    onChange={handleOnChange}
                                                />
                                            </Form.Group>
                                        )}
                                        <Row>
                                            <Col>
                                                <Button
                                                    variant="primary"
                                                    className="m-1 add-edit-form-btn"
                                                    type="button"
                                                    onClick={() => {
                                                        handleshowAssetForm();
                                                        resetAssetForm();
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </Col>
                                            <Col className="d-flex justify-content-end">
                                                <Button
                                                    variant="primary"
                                                    className="m-1 add-edit-form-btn"
                                                    type="submit"
                                                >
                                                    {editAssetIndex !== null ? "Update" : "Add"}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>
            <>
                <OrderNavigation
                    onBack={handleBack}
                    onSaveAndContinue={handleSaveAndContinue}
                    buttonsDisabled={showAssetForm}
                />
            </>
        </>
    )
}

export default Assets;


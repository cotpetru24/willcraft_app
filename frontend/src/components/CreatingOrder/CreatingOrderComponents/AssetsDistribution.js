import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import SectionListItem from "../../SectionListItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import styles from "../../../common/styles";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";
import { updateAssetsSlice } from "../../../features/orderAssets/orderAssetsSlice";
import { updateAdditionalBeneficiariesSlice } from "../../../features/people/additionalBeneficiaries/additionalBeneficiariesSlice";
import additionalBeneficiaryThunks, { createAdditionalBeficiaryThunk, deleteAdditionalBeficiaryThunk } from "../../../features/people/additionalBeneficiaries/additionalBeneficiariesThunks";
import { Container, Row, Col, Form, Button, Accordion, InputGroup } from 'react-bootstrap';
import CreatingOrderNavigation from "../CreatigOrderNavigation";
import { useMediaQuery } from 'react-responsive';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AssetsDistribution = () => {
    const isXs = useMediaQuery({ maxWidth: 767 });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentOrder = useSelector(state => state.currentOrder);
    const assets = useSelector(state => state.assets);
    const additionalBeneficiaries = useSelector(state => state.additionalBeneficiaries);


    const [receivingAmount, setReceivingAmount] = useState('');
    const [totalPercentage, setTotalPercentage] = useState({});
    const [potentialBeneficiaries, setPotentialBeneficiaries] = useState([]);
    const [additionalBeneficiariesToRemove, setAdditionalBeneficiariesToRemove] = useState([]);

    useEffect(() => {



        const updatedPotentialBeneficiaries = [
            ...currentOrder.peopleAndRoles.filter(p =>
                p.role.includes('partner')
                || p.role.includes('kid')
                || p.role.includes('spouse')
            ),
            ...additionalBeneficiaries.map(beneficiary => ({
                ...beneficiary,
                role: 'additional beneficiary'
            }))
        ];


        setPotentialBeneficiaries(updatedPotentialBeneficiaries);
    }, [currentOrder.peopleAndRoles, currentOrder, additionalBeneficiaries]);




    const [showAdditionalBeneficiaryForm, setShowAdditionalBeneficiaryForm] = useState(false);
    const [editAdditionalBeneficiaryIndex, setEditAdditionalBeneficiaryIndex] = useState(null);

    const savedAdditionalBeneficiariesData = useRef(null);
    const savedCurrentOrderData = useRef(null);
    const savedAssetsData = useRef(null);

    let additionalBeneficiary;

    const [additionalBeneficiaryFormData, setAdditionalBeneficiaryFormData] = useState({
        _id: '',
        title: '',
        fullLegalName: '',
        fullAddress: '',
        dob: '',
        email: '',
        tel: '',
        assetId: '',
        role: 'additional beneficiary',
    });

    useEffect(() => {
        if (additionalBeneficiary) {
            setAdditionalBeneficiaryFormData({
                _id: additionalBeneficiaryFormData._id || '',
                title: additionalBeneficiaryFormData.title || '',
                fullLegalName: additionalBeneficiaryFormData.fullLegalName || '',
                fullAddress: additionalBeneficiaryFormData.fullAddress || '',
                dob: additionalBeneficiaryFormData.dob ? new Date(additionalBeneficiaryFormData.dob).toISOString().split('T')[0] : '',
                email: additionalBeneficiaryFormData.email || '',
                tel: additionalBeneficiaryFormData.tel || '',
                assetId: additionalBeneficiaryFormData.assetId || ''
            });
        }

        if (!savedAdditionalBeneficiariesData.current) {
            savedAdditionalBeneficiariesData.current = JSON.parse(JSON.stringify(additionalBeneficiaries));
        }
        if (!savedCurrentOrderData.current) {
            savedCurrentOrderData.current = JSON.parse(JSON.stringify(currentOrder))
        }
        if (!savedAssetsData.current) {
            savedAssetsData.current = JSON.parse(JSON.stringify(assets))
        }
    }, [additionalBeneficiaryFormData, assets]);




    const handleOnChange = (value, assetIndex, personId) => {
        const parsedValue = parseFloat(value) || 0;

        const updatedAssets = assets.map((asset, index) => {
            if (index === assetIndex) {
                const updatedDistribution = asset.distribution.map(dist => {
                    // Match based on either personId or tempId
                    const isMatch = (dist.personId && dist.personId === personId) || (!dist.personId && dist.tempId === personId);

                    if (isMatch) {
                        return { ...dist, receivingAmount: parsedValue };
                    }
                    return dist;
                });
                return { ...asset, distribution: updatedDistribution };
            }
            return asset;
        });

        const total = updatedAssets[assetIndex].distribution.reduce((sum, dist) => sum + (parseFloat(dist.receivingAmount) || 0), 0);

        setTotalPercentage(prev => ({ ...prev, [assetIndex]: total }));

        if (total !== 100) {
            toast.warn(`Total percentage for asset ${assetIndex + 1} is not 100%! It is currently ${total}%`);
        }

        dispatch(updateAssetsSlice(updatedAssets));
    };


    const handleBack = () => {
        if (savedAdditionalBeneficiariesData.current) {
            dispatch(updateAdditionalBeneficiariesSlice(savedAdditionalBeneficiariesData.current));
        }
        if (savedAssetsData.current) {
            dispatch(updateAssetsSlice(savedAssetsData.current));
        }
        if (savedCurrentOrderData.current) {
            dispatch(updateCurrentOrderSlice(savedCurrentOrderData.current));
        }
        navigate('/creatingOrder');
    };


    const handleAdditionalBeneficiaryFormAdd = async (e) => {
        e.preventDefault();

        if (editAdditionalBeneficiaryIndex !== null) {
            const updatedAdditionalBeneficiaries = additionalBeneficiaries.map((beneficiary, index) =>
                index === editAdditionalBeneficiaryIndex ? { personId: additionalBeneficiaryFormData } : { personId: beneficiary.personId }
            );

            dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));

            // Reset the form and state
            setEditAdditionalBeneficiaryIndex(null);
            resetAdditionalBeneficiaryForm();
            setShowAdditionalBeneficiaryForm(false);
        } else {
            // Generate a tempId if _id doesn't exist
            const newBeneficiary = {
                ...additionalBeneficiaryFormData,
                _id: additionalBeneficiaryFormData._id || `temp-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
            };

            const updatedAdditionalBeneficiaries = [...additionalBeneficiaries, { personId: newBeneficiary }];
            await dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));
        }

        resetAdditionalBeneficiaryForm();
        setShowAdditionalBeneficiaryForm(false);
    };


    const handleBeneficiaryChecked = (personIndex, assetIndex, isChecked) => {
        const familyBeneficiary = potentialBeneficiaries[personIndex];
        const assetToUpdate = assets[assetIndex];

        // Update the peopleAndRoles array in currentOrder
        let updatedPeopleAndRoles = currentOrder.peopleAndRoles.map(personRole => {
            if (personRole.personId._id === familyBeneficiary.personId._id) {
                if (isChecked) {
                    return {
                        ...personRole,
                        role: personRole.role.includes('beneficiary') ? personRole.role : [...personRole.role, 'beneficiary']
                    };
                } else {
                    // Check if the person is a beneficiary for any other asset
                    const isBeneficiaryForOtherAssets = currentOrder.assetsAndDistribution.some(asset =>
                        asset.distribution.some(dist => {
                            const distPersonId = typeof dist.personId === 'object' ? dist.personId._id : dist.personId;
                            return distPersonId === familyBeneficiary.personId._id && asset.assetId._id !== assetToUpdate._id;
                        })
                    );

                    if (!isBeneficiaryForOtherAssets) {
                        return {
                            ...personRole,
                            role: personRole.role.filter(role => role !== 'beneficiary')
                        };
                    }
                }
            }
            return personRole;
        });


        // Update the distribution array for the asset
        let updatedDistribution;
        if (isChecked) {
            console.log(`is checked in assets distribution`)
            // Add person to distribution if not already present
            if (!assetToUpdate.distribution.some(d => d.personId._id === familyBeneficiary.personId._id)) {
                console.log(`person is not in the asset distribution, person will be now added`)
                updatedDistribution = [...assetToUpdate.distribution, {
                    personId: familyBeneficiary.personId._id,
                    title: familyBeneficiary.personId.title,
                    fullLegalName: familyBeneficiary.personId.fullLegalName,
                    fullAddress: familyBeneficiary.personId.fullAddress,
                    dob: familyBeneficiary.personId.dob,
                    email: familyBeneficiary.personId.email || '',
                    tel: familyBeneficiary.personId.tel || '',
                    receivingAmount: ''
                }];
            } else {
                updatedDistribution = assetToUpdate.distribution;
            }
        }
        else {
            updatedDistribution = assetToUpdate.distribution.filter(d => {
                const distPersonId = typeof d.personId === 'object' ? d.personId._id : d.personId;
                return distPersonId !== familyBeneficiary.personId._id;
            });
        }

        // Create the updated asset object
        const updatedAsset = { ...assetToUpdate, distribution: updatedDistribution };

        // Update the assets array
        const updatedAssets = assets.map((asset, index) => index === assetIndex ? updatedAsset : asset);


        // Update the assetsAndDistribution in currentOrder
        const updatedCurrentOrderAssetDistribution = currentOrder.assetsAndDistribution.map(asset => {
            console.log(`asset distribution should have been updated`)
            if (asset.assetId._id === assetToUpdate._id) {
                return {
                    ...asset,
                    distribution: updatedDistribution
                };
            }
            return asset;
        });

        // Dispatch the updated assets slice
        dispatch(updateAssetsSlice(updatedAssets));
    };


    const handleOnBenFormChange = (event) => {
        const { name, value } = event.target;
        setAdditionalBeneficiaryFormData({
            ...additionalBeneficiaryFormData,
            [name]: value,
        });
    };

    const handleEditAdditionalBeneficiary = (index) => {
        const beneficiaryToEdit = additionalBeneficiaries[index];
        setAdditionalBeneficiaryFormData({
            _id: beneficiaryToEdit.personId._id || '',
            title: beneficiaryToEdit.personId.title || '',
            fullLegalName: beneficiaryToEdit.personId.fullLegalName || '',
            fullAddress: beneficiaryToEdit.personId.fullAddress || '',
            dob: beneficiaryToEdit.personId.dob ? new Date(beneficiaryToEdit.personId.dob).toISOString().split('T')[0] : '',
            email: beneficiaryToEdit.personId.email || '',
            tel: beneficiaryToEdit.personId.tel || '',
        });
        setEditAdditionalBeneficiaryIndex(index);
        setShowAdditionalBeneficiaryForm(true);
    };


    const handleShowAdditionalBeneficiaryForm = () => {
        setAdditionalBeneficiaryFormData((prevData) => ({
            ...prevData,
        }));
        setShowAdditionalBeneficiaryForm(prevState => !prevState);
    };


    const resetAdditionalBeneficiaryForm = () => {
        setAdditionalBeneficiaryFormData({
            _id: '',
            title: '',
            fullLegalName: '',
            fullAddress: '',
            dob: '',
            email: '',
            tel: '',
            assetId: ''
        });
        setEditAdditionalBeneficiaryIndex(null);
    };


    const handlePlaceSelected = (address) => {
        setAdditionalBeneficiaryFormData((prevData) => ({
            ...prevData,
            fullAddress: address
        }));
    };


    const handleRemoveAdditionalBeneficiary = async (index) => {
        const beneficiaryToDelete = additionalBeneficiaries.find((_, i) => i === index);
        setAdditionalBeneficiariesToRemove(prev => [...prev, beneficiaryToDelete.personId._id])

        const updatedAdditionalBeneficiaries = additionalBeneficiaries.filter((_, i) => i !== index);
        await dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));
    };


    const handleSaveAndContinue = async (e) => {
        e.preventDefault();

        if (additionalBeneficiariesToRemove.length > 0) {
            additionalBeneficiariesToRemove.forEach((benToRemove) => {
                if (benToRemove && !benToRemove.includes("temp")) {
                    dispatch(deleteAdditionalBeficiaryThunk(benToRemove));
                }
            });



            // updaet the slices after removing-assets slice and current order slice ----------------------------------



        }

        if (additionalBeneficiaries) {
            for (const benToStore of additionalBeneficiaries) {
                if (benToStore.personId._id.includes("temp")) {
                    const updatedBenToStoreData = { ...benToStore, role: "additional beneficiary" };
                    const createAddBenResponse = await dispatch(createAdditionalBeficiaryThunk(updatedBenToStoreData.personId));

                    if (createAddBenResponse.payload && createAddBenResponse.payload._id) {
                        const correctId = createAddBenResponse.payload._id;

                        // Update the additionalBeneficiaries slice
                        const updatedAdditionalBeneficiariesSlice = additionalBeneficiaries.map((addBen) => {
                            if (addBen.personId._id === benToStore.personId._id) {
                                return { ...addBen, personId: { ...addBen.personId, _id: correctId } };
                            }
                            return addBen;
                        });
                        await dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiariesSlice));

                        // Update the assets slice
                        const updatedAssetsSlice = assets.map((asset) => {
                            const updatedDistribution = asset.distribution.map((dist) => {
                                if (dist.personId === benToStore.personId._id) {
                                    return { ...dist, personId: correctId };
                                }
                                return dist;
                            });
                            return { ...asset, distribution: updatedDistribution };
                        });
                        await dispatch(updateAssetsSlice(updatedAssetsSlice));

                        // Update the current order's peopleAndRoles
                        const updatedPeopleAndRoles = [
                            ...currentOrder.peopleAndRoles,
                            {
                                personId: {
                                    ...benToStore.personId,
                                    _id: correctId
                                },
                                role: 'additional beneficiary'
                            }
                        ];

                        // Update the current order object with the correct ID
                        const updatedOrder = {
                            ...currentOrder,
                            peopleAndRoles: updatedPeopleAndRoles,
                            assetsAndDistribution: updatedAssetsSlice, // Use the updated assets slice
                        };

                        await dispatch(updateCurrentOrderSlice(updatedOrder));
                        try {
                            const response = await dispatch(updateOrderThunk(updatedOrder));

                            // If the API call is successful, then update the Redux slice
                            if (response && response.payload) {
                                dispatch(updateCurrentOrderSlice(response.payload));
                            } else {
                                throw new Error('Failed to update order');
                            }
                        } catch (error) {
                            console.error('Failed to update order:', error);
                        }
                    }
                }
            }
        }
        navigate('/creatingOrder');
    };


    return (
        <>
            <Container className="mt-5 mb-4">
                <Row className="mt-3 mb-4 justify-content-center">
                    <Col xs={12} className="mx-auto">
                        <h1 className="auth-header">Assets distribution</h1>
                    </Col>
                </Row>
                <Row className="mt-3 mb-4 justify-content-center">
                    <Col xs={12} className="mx-auto d-flex justify-content-center">
                        <h5>Please select or/and add the people you want to receive the assets and their share.</h5>
                    </Col>
                </Row>
            </Container>

            {!isXs ? (
                <Container>
                    <Row className="justify-content-between">
                        <Col md={5} className="mt-4 " >
                            <Row>
                                <Col>
                                    {additionalBeneficiaries.length > 0 && (
                                        <>
                                            <h4 className="ps-3 mb-3"> Additional beneficiaries</h4>
                                            {additionalBeneficiaries.map((person, personIndex) => {
                                                return (
                                                    <SectionListItem
                                                        // key={`person-${personIndex}`}
                                                        key={`person-${person._id || personIndex}`}
                                                        buttonsDisabled={showAdditionalBeneficiaryForm}
                                                        data={{ ...person, role: 'additional beneficiary' }}
                                                        onRemove={() => handleRemoveAdditionalBeneficiary(personIndex)}
                                                        onEdit={() => handleEditAdditionalBeneficiary(personIndex)}
                                                        section="assetDistribution-additionalBeneficiary"
                                                    />
                                                );
                                            })}
                                        </>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        variant="success"
                                        className="m-3"
                                        onClick={() => handleShowAdditionalBeneficiaryForm()}
                                        style={showAdditionalBeneficiaryForm ? styles.disabledButton : {}}
                                        disabled={showAdditionalBeneficiaryForm}
                                    >
                                        +Add Beneficiary
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="m-2">
                                    {assets.map((asset, assetIndex) => (

                                        <Accordion className="mt-4 ml-3 accordion-custom-border" defaultActiveKey="0" key={`asset-${asset._id || assetIndex}`}>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>
                                                    <Container>
                                                        <Row>
                                                            <Col>
                                                                <Row>
                                                                    <Col>
                                                                        <p className="order-item-p"><span className="order-item-p-span">
                                                                            Asset:  </span>{asset.assetType}</p>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col>
                                                                        {asset.assetType === 'Property' &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Address:  </span>{asset.propertyAddress}</p>}
                                                                        {asset.assetType === 'Bank Account' &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Bank Name:  </span>{asset.bankName}</p>}
                                                                        {asset.assetType === 'Stocks and shares' &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Company Name:  </span>{asset.companyName}</p>}
                                                                        {(asset.assetType === 'Pension' || asset.assetType === 'Life insurance') &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Provider:  </span>{asset.provider}</p>}
                                                                        {asset.assetType === 'Other' &&
                                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                                Details:  </span>{asset.otherAssetDetails}</p>}
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col className="d-flex justify-content-end">
                                                                <InputGroup className="total-amount-form-control">
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={totalPercentage[assetIndex] || 0}
                                                                        disabled
                                                                    />
                                                                    <InputGroup.Text>%</InputGroup.Text>
                                                                </InputGroup>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {potentialBeneficiaries.map((person, personIndex) => (
                                                        <SectionListItem
                                                            key={`asset-${assetIndex}-person-${person.personId._id || personIndex}`}
                                                            buttonsDisabled={showAdditionalBeneficiaryForm}
                                                            data={person.personId}
                                                            onRemove={() => handleRemoveAdditionalBeneficiary(personIndex)}
                                                            onEdit={() => handleEditAdditionalBeneficiary(personIndex)}
                                                            onChecked={(isChecked) => handleBeneficiaryChecked(personIndex, assetIndex, isChecked)}
                                                            section="assetDistribution-beneficiary"
                                                            asset={asset}
                                                            onChange={handleOnChange}
                                                            assetIndex={assetIndex}
                                                        />
                                                    ))}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4} className="pt-4 order-1 order-md-0">
                            {showAdditionalBeneficiaryForm && (
                                <Row>
                                    <Col >
                                        <Form onSubmit={handleAdditionalBeneficiaryFormAdd}>
                                            <Form.Group className="mb-3" controlId="formGroupTitle">
                                                <Form.Label className="bold-label">Title</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    name="title"
                                                    value={additionalBeneficiaryFormData.title}
                                                    onChange={handleOnBenFormChange}
                                                    required
                                                    className="custom-input"
                                                >
                                                    {Object.values(constants.title).map((title, index) => (
                                                        <option key={index} value={title}>
                                                            {title}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupFullLegalName">
                                                <Form.Label className="bold-label">Full legal name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="fullLegalName"
                                                    value={additionalBeneficiaryFormData.fullLegalName}
                                                    onChange={handleOnBenFormChange}
                                                    required
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupFullAddress">
                                                <Form.Label className="bold-label">Full address</Form.Label>
                                                <AddressAutocomplete
                                                    name="fullAddress"
                                                    value={additionalBeneficiaryFormData.fullAddress}
                                                    onPlaceSelected={handlePlaceSelected}
                                                    handleInputChange={handleOnBenFormChange}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupDob">
                                                <Form.Label className="bold-label">Date of birth</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="dob"
                                                    value={additionalBeneficiaryFormData.dob}
                                                    onChange={handleOnBenFormChange}
                                                    required
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Label className="bold-label">Email (optional)</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={additionalBeneficiaryFormData.email}
                                                    onChange={handleOnBenFormChange}
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupPhone">
                                                <Form.Label className="bold-label">Phone Number (optional)</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    name="tel"
                                                    value={additionalBeneficiaryFormData.tel}
                                                    onChange={handleOnBenFormChange}
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Row>
                                                <Col>
                                                    <Button
                                                        variant="primary"
                                                        className="m-1 add-edit-form-btn"
                                                        type="button"
                                                        onClick={() => {
                                                            handleShowAdditionalBeneficiaryForm();
                                                            resetAdditionalBeneficiaryForm();
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
                                                        {editAdditionalBeneficiaryIndex !== null ? "Update" : "Add"}
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            )}
                        </Col>
                    </Row>
                    <>
                        <CreatingOrderNavigation
                            onBack={handleBack}
                            onSaveAndContinue={handleSaveAndContinue}
                            buttonsDisabled={showAdditionalBeneficiaryForm}
                        />
                    </>
                </Container >
            ) : (
                <Container>
                    <Row className="justify-content-between">
                        <Col md={5} className="mt-4 " >
                            <Row>
                                <Col>
                                    {additionalBeneficiaries.length > 0 && (
                                        <>
                                            <h4 className="ps-3 mb-3"> Additional beneficiaries</h4>
                                            {additionalBeneficiaries.map((person, personIndex) => (
                                                <SectionListItem
                                                    key={`person-${person._id || personIndex}`}
                                                    buttonsDisabled={showAdditionalBeneficiaryForm}
                                                    data={{ ...person, role: 'additional beneficiary' }}
                                                    onRemove={() => handleRemoveAdditionalBeneficiary(personIndex)}
                                                    onEdit={() => handleEditAdditionalBeneficiary(personIndex)}
                                                    section="assetDistribution-additionalBeneficiary"
                                                />
                                            ))}
                                        </>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        variant="success"
                                        className="m-3"
                                        onClick={() => handleShowAdditionalBeneficiaryForm()}
                                        style={showAdditionalBeneficiaryForm ? styles.disabledButton : {}}
                                        disabled={showAdditionalBeneficiaryForm}
                                    >
                                        +Add Beneficiary
                                    </Button>
                                </Col>
                                <Col md={4} className="pt-4 order-1 order-md-0">
                                    {showAdditionalBeneficiaryForm && (
                                        <Row>
                                            <Col >
                                                <Form onSubmit={handleAdditionalBeneficiaryFormAdd}>
                                                    <Form.Group className="mb-3" controlId="formGroupTitle">
                                                        <Form.Label className="bold-label">Title</Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            name="title"
                                                            value={additionalBeneficiaryFormData.title}
                                                            onChange={handleOnBenFormChange}
                                                            required
                                                            className="custom-input"
                                                        >
                                                            {Object.values(constants.title).map((title, index) => (
                                                                <option key={index} value={title}>
                                                                    {title}
                                                                </option>
                                                            ))}
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupFullLegalName">
                                                        <Form.Label className="bold-label">Full legal name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="fullLegalName"
                                                            value={additionalBeneficiaryFormData.fullLegalName}
                                                            onChange={handleOnBenFormChange}
                                                            required
                                                            className="custom-input"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupFullAddress">
                                                        <Form.Label className="bold-label">Full address</Form.Label>
                                                        <AddressAutocomplete
                                                            name="fullAddress"
                                                            value={additionalBeneficiaryFormData.fullAddress}
                                                            onPlaceSelected={handlePlaceSelected}
                                                            handleInputChange={handleOnBenFormChange}
                                                            required
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupDob">
                                                        <Form.Label className="bold-label">Date of birth</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="dob"
                                                            value={additionalBeneficiaryFormData.dob}
                                                            onChange={handleOnBenFormChange}
                                                            required
                                                            className="custom-input"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label className="bold-label">Email (optional)</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            name="email"
                                                            value={additionalBeneficiaryFormData.email}
                                                            onChange={handleOnBenFormChange}
                                                            className="custom-input"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupPhone">
                                                        <Form.Label className="bold-label">Phone Number (optional)</Form.Label>
                                                        <Form.Control
                                                            type="tel"
                                                            name="tel"
                                                            value={additionalBeneficiaryFormData.tel}
                                                            onChange={handleOnBenFormChange}
                                                            className="custom-input"
                                                        />
                                                    </Form.Group>
                                                    <Row>
                                                        <Col>
                                                            <Button
                                                                variant="primary"
                                                                className="m-1 add-edit-form-btn"
                                                                type="button"
                                                                onClick={() => {
                                                                    handleShowAdditionalBeneficiaryForm();
                                                                    resetAdditionalBeneficiaryForm();
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
                                                                {editAdditionalBeneficiaryIndex !== null ? "Update" : "Add"}
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="m-2">
                                    {assets.map((asset, assetIndex) => (
                                        <Accordion className="mt-4 ml-3 accordion-custom-border" defaultActiveKey="0" key={`asset-${asset._id || assetIndex}`}>                                            <Accordion.Item eventKey="0">
                                            <Accordion.Header>
                                                <Container>
                                                    <Row>
                                                        <Col>
                                                            <p className="order-item-p"><span className="order-item-p-span">
                                                                Asset:  </span>{asset.assetType}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            {asset.assetType === 'Property' &&
                                                                <p className="order-item-p"><span className="order-item-p-span">
                                                                    Address:  </span>{asset.propertyAddress}</p>}
                                                            {asset.assetType === 'Bank Account' &&
                                                                <p className="order-item-p"><span className="order-item-p-span">
                                                                    Bank Name:  </span>{asset.bankName}</p>}
                                                            {asset.assetType === 'Stocks and shares' &&
                                                                <p className="order-item-p"><span className="order-item-p-span">
                                                                    Company Name:  </span>{asset.companyName}</p>}
                                                            {(asset.assetType === 'Pension' || asset.assetType === 'Life insurance') &&
                                                                <p className="order-item-p"><span className="order-item-p-span">
                                                                    Provider:  </span>{asset.provider}</p>}
                                                            {asset.assetType === 'Other' &&
                                                                <p className="order-item-p"><span className="order-item-p-span">
                                                                    Details:  </span>{asset.otherAssetDetails}</p>}
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                {potentialBeneficiaries.map((person, personIndex) => (
                                                    <SectionListItem
                                                        key={`asset-${assetIndex}-person-${personIndex}`}
                                                        buttonsDisabled={showAdditionalBeneficiaryForm}
                                                        data={person.personId}
                                                        onRemove={() => handleRemoveAdditionalBeneficiary(personIndex)}
                                                        onEdit={() => handleEditAdditionalBeneficiary(personIndex)}
                                                        onChecked={(isChecked) => handleBeneficiaryChecked(personIndex, assetIndex, isChecked)}
                                                        section="assetDistribution-beneficiary"
                                                        asset={asset}
                                                        onChange={handleOnChange}
                                                        assetIndex={assetIndex}
                                                    />
                                                ))}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        </Accordion>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <>
                        <CreatingOrderNavigation
                            onBack={handleBack}
                            onSaveAndContinue={handleSaveAndContinue}
                            buttonsDisabled={showAdditionalBeneficiaryForm}
                        />
                    </>
                </Container >
            )}

            <ToastContainer position="top-center" autoClose={5000} />
        </>
    );
}


export default AssetsDistribution;


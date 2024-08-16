import OrderNavigation from "../CreatigOrderNavigation";
import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import DateInput from "../../Common/DateInput";
import SectionListItem from "../../SectionListItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import styles from "../../../common/styles";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";
import { updateAssetsSlice, createAssetThunk, updateAssetThunk } from "../../../features/orderAssets/orderAssetsSlice";
import { updateAdditionalBeneficiariesSlice } from "../../../features/people/additionalBeneficiaries/additionalBeneficiariesSlice";
import additionalBeneficiaryThunks from "../../../features/people/additionalBeneficiaries/additionalBeneficiariesThunks";
import { Container, Row, Col, Form, Button, Accordion, Card } from 'react-bootstrap';
import CreatingOrderNavigation from "../CreatigOrderNavigation";


const AssetsDistribution = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentOrder = useSelector(state => state.currentOrder);
    const assets = useSelector(state => state.assets);
    const additionalBeneficiaries = useSelector(state => state.additionalBeneficiaries);

    const spouseOrPartner = useSelector(state => state.spouseOrPartner);
    const kids = useSelector(state => state.kids);
    // const family = [].concat(spouseOrPartner, kids);

    const [receivingAmount, setReceivingAmount] = useState('');

    const [family, setFamily] = useState([]);

    useEffect(() => {
        const updatedFamily = currentOrder.peopleAndRoles
            .filter(p =>
                p.role.includes('partner')
                || p.role.includes('kid')
                || p.role.includes('spouse')
                || p.role.includes('additional beneficiary'));
        setFamily(updatedFamily);
    }, [currentOrder.peopleAndRoles, currentOrder]);




    const [showAdditionalBeneficiaryForm, setShowAdditionalBeneficiaryForm] = useState(false);
    const [editAdditionalBeneficiaryIndex, setEditAdditionalBeneficiaryIndex] = useState(null);

    const savedAdditionalBeneficiariesData = useRef(null);
    const savedCurrentOrderData = useRef(null);

    let additionalBeneficiary;

    const [additionalBeneficiaryFormData, setAdditionalBeneficiaryFormData] = useState({
        _id: '',
        title: '',
        fullLegalName: '',
        fullAddress: '',
        dob: '',
        email: '',
        tel: '',
        assetId: '' // Add assetId to track which asset this beneficiary belongs to
    });

    useEffect(() => {
        if (additionalBeneficiary) {
            setAdditionalBeneficiaryFormData({
                _id: additionalBeneficiaryFormData._id || '',
                title: additionalBeneficiaryFormData.title || '',
                fullLegalName: additionalBeneficiaryFormData.fullLegalName || '',
                fullAddress: additionalBeneficiaryFormData.fullAddress || '',
                // dob: additionalBeneficiaryFormData.dob || '',
                dob: additionalBeneficiaryFormData.dob ? new Date(additionalBeneficiaryFormData.dob).toISOString().split('T')[0] : '',

                email: additionalBeneficiaryFormData.email || '',
                tel: additionalBeneficiaryFormData.tel || '',
                assetId: additionalBeneficiaryFormData.assetId || '' // Include assetId in the form data
            });
        }

        if (!savedAdditionalBeneficiariesData.current) {
            savedAdditionalBeneficiariesData.current = JSON.parse(JSON.stringify(assets));
        }
        if (!savedCurrentOrderData.current) {
            savedCurrentOrderData.current = JSON.parse(JSON.stringify(currentOrder))
        }
    }, [additionalBeneficiaryFormData, assets]);

    const handleShowAdditionalBeneficiaryForm = () => {
        setAdditionalBeneficiaryFormData((prevData) => ({
            ...prevData,
        }));
        setShowAdditionalBeneficiaryForm(prevState => !prevState);
    };

    // const handleOnChange = (e) => {
    //     const { name, value } = e.target;
    //     setAdditionalBeneficiaryFormData((prevData) => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };





    // const handleOnChange = (event, personId, assetIndex) => {
    //     const { value } = event.target;

    //     // Update the distribution array for the specific asset
    //     const updatedAssets = assets.map((asset, index) => {
    //         if (index === assetIndex) {
    //             const updatedDistribution = asset.distribution.map(distribution => {
    //                 if (distribution.personId=== personId) {
    //                     return {
    //                         ...distribution,
    //                         receivingAmount: value,
    //                     };
    //                 }
    //                 return distribution;
    //             });
    //             return {
    //                 ...asset,
    //                 distribution: updatedDistribution,
    //             };
    //         }
    //         return asset;
    //     });

    //     // Dispatch the updated assets
    //     dispatch(updateAssetsSlice(updatedAssets));
    // };



    // const handleOnChange = (event, assetIndex, personId) => {
    //     if (!event || !event.target) {
    //         console.error("Event is undefined or target is missing");
    //         return;
    //     }

    //     const { value } = event.target;

    //     // Use the assetIndex and personId to update the correct asset's distribution
    //     const updatedAssets = assets.map((asset, index) => {
    //         if (index === assetIndex) {
    //             const updatedDistribution = asset.distribution.map(dist => {
    //                 if (dist.personId._id === personId) {
    //                     return { ...dist, receivingAmount: value };
    //                 }
    //                 return dist;
    //             });
    //             return { ...asset, distribution: updatedDistribution };
    //         }
    //         return asset;
    //     });

    //     dispatch(updateAssetsSlice(updatedAssets));
    // };


    // const handleOnChange = (event, assetIndex, personId) => {
    //     if (!event || !event.target) {
    //         console.error("Event is undefined or target is missing");
    //         return;
    //     }

    //     const { value } = event.target;

    //     // Update the local state first to reflect changes immediately in the UI
    //     setReceivingAmount(value);

    //     // Use the assetIndex and personId to update the correct asset's distribution
    //     const updatedAssets = assets.map((asset, index) => {
    //         if (index === assetIndex) {
    //             const updatedDistribution = asset.distribution.map(dist => {
    //                 if (dist.personId._id === personId) {
    //                     return { ...dist, receivingAmount: value };
    //                 }
    //                 return dist;
    //             });
    //             return { ...asset, distribution: updatedDistribution };
    //         }
    //         return asset;
    //     });

    //     // Dispatch the updated assets to the Redux slice
    //     dispatch(updateAssetsSlice(updatedAssets));
    // };

    // const handleOnChange = (value, assetIndex, personId) => {
    //     const updatedAssets = assets.map((asset, index) => {
    //         if (index === assetIndex) {
    //             const updatedDistribution = asset.distribution.map(dist => {
    //                 if (dist.personId._id === personId) {
    //                     return { ...dist, receivingAmount: value };
    //                 }
    //                 return dist;
    //             });
    //             return { ...asset, distribution: updatedDistribution };
    //         }
    //         return asset;
    //     });

    //     dispatch(updateAssetsSlice(updatedAssets));
    // };

    // AssetsDistribution.js

    // const handleOnChange = (value, assetIndex, personId) => {
    //     const updatedAssets = assets.map((asset, index) => {
    //         if (index === assetIndex) {
    //             const updatedDistribution = asset.distribution.map(dist => {
    //                 if (dist.personId._id === personId) {
    //                     return { ...dist, receivingAmount: value };
    //                 }
    //                 return dist;
    //             });
    //             return { ...asset, distribution: updatedDistribution };
    //         }
    //         return asset;
    //     });

    //     dispatch(updateAssetsSlice(updatedAssets));

    //     // Update current order
    //     const updatedAssetsAndDistribution = updatedAssets.map(asset => ({
    //         assetId: asset._id || asset.assetId,
    //         distribution: asset.distribution.map(dist => ({
    //             personId: dist.personId._id ? dist.personId._id : dist.personId,
    //             receivingAmount: dist.receivingAmount || 'percentage here'
    //         }))
    //     }));

    //     const updatedOrder = {
    //         ...currentOrder,
    //         assetsAndDistribution: updatedAssetsAndDistribution
    //     };

    //     dispatch(updateCurrentOrderSlice(updatedOrder));
    // };
    const handleOnChange = (value, assetIndex, personId) => {
        console.log(`handleOnChange called with value: ${value}, assetIndex: ${assetIndex}, personId: ${personId}`);

        const updatedAssets = assets.map((asset, index) => {
            if (index === assetIndex) {
                const updatedDistribution = asset.distribution.map(dist => {
                    if (dist.personId === personId) {
                        console.log(`Updating receivingAmount for personId: ${personId} to value: ${value}`);
                        return { ...dist, receivingAmount: value };
                    }
                    return dist;
                });
                return { ...asset, distribution: updatedDistribution };
            }
            return asset;
        });

        console.log('Updated assets:', updatedAssets);
        dispatch(updateAssetsSlice(updatedAssets));

        // Update current order
        const updatedAssetsAndDistribution = updatedAssets.map(asset => ({
            assetId: asset._id || asset.assetId,
            distribution: asset.distribution.map(dist => ({
                personId: dist.personId._id ? dist.personId._id : dist.personId,
                receivingAmount: dist.receivingAmount || 'percentage here'
            }))
        }));

        const updatedOrder = {
            ...currentOrder,
            assetsAndDistribution: updatedAssetsAndDistribution
        };

        console.log('Updated order:', updatedOrder);
        dispatch(updateCurrentOrderSlice(updatedOrder));
    };













    const handleAdditionalBeneficiaryFormAdd = async (e) => {
        e.preventDefault();

        // if (editAdditionalBeneficiaryIndex !== null) {
        //     const updatedAdditionalBeneficiaries = additionalBeneficiaries.map((beneficiary, index) =>
        //         index === editAdditionalBeneficiaryIndex ? additionalBeneficiaryFormData : beneficiary
        //     );

        //     dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));
        //     setEditAdditionalBeneficiaryIndex(null);
        // } 


        if (editAdditionalBeneficiaryIndex !== null) {
            const updatedAdditionalBeneficiaries = additionalBeneficiaries.map((beneficiary, index) =>
                index === editAdditionalBeneficiaryIndex ? { personId: additionalBeneficiaryFormData } : { personId: beneficiary.personId }
            );

            // Dispatch update to the additional beneficiaries slice
            dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));

            // Dispatch the thunk to update the beneficiary details in the database
            await dispatch(additionalBeneficiaryThunks.updateAdditionalBeficiaryThunk(additionalBeneficiaryFormData));

            // Update the assets slice
            const updatedAssets = assets.map(asset => {
                if (asset.distribution.some(dist => dist.personId === additionalBeneficiaryFormData._id)) {
                    return {
                        ...asset,
                        distribution: asset.distribution.map(dist =>
                            dist.personId === additionalBeneficiaryFormData._id ?
                                { ...dist, ...additionalBeneficiaryFormData } : dist
                        )
                    };
                }
                return asset;
            });

            dispatch(updateAssetsSlice(updatedAssets));

            // Update the current order slice
            const updatedOrder = {
                ...currentOrder,
                peopleAndRoles: currentOrder.peopleAndRoles.map(pr =>
                    pr.personId._id === additionalBeneficiaryFormData._id ?
                        { ...pr, personId: additionalBeneficiaryFormData } : pr
                ),
                assetsAndDistribution: updatedAssets.map(asset => ({
                    assetId: asset._id,
                    distribution: asset.distribution
                }))
            };

            await dispatch(updateCurrentOrderSlice(updatedOrder));

            // Reset the form and state
            setEditAdditionalBeneficiaryIndex(null);
            resetAdditionalBeneficiaryForm();
            setShowAdditionalBeneficiaryForm(false);
        }



        else {

            const createAdditionalBeficiaryResponse = await dispatch(
                additionalBeneficiaryThunks.createAdditionalBeficiaryThunk(additionalBeneficiaryFormData)).unwrap();

            const updatedBeneficiaries = [...additionalBeneficiaries, { personId: createAdditionalBeficiaryResponse }];
            await dispatch(updateAdditionalBeneficiariesSlice(updatedBeneficiaries));

            const updatedOrder = {
                ...currentOrder,
                peopleAndRoles: [
                    ...currentOrder.peopleAndRoles.filter(pr => !pr.role.includes('additional beneficiary')),
                    ...updatedBeneficiaries.map(beneficiary => ({
                        personId: beneficiary.personId,
                        role: ['additional beneficiary']
                    }))
                ]

            };

            // Update the order in the backend
            await dispatch(updateOrderThunk(updatedOrder));
            // Update the currentOrder slice
            await dispatch(updateCurrentOrderSlice(updatedOrder));
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
            tel: '',
            assetId: ''
        });
        setEditAdditionalBeneficiaryIndex(null);
    };


    const handleRemoveAdditionalBeneficiary = async (index) => {
        const updatedAdditionalBeneficiaries = additionalBeneficiaries.filter((_, i) => i !== index);
        const beneficiaryToDelete = additionalBeneficiaries.find((_, i) => i == index);
        console.log(`benId to delete = ${JSON.stringify(beneficiaryToDelete)}`)
        console.log(`ben id =${JSON.stringify(beneficiaryToDelete.personId._id)}`)
        await dispatch(updateAdditionalBeneficiariesSlice(updatedAdditionalBeneficiaries));


        await dispatch(additionalBeneficiaryThunks.deleteAdditionalBeficiaryThunk(beneficiaryToDelete.personId._id))
    };

    const handleEditAdditionalBeneficiary = (index) => {
        const beneficiaryToEdit = additionalBeneficiaries[index];
        setAdditionalBeneficiaryFormData({
            _id: beneficiaryToEdit.personId._id || '',
            title: beneficiaryToEdit.personId.title || '',
            fullLegalName: beneficiaryToEdit.personId.fullLegalName || '',
            fullAddress: beneficiaryToEdit.personId.fullAddress || '',
            // dob: beneficiaryToEdit.personId.dob || '',
            dob: beneficiaryToEdit.personId.dob ? new Date(beneficiaryToEdit.personId.dob).toISOString().split('T')[0] : '',
            email: beneficiaryToEdit.personId.email || '',
            tel: beneficiaryToEdit.personId.tel || '',
            // assetId: beneficiaryToEdit.assetId || ''
        });
        setEditAdditionalBeneficiaryIndex(index);
        setShowAdditionalBeneficiaryForm(true);
    };














    const handleSaveAndContinue = async (e) => {
        e.preventDefault();

        // const updatedAssets = [];

        // for (const asset of assets) {
        //     let response;
        //     if (asset._id) {
        //         response = await dispatch(updateAssetThunk(asset)).unwrap();
        //     } else {
        //         response = await dispatch(createAssetThunk(asset)).unwrap();
        //     }
        //     updatedAssets.push({
        //         ...asset,
        //         _id: response._id
        //     });
        // }

        // await dispatch(updateAssetsSlice(updatedAssets));

        // const updatedOrder = {
        //     ...currentOrder,
        //     assetsAndDistribution: updatedAssets.map(asset => ({
        //         assetId: asset._id,
        //         assetDistribution: asset.distribution || []
        //     }))
        // };



        const updatedOrder = {
            ...currentOrder
        };

        await dispatch(updateOrderThunk(updatedOrder));



        // await dispatch(updateCurrentOrderSlice(updatedOrder));

        navigate('/creatingOrder');
    };






















    const handleBack = () => {
        if (savedAdditionalBeneficiariesData.current) {
            dispatch(updateAdditionalBeneficiariesSlice(savedAdditionalBeneficiariesData.current));
        }
        if (savedCurrentOrderData.current) {
            dispatch(updateCurrentOrderSlice(savedCurrentOrderData.current));
            console.log(`dispatched update current order slice`);
        }
        navigate('/creatingOrder');
    };

    const handlePlaceSelected = (address) => {
        setAdditionalBeneficiaryFormData((prevData) => ({
            ...prevData,
            fullAddress: address
        }));
    };




    const handleBeneficiaryChecked = (personIndex, assetIndex, isChecked) => {
        const familyBeneficiary = family[personIndex];
        const assetToUpdate = assets[assetIndex];

        console.log(`asset distribution => Handling beneficiary check: ${isChecked}, Person: ${familyBeneficiary.personId.fullLegalName}, Asset: ${assetToUpdate.assetType}`);





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

                    console.log(`Is ${familyBeneficiary.personId.fullLegalName} a beneficiary for other assets?`, isBeneficiaryForOtherAssets);

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





        // console.log(`Updated people and roles: ${JSON.stringify(updatedPeopleAndRoles)}`);

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
                    receivingAmount: "percentage here"
                }];
            } else {
                updatedDistribution = assetToUpdate.distribution;
            }
        }



        else {
            // Remove person from distribution
            console.log(`should have removed the person with id= ${familyBeneficiary.personId._id} from --------- ${JSON.stringify(assetToUpdate.distribution)}`)
            updatedDistribution = assetToUpdate.distribution.filter(d => {
                const distPersonId = typeof d.personId === 'object' ? d.personId._id : d.personId;
                return distPersonId !== familyBeneficiary.personId._id;
            });
            console.log(`this should have the person removed ${JSON.stringify(updatedDistribution)}`)
        }



        // console.log(`Updated distribution: ${JSON.stringify(updatedDistribution)}`);

        // Create the updated asset object
        const updatedAsset = { ...assetToUpdate, distribution: updatedDistribution };

        // Update the assets array
        const updatedAssets = assets.map((asset, index) => index === assetIndex ? updatedAsset : asset);

        // console.log(`Updated assets: ${JSON.stringify(updatedAssets)}`);

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

        // console.log(`Updated current order asset distribution: ${JSON.stringify(updatedCurrentOrderAssetDistribution)}`);

        // Dispatch the updated assets slice
        dispatch(updateAssetsSlice(updatedAssets));

        // Dispatch the updated current order slice
        dispatch(updateCurrentOrderSlice({
            ...currentOrder,
            peopleAndRoles: updatedPeopleAndRoles,
            assetsAndDistribution: updatedCurrentOrderAssetDistribution
        }));

        console.log('Dispatched updated state');
    };

    const handleOnBenFormChange = (event) => {
        const { name, value } = event.target;
        setAdditionalBeneficiaryFormData({
            ...additionalBeneficiaryFormData,
            [name]: value,
        });
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

                <Row className="justify-content-between">
                    <Col md={5} className="mt-4">
                        <Row>
                            <Col>
                                {additionalBeneficiaries.length > 0 && (
                                    <>
                                        <h4 className="ps-3 mb-3"> Additional beneficiaries</h4>
                                        {additionalBeneficiaries.map((person, personIndex) => (
                                            <SectionListItem
                                                key={`person-${personIndex}`}
                                                buttonsDisabled={showAdditionalBeneficiaryForm}
                                                data={{ ...person.personId, role: 'additional beneficiary' }}
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
                        </Row>
                        <Row>
                            <Col className="m-2">
                                {assets.map((asset, assetIndex) => (

                                    <Accordion className="mt-4 ml-3 accordion-custom-border" defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
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
                                                {family.map((person, personIndex) => (
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
                    <Col md={4} className="pt-4">
                        {showAdditionalBeneficiaryForm && (
                            <Row>
                                <Col >
                                    <Form onSubmit={handleAdditionalBeneficiaryFormAdd}>
                                        <Form.Group className="mb-3" controlId="formGroupTitle">
                                            <Form.Label className="bold-label">Title</Form.Label>
                                            <Form.Control
                                                as="select"
                                                id="title"
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
                                                id="fullLegalName"
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
                                                id="dob"
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
                                                id="email"
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
                                                id="tel"
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
        </>
    );
}

export default AssetsDistribution;


import constants from "../../../common/constants";
import AddressAutocomplete from "../../Common/AddressAutocomplete";
import DateInput from "../../Common/DateInput";
import SectionListItem from "../../SectionListItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import styles from "../../../common/styles";
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";
import { createPerson } from "../../../features/people/peopleService";
import { createKidThunk } from "../../../features/people/kids/kidsThunks";
import { updateAssetsSlice, createAssetThunk, updateAssetThunk } from "../../../features/orderAssets/orderAssetsSlice"
// import { removeAdditionalExecutorSlice, updateAdditionalExecutorsSlice } from "../../../features/additionalExecutors/additionalExecutorsSlice";
import { createExecutorThunk, updateExecutorThunk } from "../../../features/additionalExecutors/additionalExecutorsThunks";
import { updateAdditionalExecutorsSlice } from "../../../features/additionalExecutors/additionalExecutorsSlice"
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import CreatingOrderNavigation from "../CreatigOrderNavigation";



const Executors = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentOrder = useSelector(state => state.currentOrder);


    const spouseOrPartner = useSelector(state => state.spouseOrPartner);
    const kids = useSelector(state => state.kids);
    const additionalBeneficiaries = useSelector(state => state.additionalBeneficiaries)
    const additionalExecutors = useSelector(state => state.additionalExecutors)

    const [family, setFamily] = useState([]);

    useEffect(() => {
        const updatedFamily = currentOrder.peopleAndRoles
            .filter(p =>
                p.role.includes('spouse')
                || p.role.includes('partner')
                || p.role.includes('kid')
                || p.role.includes('beneficiary')
                || p.role.includes('additional beneficiary'));
        setFamily(updatedFamily);
    }, [currentOrder.peopleAndRoles, currentOrder]);

    const [showExecutorForm, setShowExecutorForm] = useState(false);
    const [editExecutorIndex, setEditExecutorIndex] = useState(null); // New state to track the index of the kid being edited

    // Use useRef to store the "saved" state
    const savedAdditionalExecutorsData = useRef(null);
    const savedCurrentOrderData = useRef(null);

    let executor;

    const [additionalExecutorFormData, setExecutorFormData] = useState({
        _id: '',
        title: '',
        fullLegalName: '',
        fullAddress: '',
        dob: '',
        email: '',
        tel: ''
    });



    useEffect(() => {
        if (executor) {
            setExecutorFormData({
                _id: additionalExecutorFormData._id || '',
                title: additionalExecutorFormData.title || '',
                fullLegalName: additionalExecutorFormData.fullLegalName || '',
                fullAddress: additionalExecutorFormData.fullAddress || '',
                dob: additionalExecutorFormData.dob || '',
                email: additionalExecutorFormData.email || '',
                tel: additionalExecutorFormData.tel || ''
            })
        }
        // Store the initial state as "saved" state if it's not already saved
        if (!savedAdditionalExecutorsData.current) {
            savedAdditionalExecutorsData.current = JSON.parse(JSON.stringify(additionalExecutors));
        }
        if (!savedCurrentOrderData.current) {
            savedCurrentOrderData.current = JSON.parse(JSON.stringify(currentOrder))
        }
    }, [additionalExecutors]);


    const handleShowExecutorForm = () => {
        setShowExecutorForm(prevState => !prevState);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setExecutorFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleExecutorFormAdd = (e) => {
        e.preventDefault();

        if (editExecutorIndex !== null) {
            const updatedAdditionalExecutors = additionalExecutors.map((executor, index) =>
                index === editExecutorIndex ? additionalExecutorFormData : executor
            );
            dispatch(updateAdditionalExecutorsSlice(updatedAdditionalExecutors));
            setEditExecutorIndex(null); // Reset the edit index
        } else {
            dispatch(updateAdditionalExecutorsSlice([...additionalExecutors, additionalExecutorFormData]));
        }

        resetExecutorForm();
        setShowExecutorForm(false);
    };

    const resetExecutorForm = () => {
        setExecutorFormData({
            _id: '',
            title: '',
            fullLegalName: '',
            fullAddress: '',
            dob: '',
            email: '',
            tel: ''

        });
        setEditExecutorIndex(null); // Reset the edit index
    };

    const handleRemoveExecutor = (index) => {
        const updatedAdditionalExecutors = additionalExecutors.filter((_, i) => i !== index);
        dispatch(updateAdditionalExecutorsSlice(updatedAdditionalExecutors));
    };

    const handleEditExecutor = (index) => {
        const executorToEdit = additionalExecutors[index];
        setExecutorFormData({
            _id: executorToEdit._id || '',
            title: executorToEdit.title || '',
            fullLegalName: executorToEdit.fullLegalName || '',
            fullAddress: executorToEdit.fullAddress || '',
            dob: executorToEdit.dob || '',
            email: executorToEdit.email || '',
            tel: executorToEdit.tel || ''
        });
        setEditExecutorIndex(index); // Set the edit index
        setShowExecutorForm(true);
    };













    const handleSaveAndContinue = async (e) => {
        e.preventDefault();
        const updatedOrder = { ...currentOrder }
        await dispatch(updateOrderThunk(updatedOrder));

        const updatedAdditionlExecutors = [];
        for (const executor of additionalExecutors) {
            let response;
            if (executor._id) {
                response = await dispatch(updateExecutorThunk(executor)).unwrap();
            } else {
                response = await dispatch(createExecutorThunk(executor)).unwrap();
            }
            updatedAdditionlExecutors.push({
                ...executor,
                _id: response._id
            });
        }


        // Update kids slice with new kids including their IDs
        await dispatch(updateAdditionalExecutorsSlice(updatedAdditionlExecutors));

        // Prepare updated order with the new kids IDs
        const updatedOrderWithIds = {
            ...currentOrder,
            peopleAndRoles: [
                ...currentOrder.peopleAndRoles.filter(pr => !pr.role.includes(constants.role.ADDITIONAL_EXECUTOR)), // Remove existing kids to avoid duplicates
                ...updatedAdditionlExecutors.map(executor => ({
                    personId: executor._id,
                    role: [constants.role.ADDITIONAL_EXECUTOR]
                }))
            ]
        };




        // Update the currentOrder slice
        await dispatch(updateCurrentOrderSlice(updatedOrderWithIds));
        // Update the order in the backend
        await dispatch(updateOrderThunk(updatedOrderWithIds));

        navigate('/creatingOrder');
    };






    const handleBack = () => {
        console.log(`handle back called`);
        // Revert to the "saved" state

        if (savedAdditionalExecutorsData.current) {
            dispatch(updateAdditionalExecutorsSlice(savedAdditionalExecutorsData.current));
            console.log(`dispatched update executors slice`);
        }
        if (savedCurrentOrderData.current) {
            dispatch(updateCurrentOrderSlice(savedCurrentOrderData.current));
            console.log(`dispatched update current order slice`);
        }
        navigate('/creatingOrder');
    };

    const handlePlaceSelected = (address) => {
        setExecutorFormData((prevData) => ({
            ...prevData,
            fullAddress: address
        }));
    };


    const [familyExecutors, setFamilyExecutors] = useState([]);


    const handleExecutorChecked = (index, isChecked) => {
        const familyExecutor = family[index];

        const updatedPeopleAndRoles = currentOrder.peopleAndRoles.map(personRole => {
            if (personRole.personId._id === familyExecutor.personId._id) {
                if (isChecked) {
                    // Add the executor role if it doesn't already exist
                    return {
                        ...personRole,
                        role: personRole.role.includes('executor') ? personRole.role : [...personRole.role, 'executor']
                    };
                } else {
                    // Remove the executor role
                    return {
                        ...personRole,
                        role: personRole.role.filter(role => role !== 'executor')
                    };
                }
            }
            return personRole;
        });

        dispatch(updateCurrentOrderSlice({ ...currentOrder, peopleAndRoles: updatedPeopleAndRoles }));
    };





    return (
        <>
            <Container className="mt-5 mb-4">
                <Row className="mt-3 mb-4 justify-content-center">
                    <Col xs={12} className="mx-auto">
                        <h1 className="auth-header">Executors</h1>
                    </Col>
                </Row>
                <Row className="mt-3 mb-4 justify-content-center">
                    <Col xs={12} className="mx-auto d-flex justify-content-center">
                        <h5>Please select or/and add the executors of the will.</h5>
                    </Col>
                </Row>

                <Row className="justify-content-between">
                    <Col md={5} className="mt-4">
                        <Row>
                            <Col >
                                {family.map((person, personIndex) => (
                                    <SectionListItem
                                        key={`person-${personIndex}`}
                                        buttonsDisabled={showExecutorForm}
                                        data={person}
                                        onRemove={() => handleRemoveExecutor(personIndex)}
                                        onEdit={() => handleEditExecutor(personIndex)}
                                        onChecked={(isChecked) => handleExecutorChecked(personIndex, isChecked)}  // Pass the checkbox state
                                        section="executors"
                                    />
                                ))}
                                {additionalExecutors.length > 0 && <h4 className="p-4">Additional executors</h4>}
                                {additionalExecutors.map((person, personIndex) => (
                                    <SectionListItem
                                        key={`person-${personIndex}`}
                                        buttonsDisabled={showExecutorForm}
                                        data={person}
                                        onRemove={() => handleRemoveExecutor(personIndex)}
                                        onEdit={() => handleEditExecutor(personIndex)}
                                        onChecked={(isChecked) => handleExecutorChecked(personIndex, isChecked)}  // Pass the checkbox state
                                        section="additional-executors"
                                    />
                                ))}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    variant="success"
                                    className="m-3"
                                    onClick={handleShowExecutorForm}
                                    style={showExecutorForm ? styles.disabledButton : {}}
                                    disabled={showExecutorForm}
                                >
                                    +Add Executor
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4} className="pt-4">
                        {showExecutorForm && (
                            <Row>
                                <Col >
                                    <Form onSubmit={handleExecutorFormAdd}>
                                        <Form.Group className="mb-3" controlId="formGroupTitle">
                                            <Form.Label className="bold-label">Title</Form.Label>
                                            <Form.Control
                                                as="select"
                                                id="title"
                                                name="title"
                                                value={additionalExecutorFormData.title}
                                                onChange={handleOnChange}
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
                                                value={additionalExecutorFormData.fullLegalName}
                                                onChange={handleOnChange}
                                                required
                                                className="custom-input"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGroupFullAddress">
                                            <Form.Label className="bold-label">Full address</Form.Label>
                                            <AddressAutocomplete
                                                name="fullAddress"
                                                value={additionalExecutorFormData.fullAddress}
                                                onPlaceSelected={handlePlaceSelected}
                                                handleInputChange={handleOnChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGroupDob">
                                            <Form.Label className="bold-label">Date of birth</Form.Label>
                                            <Form.Control
                                                type="date"
                                                id="dob"
                                                name="dob"
                                                value={additionalExecutorFormData.dob}
                                                onChange={handleOnChange}
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
                                                value={additionalExecutorFormData.email}
                                                onChange={handleOnChange}
                                                className="custom-input"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGroupPhone">
                                            <Form.Label className="bold-label">Phone Number (optional)</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                id="tel"
                                                name="tel"
                                                value={additionalExecutorFormData.tel}
                                                onChange={handleOnChange}
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
                                                        handleShowExecutorForm();
                                                        resetExecutorForm();
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
                                                    {editExecutorIndex !== null ? "Update" : "Add"}
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
                <Container className="mt-5">
                    <CreatingOrderNavigation
                        onBack={handleBack}
                        onSaveAndContinue={handleSaveAndContinue}
                    />
                </Container>
            </>







        </>
    )
}

export default Executors;



// <>
// <div className="section-list-container">
//     <h3>Selected Executors</h3>
//     {familyExecutors.map((executor, executorIndex) => (
//         <div key={executorIndex}>
//             <p>{executor.fullLegalName}</p>
//             <p>{executor.role}</p>
//         </div>
//     ))}
// </div>
// </>
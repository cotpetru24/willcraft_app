import CreatingOrderNavigation from "../CreatigOrderNavigation";
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
import { updateCurrentOrderSlice, updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";
import { createKidThunk, updateKidThunk } from "../../../features/people/kids/kidsThunks";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";




const Kids = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const testator = useSelector(state => state.testator);
    const currentOrder = useSelector(state => state.currentOrder);
    const kids = useSelector(state => state.kids);

    const [showKidsForm, setShowKidsForm] = useState(false);
    const [currentHasChildrenStatus, setHasChildrenStatus] = useState(testator.hasChildrenStatus);
    const [editKidIndex, setEditKidIndex] = useState(null); // New state to track the index of the kid being edited

    // Use useRef to store the "saved" state
    const savedKidsData = useRef(null);
    const savedTestatorData = useRef(null);
    const initialHasChildrenStatus = useRef(testator.hasChildrenStatus);

    let kid;

    const [kidFormData, setKidFormData] = useState({
        _id: '',
        title: '',
        fullLegalName: '',
        fullAddress: '',
        dob: '',
        email: '',
        tel: ''
    });


    useEffect(() => {
        if (kid) {
            setKidFormData({
                _id: kidFormData._id || '',
                title: kidFormData.title || '',
                fullLegalName: kidFormData.fullLegalName || '',
                fullAddress: kidFormData.fullAddress || '',
                dob: kidFormData.dob || '',
                email: kidFormData.email || '',
                tel: kidFormData.tel || ''
            })
        }

        // Store the initial state as "saved" state if it's not already saved
        if (!savedTestatorData.current) {
            savedTestatorData.current = JSON.parse(JSON.stringify(testator));
        }

        if (!savedKidsData.current) {
            savedKidsData.current = JSON.parse(JSON.stringify(kids));
        }
    }, [kids]
    );


    const handleBack = () => {
        // Revert to the "saved" state
        if (savedTestatorData.current) {
            dispatch(updateTestatorSlice(savedTestatorData.current));
        }
        if (savedKidsData.current) {
            dispatch(updateKidsSlice(savedKidsData.current));
        }
        navigate('/creatingOrder');
    };


    const handleSaveAndContinue = async (e) => {
        e.preventDefault();

        // Update testator's hasChildrenStatus if it has changed
        if (initialHasChildrenStatus.current !== currentHasChildrenStatus) {
            await dispatch(testatorThunks.updateTestatorThunk({ ...testator, hasChildrenStatus: currentHasChildrenStatus }));
        }

        const updatedKids = [];


        for (const kid of kids) {
            let response;
            if (kid._id) {
                response = await dispatch(updateKidThunk(kid)).unwrap();
            } else {
                response = await dispatch(createKidThunk(kid)).unwrap();
            }
            updatedKids.push({
                ...kid,
                _id: response._id
            });
        }

        // Update kids slice with new kids including their IDs
        await dispatch(updateKidsSlice(updatedKids));

        // Prepare updated order with the new kids IDs
        const updatedOrder = {
            ...currentOrder,
            peopleAndRoles: [
                ...currentOrder.peopleAndRoles.filter(pr => !pr.role.includes(constants.role.KID)), // Remove existing kids to avoid duplicates
                ...updatedKids.map(kid => ({
                    personId: kid._id,
                    role: [constants.role.KID]
                }))
            ]
        };

        // Update the currentOrder slice
        await dispatch(updateCurrentOrderSlice(updatedOrder));
        // Update the order in the backend
        await dispatch(updateOrderThunk(updatedOrder));

        navigate('/creatingOrder');
    };


    const handleShowKidsForm = () => {
        setShowKidsForm(prevState => !prevState);
    };


    const handleHasChildrenStatusChange = (e) => {
        setShowKidsForm(false);

        const updatedHasChildrenStatus = e.target.value;
        setHasChildrenStatus(updatedHasChildrenStatus);

        if (testator) {
            dispatch(updateTestatorSlice({ ...testator, hasChildrenStatus: updatedHasChildrenStatus }));
        }
        if (kids) {
            dispatch(resetKidsSlice());
        }
    };


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setKidFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleKidFormAdd = (e) => {
        e.preventDefault();

        if (editKidIndex !== null) {
            const updatedKids = kids.map((kid, index) =>
                index === editKidIndex ? kidFormData : kid
            );
            dispatch(updateKidsSlice(updatedKids));
            setEditKidIndex(null); // Reset the edit index
        } else {
            dispatch(updateKidsSlice([...kids, kidFormData]));
        }

        resetKidForm();
        setShowKidsForm(false);
    };


    const resetKidForm = () => {
        setKidFormData({
            _id: '',
            title: '',
            fullLegalName: '',
            fullAddress: '',
            dob: '',
            email: '',
            tel: ''
        });
        setEditKidIndex(null); // Reset the edit index
    };


    const handleRemoveKid = (index) => {
        const updatedKids = kids.filter((_, i) => i !== index);
        dispatch(updateKidsSlice(updatedKids));
    };


    const handleEditKid = (index) => {
        const kidToEdit = kids[index];
        setKidFormData({
            _id: kidToEdit._id || '',
            title: kidToEdit.title || '',
            fullLegalName: kidToEdit.fullLegalName || '',
            fullAddress: kidToEdit.fullAddress || '',
            dob: kidToEdit.dob || '',
            email: kidToEdit.email || '',
            tel: kidToEdit.tel || ''
        });
        setEditKidIndex(index); // Set the edit index
        setShowKidsForm(true);
    };


    const handlePlaceSelected = (address) => {
        setKidFormData((prevData) => ({
            ...prevData,
            fullAddress: address
        }));
    };


    return (
        <>
            <Container className="mt-5 mb-4">
                <Row className="mt-3 mb-4 justify-content-center">
                    <Col xs={12} md={4} className="mx-auto">
                        <h1 className="auth-header">Your children</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center pb-3">
                        <h4>Do you have children ?</h4>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col xs={{ span: 11, offset: 1 }} md={{ span: 1, offset: 0 }}
                        className="d-flex justify-content-md-center justify-content-xs-start p-1 p-md-0">
                        <input
                            type="radio"
                            id="has-children-yes"
                            name="has-children"
                            value="yes"
                            checked={currentHasChildrenStatus === "yes"}
                            onChange={handleHasChildrenStatusChange}
                            disabled={showKidsForm}

                        >
                        </input>
                        <label htmlFor="has-children-yes">Yes</label>
                    </Col>
                    <Col xs={{ span: 11, offset: 1 }} md={{ span: 1, offset: 0 }}
                        className="d-flex justify-content-md-center justify-content-xs-start p-1 p-md-0">
                        <input
                            type="radio"
                            id="has-children-no"
                            name="has-children"
                            value="no"
                            checked={currentHasChildrenStatus === "no"}
                            onChange={handleHasChildrenStatusChange}
                            disabled={showKidsForm}
                        >
                        </input>
                        <label htmlFor="has-children-no">No</label>
                    </Col>
                </Row>
            </Container>
            {(currentHasChildrenStatus === "yes") &&
                (
                    <>
                        <Container>
                            <Row className="justify-content-between">
                                <Col md={5} className="mt-4">
                                    <Row>
                                        <Col >
                                            {kids.map((kid, index) => (
                                                <SectionListItem
                                                    key={index}
                                                    buttonsDisabled={showKidsForm}
                                                    data={kid}
                                                    onRemove={() => handleRemoveKid(index)}
                                                    onEdit={() => handleEditKid(index)}
                                                    section="kids"
                                                />
                                            ))}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button
                                                variant="primary"
                                                className="m-3"
                                                onClick={handleShowKidsForm}
                                                style={showKidsForm ? styles.disabledButton : {}}
                                                disabled={showKidsForm}
                                            >
                                                +Add children
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={4} className="pt-4">
                                    {showKidsForm && (
                                        <Row>
                                            <Col >
                                                <Form onSubmit={handleKidFormAdd}>
                                                    <Form.Group className="mb-3" controlId="formGroupTitle">
                                                        <Form.Label className="bold-label">Title</Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            id="title"
                                                            name="title"
                                                            value={kidFormData.title}
                                                            onChange={handleOnChange}
                                                            required
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
                                                            value={kidFormData.fullLegalName}
                                                            onChange={handleOnChange}
                                                            required
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupFullAddress">
                                                        <Form.Label className="bold-label">Full address</Form.Label>
                                                        <AddressAutocomplete
                                                            name="fullAddress"
                                                            value={kidFormData.fullAddress}
                                                            onPlaceSelected={handlePlaceSelected}
                                                            handleInputChange={handleOnChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupDob">
                                                        <Form.Label className="bold-label">Date of birth</Form.Label>
                                                        <DateInput
                                                            id="dob"
                                                            name="dob"
                                                            value={kidFormData.dob}
                                                            onChange={handleOnChange}
                                                            required
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                                        <Form.Label className="bold-label">Email (optional)</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            value={kidFormData.email}
                                                            onChange={handleOnChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="formGroupPhone">
                                                        <Form.Label className="bold-label">Phone Number (optional)</Form.Label>
                                                        <Form.Control
                                                            type="tel"
                                                            id="tel"
                                                            name="tel"
                                                            value={kidFormData.tel}
                                                            onChange={handleOnChange}
                                                        />
                                                    </Form.Group>
                                                    <Row>
                                                        <Col>
                                                            <Button
                                                                variant="primary"
                                                                className="m-1 add-edit-form-btn"
                                                                type="button"
                                                                onClick={() => {
                                                                    handleShowKidsForm();
                                                                    resetKidForm();
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
                                                                {editKidIndex !== null ? "Update" : "Add"}
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
                    </>
                )
            }
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

export default Kids;


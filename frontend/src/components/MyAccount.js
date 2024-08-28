import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./LoadingSpinner.js";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import HomeReview from "./HomeReview.js";
import { formatReviewRating } from "./HomeReview.js";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateUserDetailsThunk, updateUserPasswordThunk } from "../features/auth/authSlice.js";

const MyAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, isLoading, isError, message } = useSelector(state =>
        state.orders)





    const [detailsFormData, setDetailsFormData] = useState({
        firstName: '', lastName: '',
        email: ''
    });
    const { firstName, lastName, email } = detailsFormData;



    const [passwordFormData, setPasswordFormData] = useState({
        currentPassword: '', password: '', password2: ''
    });
    const { currentPassword, password, password2 } = passwordFormData;



    const order = useSelector(state => state.order)
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)
    const [showEditDetailsForm, setShowEditDetailsForm] = useState(false)


    const onDetailsFormDataChange = e => {
        setDetailsFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const onPasswordFormDataChange = e => {
        setPasswordFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    useEffect(() => {
        if (isError) console.log(message)
        // dispatch(getOrders())
        // return () => dispatch(reset())

        //on preload populate details form
    }, [navigate, isError, message, dispatch])

    const handleChangeDetailsSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { firstName, lastName, email };
            const resultAction = await dispatch(updateUserDetailsThunk(userData));

            // Check if the action was fulfilled (i.e., successful)
            if (updateUserDetailsThunk.fulfilled.match(resultAction)) {
                toast.success("Details updated successfully!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                });

                // Reset the form and close the edit form
                setDetailsFormData({
                    firstName: '',
                    lastName: '',
                    email: ''
                });
                setShowEditDetailsForm(false);
            } else {
                // Handle the case where the update was not successful
                const errorMessage = resultAction.payload || 'Error updating details';
                toast.error(errorMessage, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                });
            }
        } catch {
            toast.error("Error updating details!", {
                // onClose: () => navigate('/dashboard'),
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
            });
        }
    }

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords don\'t match')
        }
        else {

            try {
                const userData = { currentPassword, password };
                const resultAction = await dispatch(updateUserPasswordThunk(userData));

                // Check if the action was fulfilled (i.e., successful)
                if (updateUserPasswordThunk.fulfilled.match(resultAction)) {
                    toast.success("Password updated successfully!", {
                        // onClose: () => navigate('/dashboard'),
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                    });
                    // Reset the form and close the edit form
                    setPasswordFormData({
                        currentPassword: '',
                        password: '',
                        password2: ''
                    });
                    setShowChangePasswordForm(false);
                } else {
                    // Handle the case where the update was not successful
                    const errorMessage = resultAction.payload || 'Error updating password';
                    toast.error(errorMessage, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                    });
                }
            }
            catch {
                toast.error("Error updating password!", {
                    onClose: () => navigate('/dashboard'),
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                });
            }
        }
    }

    return (
        isLoading ? <Spinner /> :
            (
                <>
                    <Container style={{ minHeight: '65vh' }} >
                        <Container className="md-container">
                            <Row className="mt-4 mb-5 ">
                                <Col>
                                    <h1 className="auth-header">My Account</h1>
                                </Col>
                            </Row>
                        </Container>
                        <Container className="md-container mb-5">
                            <Row>
                                <Col>
                                    <Row>
                                        <Col xs={4} sm={2} md={2} lg={2} xl={2}>
                                            First name:
                                        </Col>
                                        <Col>
                                            Petru
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} sm={2} md={2} lg={2} xl={2}>
                                            Last name:
                                        </Col>
                                        <Col>
                                            Cotorobai
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} sm={2} md={2} lg={2} xl={2}>
                                            Email:
                                        </Col>
                                        <Col>
                                            test@test.com
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            setShowChangePasswordForm(false)
                                            setShowEditDetailsForm(true)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </Col>
                            </Row>
                        </Container>


                        <Container className="md-container">
                            <Row>
                                <Col>
                                    <Button
                                        variant="primary"
                                        onClick={() => {
                                            setShowEditDetailsForm(false)
                                            setShowChangePasswordForm(true)
                                        }}

                                    >
                                        Change password
                                    </Button>
                                </Col>
                            </Row>
                        </Container>


                        {showEditDetailsForm && (
                            <Container className="mt-5">
                                <Row className="mt-3 mb-4 justify-content-center">
                                    <Col xs={12} md={4} className="mx-auto">
                                        <Form onSubmit={handleChangeDetailsSubmit}>
                                            <Form.Group className="mb-3" controlId="formGroupFirstName">
                                                <Form.Label className="bold-label">First name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    value={detailsFormData.firstName}
                                                    onChange={onDetailsFormDataChange}
                                                    required
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupLastName">
                                                <Form.Label className="bold-label">Last name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    value={detailsFormData.lastName}
                                                    onChange={onDetailsFormDataChange}
                                                    required
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Label className="bold-label">Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={detailsFormData.email}
                                                    required
                                                    onChange={onDetailsFormDataChange}
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Row>
                                                <Col>
                                                    <Button
                                                        variant="primary"
                                                        className="m-1 add-edit-form-btn"
                                                        type="button"
                                                        // onClick={() => {
                                                        //     handleShowKidsForm();
                                                        //     resetKidForm();
                                                        // }}
                                                        onClick={() => setShowEditDetailsForm(false)}
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
                                                        Save
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>

                                </Row>
                            </Container>
                        )}

                        {showChangePasswordForm && (
                            <Container className="mt-5">
                                <Row className="mt-3 mb-4 justify-content-center">
                                    <Col xs={12} md={4} className="mx-auto">
                                        <Form onSubmit={handleChangePasswordSubmit}>
                                            <Form.Group className="mb-3" controlId="formGroupCurrentPassword">
                                                <Form.Label className="bold-label">Current password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Current password"
                                                    name="currentPassword"
                                                    value={passwordFormData.currentPassword}
                                                    onChange={onPasswordFormDataChange}
                                                    className="custom-input"
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                                <Form.Label className="bold-label">New password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="New password"
                                                    name="password"
                                                    value={passwordFormData.password}
                                                    onChange={onPasswordFormDataChange}
                                                    className="custom-input"
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupPassword2">
                                                <Form.Label className="bold-label">Confirm new password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Confirm new password"
                                                    name="password2"
                                                    value={passwordFormData.password2}
                                                    onChange={onPasswordFormDataChange}
                                                    className="custom-input"
                                                    required
                                                />
                                            </Form.Group>
                                            <Row>
                                                <Col>
                                                    <Button
                                                        variant="primary"
                                                        className="m-1 add-edit-form-btn"
                                                        type="button"
                                                        // onClick={() => {
                                                        //     handleShowKidsForm();
                                                        //     resetKidForm();
                                                        // }}
                                                        onClick={() => setShowChangePasswordForm(false)}
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
                                                        Save
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </Container >
                        )}



                    </Container>
                    {/* <Container>
                        <Row className="mt-3 mb-3">
                            <Col>
                                <Button
                                    className="m-1 add-edit-form-btn"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Close
                                </Button>
                            </Col>
                        </Row>
                    </Container> */}
                </>
            )
    );
}

export default MyAccount
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

const MyAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, isLoading, isError, message } = useSelector(state =>
        state.orders)

    const order = useSelector(state => state.order)
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)
    const [showEditDetailsForm, setShowEditDetailsForm] = useState(false)



    useEffect(() => {
        if (isError) console.log(message)
        // dispatch(getOrders())
        // return () => dispatch(reset())
    }, [navigate, isError, message, dispatch])


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
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formGroupFirstName">
                                                <Form.Label className="bold-label">First name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    //   value={testatorFormData.fullLegalName}
                                                    //   onChange={handleOnChange}
                                                    required
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupLastName">
                                                <Form.Label className="bold-label">First name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="LastName"
                                                    //   value={testatorFormData.fullLegalName}
                                                    //   onChange={handleOnChange}
                                                    required
                                                    className="custom-input"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Label className="bold-label">Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    //   value={testatorFormData.email}
                                                    //   onChange={handleOnChange}
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
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formGroupCurrentPassword">
                                                <Form.Label className="bold-label">Current password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Current password"
                                                    name="currentPassword"
                                                    // value={password}
                                                    // onChange={onChange}
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
                                                    // value={password}
                                                    // onChange={onChange}
                                                    className="custom-input"
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                                <Form.Label className="bold-label">Confirm new password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Confirm new password"
                                                    name="password2"
                                                    // value={password2}
                                                    // onChange={onChange}
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
                </>
            )
    );
}

export default MyAccount
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { register, reset } from '../../features/auth/authSlice';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";


const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '',
        email: '', password: '', password2: ''
    });
    const { firstName, lastName, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess || user) navigate('/dashboard');
        dispatch(reset());
    },
        [user, isSuccess, isError, message, navigate, dispatch]
    )

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = e => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords don\'t match')
        }
        else {
            const userData = { firstName, lastName, email, password }
            dispatch(register(userData));
        }
    };


    return (
        isLoading ? <Spinner /> : (
            <>
                <Container style={{ minHeight: '65vh' }} className="mt-5 mb-4">
                    <Row className="mt-3 mb-4 justify-content-center">
                        <Col xs={12} md={4} className="mx-auto">
                            <h1 className="auth-header">Register</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} md={4} className="mx-auto">
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="formGroupFirstName">
                                    <Form.Label className="bold-label">First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Your first name"
                                        id="firstName"
                                        name="firstName"
                                        value={firstName}
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupLastName">
                                    <Form.Label className="bold-label">Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Your last name"
                                        id="lastName"
                                        name="lastName"
                                        value={lastName}
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label className="bold-label">Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Your email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label className="bold-label">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label className="bold-label">Confirm password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm password"
                                        id="password2"
                                        name="password2"
                                        value={password2}
                                        onChange={onChange}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-3">
                                    Register
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="mt-3 justify-content-start">
                        <Col xs={12} md={4} className="mx-auto">
                            <p>
                                Already have an account? <Link to='/login'>Login</Link>
                            </p>
                        </Col>
                    </Row>
                </Container >
            </>
        )
    )
}

export default Register;
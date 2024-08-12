import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import { login, reset } from '../../features/auth/authSlice'
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";



const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError) toast.error(message);
        if (isSuccess || user) navigate('/');
        dispatch(reset());
    },
        [user, isError, isSuccess, message, navigate, dispatch]
    );

    const onChange = e => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const onSubmit = e => {
        e.preventDefault()
        const userData = { email, password }
        dispatch(login(userData))
    };

    return (
        isLoading ? <Spinner /> : (
            <>
                <Container className="mt-5 mb-4">
                    <Row className="mt-3 mb-4 justify-content-center">
                        <Col xs={12} md={4} className="mx-auto">
                            <h1 className="auth-header">Login</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} md={4} className="mx-auto">
                            <Form onSubmit={onSubmit}>
                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={onChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        placeholder="Enter password"
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={onChange} />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-3">
                                    Login
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="mt-3 justify-content-start">
                        <Col xs={12} md={4} className="mx-auto">
                            <p>
                                Don't have an account? <Link to='/register'>Register</Link>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    )
}

export default Login
import React from "react";
import HomeReview from "./HomeReview";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { login, reset } from '../features/auth/authSlice';
import './Common/FontAwesomeSetup';
import Container from "react-bootstrap/esm/Container";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import HowDoesItWork from "./HowDoesItWork";
import 'bootstrap/dist/css/bootstrap.min.css';

import Carousel from "react-bootstrap/Carousel";


const Home = () => {

    const { user } = useSelector(state => state.auth)


    return (
        <>
            <Container  className="pt-5">
                <Row className="justify-content-center" >
                    <Col md={{ span: 4 }}>
                        <h1>Will writing made simple</h1>
                        <Container className="pt-3">
                            <h5><FontAwesomeIcon
                                icon={faCheckCircle}
                                className="custom-icon"
                                style={{ color: 'green' }} /> no appointments</h5>
                            <h5><FontAwesomeIcon
                                icon={faCheckCircle}
                                className="custom-icon"
                                style={{ color: 'green' }} /> no solicitors</h5>
                            <h5><FontAwesomeIcon
                                icon={faCheckCircle}
                                className="custom-icon"
                                style={{ color: 'green' }} /> step by Step guide</h5>
                            <h5><FontAwesomeIcon
                                icon={faCheckCircle}
                                className="custom-icon"
                                style={{ color: 'green' }} /> ready in 10 minutes</h5>
                            <h5><FontAwesomeIcon
                                icon={faCheckCircle}
                                className="custom-icon"
                                style={{ color: 'green' }} /> starting from £20</h5>
                        </Container>
                        <Row className="p-2 pt-3">
                            {user ? (
                                <Container >
                                    <Link to='/dashboard'>
                                        <Button
                                            className='mb-5'
                                            id="get-started-btn">
                                            Get Started
                                        </Button>
                                    </Link>
                                </Container>
                            ) : (
                                <Container >
                                    <Link to='/login'>
                                        <Button
                                            className='mb-5'
                                            id="get-started-btn">
                                            Get Started
                                        </Button>
                                    </Link>
                                </Container>
                            )}
                        </Row>
                    </Col>
                    <Col md={{ span: 8 }}>
                        <img src="/hero1.png" style={{ width: '100%' }} alt="Home" />
                    </Col>
                </Row>
            </Container>
            <Container className="mt-5">
                <Row className="pt-5 mb-5 section-header">
                    <Col>
                        <h2>How does it work</h2>
                    </Col>
                </Row>
                <HowDoesItWork />
            </Container>
            <Container className="mb-5 mt-5">
                <Row className="pt-5 mb-5 section-header">
                    <Col>
                        <h2>Testimonials</h2>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <HomeReview />
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <HomeReview />
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <HomeReview />
                    </Col>
                </Row>
                <Row className="p-4">
                    <Col className="d-flex justify-content-center">
                        <h4>Rating 4.8/5 based on 123 reviews. <Link to="/reviews">View all reviews</Link></h4>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Home
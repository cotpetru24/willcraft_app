import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner.js";
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

const Reviews = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orders, isLoading, isError, message } = useSelector(state =>
        state.orders)

    const order = useSelector(state => state.order)





    useEffect(() => {
        if (isError) console.log(message)
        // dispatch(getOrders())
        // return () => dispatch(reset())
    }, [navigate, isError, message, dispatch])


    return (
        isLoading ? <Spinner /> :
            (
                <>
                    <Container style={{ minHeight: '65vh' }}>
                        <Container className="md-container">
                            <Row className="mt-4 mb-5 ">
                                <Col>
                                    <h1 className="auth-header">Customer reviews</h1>
                                </Col>
                            </Row>
                        </Container>
                        <Container className="md-container mb-5">
                            <Card className='shadow' bg="light" text="dark" >
                                <Card.Body>
                                    <Card.Title as="h5">Great Service!</Card.Title>
                                    <div>
                                        <Row>
                                            <Col>
                                                <div className="order-item-p">
                                                    The process was seamless and easy to follow.
                                                    I appreciate the detailed instructions and the quick turnaround time. Will definitely use this service again.
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className=" d-flex justify-content-end">
                                            <Col>
                                                <div className="review-starts-container" dangerouslySetInnerHTML={{ __html: formatReviewRating(4) }}></div>                                    </Col>
                                            <Col className="d-flex justify-content-end">
                                                <strong>Jane</strong> - date here
                                            </Col>
                                        </Row>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Container>




                        <Container className="md-container mb-5">
                            <Card className='shadow' bg="light" text="dark" >
                                <Card.Body>
                                    <Card.Title as="h5">Great Service!</Card.Title>
                                    <div>
                                        <Row>
                                            <Col>
                                                <div className="order-item-p">
                                                    The process was seamless and easy to follow.
                                                    I appreciate the detailed instructions and the quick turnaround time. Will definitely use this service again.
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className=" d-flex justify-content-end">
                                            <Col>
                                                <div className="review-starts-container" dangerouslySetInnerHTML={{ __html: formatReviewRating(4) }}></div>                                    </Col>
                                            <Col className="d-flex justify-content-end">
                                                <strong>Jane</strong> - date here
                                            </Col>
                                        </Row>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Container>
                    </Container>
                </>
            )
    );
}

export default Reviews
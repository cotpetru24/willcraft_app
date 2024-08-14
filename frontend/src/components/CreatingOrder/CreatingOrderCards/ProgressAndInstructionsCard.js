import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from "react";
import generateWillPdf from '../../../features/docGen/generateWillPdf';



const ProgressAndInstructionsCard = () => {
    const navigate = useNavigate();

    const currentOrder = useSelector(state => state.currentOrder)
    const { user } = useSelector(state => state.auth)




    return (
        <>
            <Container className="mb-5">
                <Card className='shadow' bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col xs={10}>
                                    <h2>Order Progress</h2>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                    {20 == 20 ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                                    ) : (
                                        <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                                    )}
                                </Col>
                            </Row>
                        </Card.Title>
                        <Card.Text>
                            <Row className="mb-4">
                                <Col>
                                    <p className="order-item-p">
                                        <span className="order-item-p-span">Welcome {user ? user.firstName : ''} to your online will writing service</span>
                                    </p>
                                    <p className="order-item-p">
                                        Please fill out the will checklist to complete your will.
                                    </p>
                                    <p className="order-item-p">
                                        If you have any questions, message, email or call us on 024 1234 5678.
                                    </p>
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-end">
                                <Col xs="auto">
                                    <Button variant="primary" className="creating-order-tile-btns"
                                        onClick={() => navigate('/ChechOutForm')}
                                    >Stripe</Button>
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            <div className=" creatingOrder-instructions">
                <div className="creatingOrder-tile">

                    <p>
                    </p>
                </div>
                <button onClick={generateWillPdf}>Generate Will PDF</button>
            </div>
        </>
    );
}

export default ProgressAndInstructionsCard;

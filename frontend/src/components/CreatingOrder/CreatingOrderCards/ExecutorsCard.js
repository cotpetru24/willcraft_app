import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from "react";


const ExecutorsCard = () => {
    const navigate = useNavigate();

    const executorsData = useSelector(state => state.additionalExecutors)
    const currentOrder = useSelector(state => state.currentOrder)


    const allExecutors = currentOrder.peopleAndRoles
        .filter(p => p.role.includes('executor') || p.role.includes('additional executor'))

    const isExecutorsComplete = (data) => {
        return (Array.isArray(data) && (data.length > 0))
    };

    const allNecessaryFieldsSpecified = isExecutorsComplete(allExecutors);

    return (
        <>
            <Container className="mb-5">
                <Card className='shadow' bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col xs={10}>
                                    <h2>Your Executors</h2>
                                </Col>
                                <Col className="d-flex justify-content-end align-items-center">
                                    {allNecessaryFieldsSpecified ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                                    ) : (
                                        <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                                    )}
                                </Col>
                            </Row>
                        </Card.Title>
                        {allNecessaryFieldsSpecified ? (
                            <Card.Text>
                                {allExecutors.map((executor, index) => (
                                    <React.Fragment key={index}>
                                        <Row className="mb-4">
                                            <Col>
                                                <p className="order-item-p">
                                                    <span className="order-item-p-span">Name: </span>
                                                    {executor.personId.title} {executor.personId.fullLegalName}
                                                </p>
                                                <p className="order-item-p">
                                                    <span className="order-item-p-span">Date of birth: </span>{new Date(executor.personId.dob).toLocaleDateString()}
                                                </p>
                                                <p className="order-item-p">
                                                    <span className="order-item-p-span">Address: </span>{executor.personId.fullAddress}
                                                </p>
                                            </Col>
                                        </Row>
                                    </React.Fragment>
                                ))}
                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button variant="primary" className="creating-order-tile-btns"
                                            onClick={() => navigate('/executors')}
                                        >Edit</Button>
                                    </Col>
                                </Row>
                            </Card.Text>
                        ) : (
                            <>
                                <Row>
                                    <Col>
                                        <p>Tell us about executors </p>
                                    </Col>
                                </Row>
                                <Row className="d-flex justify-content-end">
                                    <Col xs="auto">
                                        <Button 
                                        variant="primary" 
                                        className="m-1 creating-order-tile-btns"
                                            onClick={() => navigate('/executors')}
                                        >Get Started</Button>
                                    </Col>
                                </Row>
                            </>

                        )}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default ExecutorsCard;

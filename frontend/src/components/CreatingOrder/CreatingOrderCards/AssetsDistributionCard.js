import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';



const AssetsDistributionCard = () => {
    const navigate = useNavigate();

    const [testatorInitialData, setTestatorInitialData] = useState({
        testatorTitle: '',
        testatorFullLegalName: '',
        testatorDob: '',
        testatorFullAddress: ''
    });

    const testatorData = useSelector(state => state.testator);

    const isTestatorDataComplete = (data) => {
        return data.title && data.fullLegalName && data.dob && data.fullAddress;
    };
    const allNecessaryFieldsSpecified = isTestatorDataComplete(testatorData);


    useEffect(() => {
        if (testatorData) {
            setTestatorInitialData({
                testatorTitle: testatorData.title || '',
                testatorFullLegalName: testatorData.fullLegalName || '',
                testatorDob: testatorData.dob || '',
                testatorFullAddress: testatorData.fullAddress || '',
            });
        }
    }, [testatorData]);

    return (
        <Container className="mb-5">
            <Card className="shadow" bg="light" text="dark">
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col xs={10}>
                                <h2>Assets Distribution</h2>
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
                    <Card.Text as="div"> {/* Changed Card.Text to render as a div */}
                        <Row>
                            <Col>
                                <div className="order-item-p">
                                    <strong>Name: </strong>{testatorInitialData.testatorTitle} {testatorInitialData.testatorFullLegalName}
                                </div>
                                <div className="order-item-p">
                                    <strong>Date of birth: </strong>{new Date(testatorInitialData.testatorDob).toLocaleDateString()}
                                </div>
                                <div className="order-item-p">
                                    <strong>Address: </strong>{testatorInitialData.testatorFullAddress}
                                </div>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-end">
                            <Col xs="auto">
                                {allNecessaryFieldsSpecified ? (
                                    <Button
                                        variant="primary"
                                        onClick={() => navigate('/assetsDistribution')}
                                        className="creating-order-tile-btns"
                                    >
                                        Edit
                                    </Button>
                                ) : (
                                    <Button
                                        variant="primary"
                                        className="creating-order-tile-btns"
                                        onClick={() => navigate('/assetsDistribution')}
                                    >
                                        Get Started
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
    
}

export default AssetsDistributionCard;

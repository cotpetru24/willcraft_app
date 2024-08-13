import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const TestatorCard = () => {
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
            <Card className='shadow' bg="light" text="dark" >
                <Card.Body>
                    <Card.Title >
                        <Row>
                            <Col xs={10}>
                                <h2>About you</h2>
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
                    <Card.Text>
                        <Row>
                            <Col>
                                <p className="order-item-p"><span className="order-item-p-span">Name: </span>{testatorInitialData.testatorTitle} {testatorInitialData.testatorFullLegalName}</p>
                                <p className="order-item-p"><span className="order-item-p-span">Date of birth: </span>{testatorInitialData.testatorDob}</p>
                                <p className="order-item-p"><span className="order-item-p-span">Address: </span>{testatorInitialData.testatorFullAddress}</p>
                            </Col>
                        </Row>
                        <Row className=" d-flex justify-content-end">
                            <Col xs="auto">
                                {allNecessaryFieldsSpecified ? (
                                    <Button variant="primary m-1"
                                        onClick={() => navigate('/testator')}
                                        className="creating-order-tile-btns"
                                    >Edit</Button>
                                ) : (

                                    <Button variant="warning m-1"
                                        onClick={() => navigate('/testator')}
                                        className="creating-order-tile-btns"
                                    >Get Started</Button>
                                )}
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container >
    );
}

export default TestatorCard;

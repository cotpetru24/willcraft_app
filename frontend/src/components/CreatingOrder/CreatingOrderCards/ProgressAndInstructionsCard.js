
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Container, Col, Row, Button, Card, ProgressBar } from "react-bootstrap";
import React from "react";
import generateWillPdf from '../../../features/docGen/generateWillPdf';


// export const OrderProgressBar = () => {
//     const currentOrderStep = useSelector(state => state.currentOrderStep.currentStep || 0);  // Access the correct property

//     // Calculate progress percentage, rounding down to the nearest 10
//     const now = currentOrderStep === 0 ? 0 : Math.floor((currentOrderStep / 6) * 100 / 10) * 10;

//     return (
//         <ProgressBar className="mb-3" now={now} label={`${now}%`} />  // No need to round again since it's already rounded
//     );
// };


// export const OrderProgressBar = () => {
//     const currentOrderStep = useSelector(state => state.currentOrderStep.currentStep || 0);
//     const now = Math.floor((currentOrderStep / 6) * 100 / 10) * 10;

//     return (
//         <div style={{ position: 'relative' }}>
//             <ProgressBar className="mb-3" now={now} />
//             <div style={{ position: 'absolute', width: '100%', textAlign: 'center', fontSize: '12px', bottom: -1 }}>
//                 {`${now}%`}
//             </div>
//         </div>
//     );
//     // color:'rgba(255, 255, 255, 0.87)',
// };
export const OrderProgressBar = () => {
    const currentOrderStep = useSelector(state => state.currentOrderStep.currentStep || 0);
    const now = Math.floor((currentOrderStep / 6) * 100 / 10) * 10;

    const textColor = now > 50 ? 'rgba(255, 255, 255, 0.87)' : 'black';

    return (
        <div style={{ position: 'relative' }}>
            <ProgressBar className="mb-3" now={now} />
            <div style={{ 
                position: 'absolute', 
                width: '100%', 
                textAlign: 'center', 
                fontSize: '12px', 
                bottom: -1, 
                color: textColor 
            }}>
                {`${now}%`}
            </div>
        </div>
    );
};




const ProgressAndInstructionsCard = ({ setShowCheckout, showCheckout }) => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const currentOrderStep = useSelector(state => state.currentOrderStep);


    return (
        <Container className="mb-5">
            <Card className="shadow" bg="light" text="dark">
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col xs={10}>
                                <h2>Order Progress</h2>
                            </Col>
                            {/* <Col className="d-flex justify-content-end align-items-center">
                                {20 === 20 ? (
                                    <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                                ) : (
                                    <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                                )}
                            </Col> */}
                        </Row>
                    </Card.Title>
                    <Card.Text as="div">
                        <Row>
                            <Col>
                                <p>{currentOrderStep.currentStep} of 6 steps Completed</p>
                                <OrderProgressBar />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                {currentOrderStep.currentStep === 0 && (
                                    <>
                                        <h5>Step 1 - Enter Your Personal Details</h5>
                                        <p>Please start by entering your personal details. Make sure to fill in your title, full legal name, date of birth, and full address to complete this step.</p>
                                    </>
                                )}

                                {currentOrderStep.currentStep === 1 && (
                                    <>
                                        <h5>Step 2 - Enter Marital Status and Spouse or Partner Details</h5>
                                        <p>
                                            Tell us about your marital status. If applicable, please provide your spouse or partner's details.
                                            Enter their title, full legal name, date of birth, and full address to proceed to the next step.
                                        </p>
                                    </>
                                )}

                                {currentOrderStep.currentStep === 2 && (
                                    <>
                                        <h5>Step 3 - Enter Children Details</h5>
                                        <p>Next, enter the details of your children. Ensure that all fields such as title, full legal name, date of birth, and full address are filled out.</p>
                                    </>
                                )}

                                {currentOrderStep.currentStep === 3 && (
                                    <>
                                        <h5>Step 4 - Enter Your Assets</h5>
                                        <p>Now, add details about your assets. This includes specifying the type of each asset and ensuring all relevant information is provided.</p>
                                    </>
                                )}

                                {currentOrderStep.currentStep === 4 && (
                                    <>
                                        <h5>Step 5 - Distribute Your Assets</h5>
                                        <p>Distribute your assets among the beneficiaries. Make sure the total distribution for each asset equals 100% to move forward.</p>
                                    </>
                                )}

                                {currentOrderStep.currentStep === 5 && (
                                    <>
                                        <h5>Step 6 - Designate Your Executors</h5>
                                        <p>Designate your executors and ensure that you have provided the full legal name of at least one executor who will execute your will.</p>
                                    </>
                                )}

                                {currentOrderStep.currentStep === 6 && (
                                    <>
                                        <h5>Review and Complete Your Order</h5>
                                        <p>Your order is almost complete! Review all the details and proceed to checkout section to finalize your order.</p>
                                    </>
                                )}

                                <p className="order-item-p">
                                    <span className="order-item-p-span">If you have any questions, message, email, or call us on 024 1234 5678.</span>
                                </p>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-end">
                            <Col xs="auto">
                                {currentOrderStep.currentStep === 6 && !showCheckout && (
                                    <Button variant="primary" className="creating-order-tile-btns"
                                        // onClick={() => navigate('/ChechOutForm')}
                                        onClick={() => setShowCheckout(true)} // Add this line
                                    >
                                        Checkout
                                    </Button>
                                )}
                            </Col>
                            <Col xs="auto">
                                {currentOrderStep.currentStep === 7 && (

                                    <Button variant="primary" className="creating-order-tile-btns"
                                        onClick={generateWillPdf}
                                    >
                                        Generate the Will
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProgressAndInstructionsCard;

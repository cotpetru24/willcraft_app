// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
// import { Container } from "react-bootstrap";
// import { Col, Row } from "react-bootstrap";
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import React from "react";
// import generateWillPdf from '../../../features/docGen/generateWillPdf';
// import ProgressBar from 'react-bootstrap/ProgressBar';







// export const OrderProgressBar = () => {
//     const now = 60;
//     return (
//         <div>
//             <ProgressBar className="mb-3" now={now} label={`${now}%`} />;
//         </div>
//     )
// };



// const ProgressAndInstructionsCard = () => {
//     const navigate = useNavigate();

//     const currentOrder = useSelector(state => state.currentOrder)
//     const { user } = useSelector(state => state.auth)




//     return (
//         <>
//             <Container className="mb-5">
//                 <Card className='shadow' bg="light" text="dark">
//                     <Card.Body>
//                         <Card.Title>
//                             <Row>
//                                 <Col xs={10}>
//                                     <h2>Order Progress</h2>
//                                 </Col>
//                                 <Col className="d-flex justify-content-end align-items-center">
//                                     {20 == 20 ? (
//                                         <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
//                                     ) : (
//                                         <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
//                                     )}
//                                 </Col>
//                             </Row>
//                         </Card.Title>
//                         <Card.Text>
//                             <Row>
//                                 <Col>
//                                     <div>0 of 5 steps Completed</div>
//                                     <OrderProgressBar />
//                                 </Col>
//                             </Row>
//                             <Row className="mb-4">
//                                 <Col>
//                                     <div className="order-item-p">
//                                         <span className="order-item-p-span">Welcome {user ? user.firstName : ''} to your online will writing service</span>
//                                     </div>
//                                     <div className="order-item-p">
//                                         <span className="order-item-p-span">Please fill out the will checklist to complete your will.</span>
//                                     </div>
//                                     <div className="order-item-p">
//                                         <span className="order-item-p-span">If you have any questions, message, email, or call us on 024 1234 5678.</span>
//                                     </div>
//                                 </Col>
//                             </Row>
//                             <Row className="d-flex justify-content-end">
//                                 <Col xs="auto">
//                                     <Button variant="primary" className="creating-order-tile-btns"
//                                         onClick={() => navigate('/ChechOutForm')}
//                                     >Stripe</Button>
//                                 </Col>
//                                 <Col xs="auto">
//                                     <Button variant="primary" className="creating-order-tile-btns"
//                                         onClick={generateWillPdf}
//                                     >Generate the Will</Button>
//                                 </Col>
//                             </Row>
//                         </Card.Text>


//                     </Card.Body>
//                 </Card>
//             </Container>
//         </>
//     );
// }

// export default ProgressAndInstructionsCard;






import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Container, Col, Row, Button, Card, ProgressBar } from "react-bootstrap";
import React from "react";
import generateWillPdf from '../../../features/docGen/generateWillPdf';

export const OrderProgressBar = () => {
    const now = 60;
    return (
        <ProgressBar className="mb-3" now={now} label={`${now}%`} />
    );
};

const ProgressAndInstructionsCard = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    return (
        <Container className="mb-5">
            <Card className="shadow" bg="light" text="dark">
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col xs={10}>
                                <h2>Order Progress</h2>
                            </Col>
                            <Col className="d-flex justify-content-end align-items-center">
                                {20 === 20 ? (
                                    <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'green' }} />
                                ) : (
                                    <FontAwesomeIcon icon={faCheckCircle} className="custom-icon" style={{ color: 'grey' }} />
                                )}
                            </Col>
                        </Row>
                    </Card.Title>
                    <Card.Text as="div">
                        <Row>
                            <Col>
                                <p>0 of 5 steps Completed</p>
                                <OrderProgressBar />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <p className="order-item-p">
                                    <span className="order-item-p-span">Welcome {user ? user.firstName : ''} to your online will writing service</span>
                                </p>
                                <p className="order-item-p">
                                    <span className="order-item-p-span">Please fill out the will checklist to complete your will.</span>
                                </p>
                                <p className="order-item-p">
                                    <span className="order-item-p-span">If you have any questions, message, email, or call us on 024 1234 5678.</span>
                                </p>
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-end">
                            <Col xs="auto">
                                <Button variant="primary" className="creating-order-tile-btns"
                                    onClick={() => navigate('/ChechOutForm')}
                                >
                                    Stripe
                                </Button>
                            </Col>
                            <Col xs="auto">
                                <Button variant="primary" className="creating-order-tile-btns"
                                    onClick={generateWillPdf}
                                >
                                    Generate the Will
                                </Button>
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProgressAndInstructionsCard;

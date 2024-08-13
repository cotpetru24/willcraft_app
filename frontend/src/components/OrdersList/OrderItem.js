import { useDispatch } from "react-redux";
import { deleteOrder } from "../../features/orders/ordersSlice";
import { getOrderThunk } from "../../features/currentOrder/currentOrderSlice";
import { useNavigate } from "react-router-dom";
import { resetOrderState } from "../../utils/reduxUtils";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';



export const OrderProgressBar = () => {
    const now = 60;
    return <ProgressBar className="mb-3" now={now} label={`${now}%`} />;
};

const OrderItem = ({ order }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <Container className="mb-5">
            <Card className='shadow' bg="light" text="dark" >
                <Card.Body>
                    <OrderProgressBar/>
                    <Card.Title as="h5">{order.testator}</Card.Title>
                    <Card.Text>
                        <Row>
                            <Col>
                                <p className="order-item-p"><span className="order-item-p-span">Date of birth: </span>{new Date(order.dob).toLocaleDateString('en-GB')}</p>
                                <p className="order-item-p"><span className="order-item-p-span">Address: </span>{order.fullAddress}</p>
                                <p className="order-item-p"><span className="order-item-p-span">Last updated: </span>{new Date(order.updatedAt).toLocaleString('en-GB')}</p>
                            </Col>
                        </Row>
                        <Row className=" d-flex justify-content-end">
                            <Col xs="auto">
                                <Button variant="warning m-1 order-item-btn"
                                    onClick={() => dispatch(deleteOrder(order._id))}
                                    className="order-item-btns"
                                >Delete</Button>

                                {order.status === "Completed" && (
                                    <Button variant="primary m-2">Edit</Button>
                                )}

                                {order.status === "CreatingOrder" && (
                                    <Button variant="success m-1 order-item-btn"
                                        onClick={async () => {
                                            await resetOrderState(dispatch)
                                            await dispatch(getOrderThunk(order._id));
                                            navigate('/creatingOrder');
                                        }}
                                        className="order-item-btns"
                                        id="continue-order-btn"
                                    >
                                        Continue
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default OrderItem
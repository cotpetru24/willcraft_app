import React from "react";
import { Link } from "react-router-dom";
import OrdersList from "./OrdersList/OrdersList";
import { resetOrderState } from "../utils/reduxUtils";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Col, Row, Button } from "react-bootstrap";


export const OrderProgressBar = ({ currentValue, maxValue }) => (
    <>
        <progress id="progress-bar" className="full-width-progress" value={currentValue} max={maxValue}>{currentValue}%</progress>
    </>
);



const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleCreateWill = async () => {
        resetOrderState(dispatch)
        navigate('/creatingOrder');
    };


    return (
        <Container style={{ minHeight: "45vh" }}>

            <Row className="pt-5 mb-4 section-header">
                <Col>
                    <h2>My Wills</h2>
                </Col>
            </Row>

            <Row className="pb-4">
                <Col>
                    <Button variant="primary  m-3"
                        onClick={handleCreateWill}
                        className="order-item-btns"
                    >Create a new Will</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <OrdersList />
                </Col>
            </Row>
        </Container>
    )

}

export default Dashboard;
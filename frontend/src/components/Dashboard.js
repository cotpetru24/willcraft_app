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
        <Container style={{ minHeight: "65vh" }} className="ps-4 pe-4">

            <Row className="pt-5 mb-4">
                <Col >
                    <h1 className="auth-header ">My Wills</h1>
                </Col>
            </Row>

            <Row className="pb-4">
                <Col>
                    <Button variant="primary mt-2 mb-3"
                        onClick={handleCreateWill}
                        className="order-item-btns"
                    >Create a new Will</Button>
                </Col>
            </Row>
            <Row>
                <Col className="ps-0 pe-0">
                    <OrdersList />
                </Col>
            </Row>
        </Container>
    )

}

export default Dashboard;
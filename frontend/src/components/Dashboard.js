import React from "react";
import { Link } from "react-router-dom";
import OrdersList from "./OrdersList/OrdersList";
import { resetOrderState } from "../utils/reduxUtils";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


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
        <>


            <section className="about-us-container">
                <h2>My Wills</h2>
            </section>

            <section>
                <button
                    id="create-my-will-btn"
                    onClick={handleCreateWill}
                >Create a new Will
                </button>
            </section>

            <section>
                <OrdersList />
            </section>
        </>
    )

}

export default Dashboard;
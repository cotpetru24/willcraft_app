import React from "react";
import { Link } from "react-router-dom";
import OrdersList from "./OrdersList/OrdersList";

export const OrderProgressBar = ({ currentValue, maxValue }) => (
    <>
        <progress id="progress-bar" className="full-width-progress" value={currentValue} max={maxValue}>{currentValue}%</progress>
    </>
);

const Dashboard = () => {
    return (
        <>
            <section className="about-us-container">
                <h2>Dashboard</h2>
            </section>

            <section>
                <OrdersList />
            </section>
        </>
    )

}

export default Dashboard;
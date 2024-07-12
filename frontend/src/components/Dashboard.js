import React from "react";
import { Link } from "react-router-dom";

export const OrderProgressBar = ({ currentValue, maxValue }) => (
    <>
      <progress id="progress-bar" className="full-width-progress" value={currentValue} max={maxValue}>{currentValue}%</progress>
    </>
  );

const Dashboard = () => {
    return (
        <section className="about-us-container">
            <h2>Dashboar</h2>
            <div className="dashboard-will-container">
                
            <p>Testator name/ date/ status </p>

            <button>
                <Link to='/testator'>
                    Continue
                </Link>
            </button>
            </div>
            <OrderProgressBar currentValue={0.08} maxValue={1} />

            <div className="dashboard-will-container">
                
            <p>Testator name/ date/ status </p>

            <button>
                <Link to='/testator'>
                    Continue
                </Link>
            </button>
            </div>
            <OrderProgressBar currentValue={0.08} maxValue={1} />
            <div className="dashboard-will-container">
                
            <p>Testator name/ date/ status </p>

            <button>
                <Link to='/testator'>
                    Continue
                </Link>
            </button>
            </div>
            <OrderProgressBar currentValue={0.08} maxValue={1} />
            <div className="dashboard-will-container">
                
            <p>Testator name/ date/ status </p>

            <button>
                <Link to='/testator'>
                    Continue
                </Link>
            </button>
            </div>
            <OrderProgressBar currentValue={0.08} maxValue={1} />
            <div className="dashboard-will-container">
                
            <p>Testator name/ date/ status </p>

            <button>
                <Link to='/testator'>
                    Continue
                </Link>
            </button>
            </div>
            <OrderProgressBar currentValue={0.08} maxValue={1} />


            <button>
                <Link to='/testator'>
                    Create a new will
                </Link>
            </button>
        </section>
    )

}

export default Dashboard;
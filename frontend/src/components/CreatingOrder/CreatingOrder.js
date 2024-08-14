import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ProgressBar from 'react-bootstrap/ProgressBar';
import KidsCard from "./CreatingOrderCards/KidsCard";
import AssetsCard from "./CreatingOrderCards/AssetsCard";
import AssetsDistributionTile from "./CreatingOrderCards/AssetsDistributionTile";
import ExecutorsCard from "./CreatingOrderCards/ExecutorsCard";
import TestatorCard from "./CreatingOrderCards/TestatorCard";
import SpouseOrPartnerCard from "./CreatingOrderCards/SpouseOrPartnerCard";
import ProgressAndInstructionsCard from "./CreatingOrderCards/ProgressAndInstructionsCard";

export const OrderProgressBar = () => {
    const now = 60;
    return <ProgressBar className="mb-3" now={now} label={`${now}%`} />;
};

const CreatingOrder = () => {



    const navigate = useNavigate();


    return (<>

        <section className="creatingOrder-container">

            <div className="creatingOrder-header">
                <div className="creatingOrder-header-heading">
                    <h1>My Will</h1>
                </div>
                <div className="creatingOrder-header-progressBar">
                    <p>0 of 5 steps Completed </p>
                    <OrderProgressBar />
                </div>
            </div>

            <div className="creatingOrder-tiles-and-instructions-container">

                <div className="creatingOrder-tiles">
                    <TestatorCard />
                    <SpouseOrPartnerCard />
                    <KidsCard />
                    <AssetsCard />
                    <AssetsDistributionTile />
                    <ExecutorsCard />
                    <ProgressAndInstructionsCard/>
                </div>


            </div>

        </section>
    </>
    )

}

export default CreatingOrder;
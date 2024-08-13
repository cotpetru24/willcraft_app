import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ProgressBar from 'react-bootstrap/ProgressBar';
import KidsCard from "./CreatingOrderTiles/KidsCard";
import AssetsTile from "./CreatingOrderTiles/AssetsTile";
import AssetsDistributionTile from "./CreatingOrderTiles/AssetsDistributionTile";
import ExecutorsTile from "./CreatingOrderTiles/ExecutorsTile";
import GenerateWillButton from '../../features/generatewillbtn';
import TestatorCard from "./CreatingOrderTiles/TestatorCard";
import SpouseOrPartnerCard from "./CreatingOrderTiles/SpouseOrPartnerCard";

export const OrderProgressBar = () => {
    const now = 60;
    return <ProgressBar className="mb-3" now={now} label={`${now}%`} />;
};

const CreatingOrder = () => {



    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)

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
                    <AssetsTile />
                    <AssetsDistributionTile />
                    <ExecutorsTile />
                </div>
                <div className=" creatingOrder-instructions">
                    <div className="creatingOrder-tile">
                        <p>Order progress</p>
                        <h2>Welcome {user ? user.firstName : ''}, to your online will writing service</h2>
                        <p>Please fill out the will checklist to complete your will.
                            If you have any questions, message, email or call us on 024 1234 5678.</p>
                    </div>
                    <GenerateWillButton />
                    <button onClick={() => navigate('/ChechOutForm')}>Stripe</button>
                </div>

            </div>

        </section>
    </>
    )

}

export default CreatingOrder;
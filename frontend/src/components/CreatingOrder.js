import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonForm from "./PersonForm";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import TestatorTile from "./TestatorTile";
import FamilyTile from "./FamilyTile";
import AssetsTile from "./AssetsTile";
import ExecutorsTile from "./ExecutorsTile";
import AssetsDistributionTile from "./AssetsDistributionTile";
import ProgressBar from "./ProgressBar";
import Family from "./SpouseOrPartner";





const CreatingOrder = () => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth)

    return (
        <section className="creatingOrder-container">

            <div className="creatingOrder-header">
                <div className="creatingOrder-header-heading">
                    <h1>My Will</h1>
                </div>
                <div className="creatingOrder-header-progressBar">
                    <p>0 of 5 steps Completed </p>
                    <ProgressBar />
                </div>
            </div>


            <div className="creatingOrder-tiles-and-instructions-container">

                <div className="creatingOrder-tiles">
                    <TestatorTile />
                    <FamilyTile />
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
                </div>

            </div>
        </section>
    )

}

export default CreatingOrder;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonForm from "./PersonForm";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import TestatorTile from "./TestatorTile";





const CreatingOrder = () => {
    const navigate = useNavigate();

    return (
        <section className="creatingOrder-container">

            <div className="creatingOrder-heading">
                <div>
                    <h1>My Will</h1>
                </div>
                <div>
                    <p>Order progressBar</p>
                </div>
            </div>


            <div className="creatingOrder-tiles-and-instructions-container">

                <div className="creatingOrder-tiles">


                    {/*  -----Testator tile ------\*/}
                    {/* <div className="creatingOrder-tile">
                        <div>
                            <h2>About you</h2>
                        </div>

                        {testatorData ? (
                            <>
                                <div>
                                    <h4>Name:</h4> <p>{testaorInitialData.testatorTitle}{testaorInitialData.testatorFullLegalName}</p>
                                </div>
                                <div>
                                    <h4>Date of birth:</h4> <p>{testaorInitialData.testatorDob}</p>
                                </div>
                                <div>
                                    <h4>Address:</h4> <p>{testaorInitialData.testatorFullAddress}</p>
                                </div>
                                <div>
                                    <button onClick={() => navigate('/testator')}>Edit</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>Please enter your details</p>
                                <button onClick={() => navigate('/testator')}>Get Started</button>
                            </>

                        )}
                    </div> */}

                    <TestatorTile />



                    {/*  -----Family tile ------\*/}
                    <div className="creatingOrder-tile">
                        <p>Your Family</p>
                        <button>Edit</button>
                        <button onClick={() => navigate('/aboutYou')}>Get Started</button>

                    </div>


                    <div className="creatingOrder-tile">
                        <p>Your Assets</p>
                        <button>Edit</button>
                        <button onClick={() => navigate('/assets')}>Get Started</button>

                    </div>


                    <div className="creatingOrder-tile">
                        <p>Distribute your assets</p>
                        <button >Edit</button>
                        <button onClick={() => navigate('/assetDistribution')}>Get Started</button>

                    </div>


                    <div className="creatingOrder-tile">
                        <p>Executors</p>
                        <button>Edit</button>
                        <button onClick={() => navigate('/executors')}>Get Started</button>

                    </div>
                </div>




                <div className=" creatingOrder-instructions">
                    <div className="creatingOrder-tile">
                        <p>Order progress</p>
                    </div>
                </div>

            </div>
        </section>
    )

}

export default CreatingOrder;
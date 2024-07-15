import React from "react";
import { Link } from "react-router-dom";
import PersonForm from "./PersonForm";
import { useNavigate } from 'react-router-dom';


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

                    <div className="creatingOrder-tile">
                        <p>About you</p>
                        <button onClick={() => navigate('/aboutYou')}>Edit</button>
                        <button>Get Started</button>

                    </div>


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
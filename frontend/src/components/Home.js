import React from "react";
import HomeReview from "./HomeReview";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login, reset } from '../features/auth/authSlice';
import './FontAwesomeSetup';
import AboutUs from "./AboutUs";
import Pricing from "./Pricing";



const Home = () => {

    const { user } = useSelector(state => state.auth)


    return (
        <>
            <section className="home-section-heading">

                <div className="hero-section-container">
                    <h1>Will writing made simple.</h1>
                    <p><FontAwesomeIcon icon="times-circle" className="custom-icon" />No appointments</p>
                    <p><FontAwesomeIcon icon="times-circle" className="custom-icon" />No solicitors</p>
                    <p><FontAwesomeIcon icon="book" className="custom-icon" />Step by Step guide</p>
                    <p><FontAwesomeIcon icon="clock" className="custom-icon" />Ready in 10 minutes</p>
                    <p><FontAwesomeIcon icon="pound-sign" className="custom-icon" />Starting from £20</p>
                    

                    {user ? (
                        <Link to='/dashboard'>
                            <button id="get-started-btn">Get Started</button>

                        </Link>
                    ) : (
                        <Link to='/login'>
                            <button id="get-started-btn">Get Started  
                            <img src="./feather.png" alt="feather icon" style={{ height: '30px' }} />                            </button>

                        </Link>
                    )}


                </div>

                <img src="/hero1.png" style={{ width: '60%' }} alt="Home" />
                {/* <img src="/robot.svg" style={{ width: '35%' }} alt="Home" /> */}




            </section>
            <section className="how-it-works-section">
                <h1 id="how-it-works-heading">How it works:</h1>
                <div className="how-it-works-container">
                    {/* <div className="how-it-works-subcontainer">
                        <img src="/type.webp" style={{ width: '150px' }} alt="type" />
                        <p>1.Enter your details</p>
                    </div>
                    <div className="how-it-works-subcontainer">
                        <img src="/print.webp" style={{ width: '150px' }} alt="type" />
                        <p>2.Print your will</p>
                    </div>

                    <div className="how-it-works-subcontainer">
                        <img src="/sign.webp" style={{ width: '150px' }} alt="type" />
                        <p>3.Sign it</p>

                    </div> */}
                    <img src="./how_it_works.png" style={{ width: '80%' }}/>
                </div>
            </section>

<section>
    <AboutUs/>
</section>
<section className="pricing-section">
<h1><Link to="/">Pricing</Link></h1>

<Pricing/>
</section>
            <section className="home-reviews-section">
                <h1><Link to="/">Testimonials</Link></h1>

                <div className="home-reviews-container">
                    <HomeReview />
                    <HomeReview />
                    <HomeReview />
                    <HomeReview />


                </div>
                <h4>Rating 4.8/5 based on 123 reviews. <Link to="/">View all reviews</Link></h4>
            </section>
        </>
    );
}

export default Home
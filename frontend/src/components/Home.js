import React from "react";
import HomeReview from "./HomeReview";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login, reset } from '../features/auth/authSlice';
import './FontAwesomeSetup'



const Home = () => {

    const { user } = useSelector(state => state.auth)


    return (
        <>
            <section className="home-section-heading">
                <img src="/home_image.png" style={{ width: '100%' }} alt="Home" />

                <div className="hero-section-container">
                    <h1>Making will writing easy</h1>
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
                            <button id="get-started-btn">Get Started</button>

                        </Link>
                    )}


                </div>





            </section>
            <section className="how-it-works-section">
                <h1 id="how-it-works-heading">How it works:</h1>
                <div className="how-it-works-container">
                    <div className="how-it-works-subcontainer">
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

                    </div>
                </div>
            </section>

            <section className="home-reviews-section">
                <h2><Link to="/">Customer Reviews</Link></h2>

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
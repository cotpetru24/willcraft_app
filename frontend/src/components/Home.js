import React from "react";
import HomeReview from "./HomeReview";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './FontAwesomeSetup'



const Home = () => {


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
                    <button id="get-started-btn">Get Started</button>
                </div>





            </section>
            <h1>How it works:</h1>
            <p>1.Enter your details</p>
            <p>2.Print your will</p>
            <p>3.Sign it</p>
            <p>4.Store it</p>


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
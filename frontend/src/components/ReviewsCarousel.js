// CarouselComponent.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import HomeReview from './HomeReview';
// import './CarouselComponent.css'; // Import the custom CSS

const ReviewsCarousel = () => {
    const reviews = [
        <HomeReview key="1" />,
        <HomeReview key="2" />,
        <HomeReview key="3" />,
        <HomeReview key="4" />,
        <HomeReview key="5" />,
        <HomeReview key="6" />,
        <HomeReview key="7" />,
        <HomeReview key="8" />,
        <HomeReview key="9" />,
        <HomeReview key="10" />,
        <HomeReview key="11" />,
        <HomeReview key="12" />
    ];

    // Function to chunk the reviews array into groups of 3
    const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    const slides = chunkArray(reviews, 4);

    return (
        <Carousel
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            interval={3000}
        >
            {slides.map((group, index) => (
                <div key={index} className="carousel-group">
                    {group.map((item, itemIndex) => (
                        <div key={itemIndex} className="carousel-item">
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </Carousel>
    );
};

export default ReviewsCarousel;

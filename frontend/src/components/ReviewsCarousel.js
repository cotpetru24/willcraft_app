// CarouselComponent.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import HomeReview from './HomeReview';

const ReviewsCarousel = () => {
    const reviews = [
        <HomeReview key="1" />,
        <HomeReview key="2" />,
        <HomeReview key="3" />,
        <HomeReview key="4" />,
        <HomeReview key="5" />,
        <HomeReview key="6" />
    ];

    // Function to chunk the reviews array into groups of 3
    const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    const slides = chunkArray(reviews, 3);

    return (
        <Carousel
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            interval={2000}
        >
            {slides.map((group, index) => (
                <div key={index} className="carousel-group">
                    {group}
                </div>
            ))}
        </Carousel>
    );
};

export default ReviewsCarousel;

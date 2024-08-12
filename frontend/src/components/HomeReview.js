import React from 'react';
import Card from 'react-bootstrap/Card'


// Function to set recipe rating stars
export function formatReviewRating(rating) {
    const yellowStar = '<img class="rating-stars" src="./icons8-star.png" alt="Yellow Star" />';
    const grayStar = '<img class="rating-stars" src="./icons8-star-filled-30-gray.png" alt="Gray Star" />';
    return yellowStar.repeat(rating) + grayStar.repeat(5 - rating);
}

const HomeReview = () => {


    return (
        <Card className='home-review-card m-2' bg="light" text="dark">
            <Card.Body>
                <Card.Title>Jane - Great Service!</Card.Title>
                <Card.Text>
                    The process was seamless and easy to follow. I appreciate the detailed instructions and
                    the quick turnaround time. Will definitely use this service again.
                </Card.Text>
                <div className="review-starts-container" dangerouslySetInnerHTML={{ __html: formatReviewRating(4) }}></div>
            </Card.Body>
        </Card>
    );
};

export default HomeReview;


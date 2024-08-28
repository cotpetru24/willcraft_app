// // import React from 'react';
// // import Card from 'react-bootstrap/Card'


// // // Function to set recipe rating stars
// // export function formatReviewRating(rating) {
// //     const yellowStar = '<img class="rating-stars" src="./icons8-star.png" alt="Yellow Star" />';
// //     const grayStar = '<img class="rating-stars" src="./icons8-star-filled-30-gray.png" alt="Gray Star" />';
// //     return yellowStar.repeat(rating) + grayStar.repeat(5 - rating);
// // }

// // const HomeReview = () => {


// //     return (
// //         <Card className='home-review-card m-2 shadow' bg="light" text="dark" >
// //             <Card.Body>
// //                 <Card.Title>Jane - Great Service!</Card.Title>
// //                 <Card.Text>
// //                     The process was seamless and easy to follow. I appreciate the detailed instructions and
// //                     the quick turnaround time. Will definitely use this service again.
// //                 </Card.Text>
// //                 <div className="review-starts-container" dangerouslySetInnerHTML={{ __html: formatReviewRating(4) }}></div>
// //             </Card.Body>
// //         </Card>
// //     );
// // };

// // export default HomeReview;




// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';

// import { getLast3ReviewsThunk } from '../features/reviews/reviewThunks';
// import { FaStar } from 'react-icons/fa';
// import { Container, Col, Row, Card } from "react-bootstrap";
// import { Link } from "react-router-dom";


// export function formatReviewRating(rating) {
//     const yellowStar = '<img class="rating-stars" src="./icons8-star.png" alt="Yellow Star" />';
//     const grayStar = '<img class="rating-stars" src="./icons8-star-filled-30-gray.png" alt="Gray Star" />';
//     return yellowStar.repeat(rating) + grayStar.repeat(5 - rating);
// }

// const HomeReview = () => {
//     const dispatch = useDispatch();
//     const [reviews, setReviews] = useState([]); // Store reviews in local state
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchLatest3Reviews = async () => {
//             try {
//                 const resultAction = await dispatch(getLast3ReviewsThunk());
//                 if (resultAction.payload.latestReviews && Array.isArray(resultAction.payload.latestReviews)) {
//                     setReviews(resultAction.payload.latestReviews); // Set the reviews to the response payload
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch reviews:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchLatest3Reviews();
//     }, [dispatch]);

//     const renderStars = (rating) => {
//         return (
//             <div>
//                 {[...Array(5)].map((star, index) => {
//                     const ratingValue = index + 1;
//                     return (
//                         <FaStar
//                             key={index}
//                             size={20}
//                             color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
//                         />
//                     );
//                 })}
//             </div>
//         );
//     };

//     return (
//         <div>
//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : (
//                 reviews.map((review, index) => (
//                     <Card key={index} className='home-review-card m-2 shadow' bg="light" text="dark">
//                         <Card.Body>
//                             <Card.Body>
//                                 {/* <Card.Title as="h5">{review.title || "Customer Review"}</Card.Title> */}
//                                 <Card.Text>{review.reviewText}</Card.Text>
//                                 <div>{renderStars(review.rating)}</div>
//                                 <div>
//                                     <Row>
//                                         <Col>
//                                             <div className="order-item-p">
//                                                 {review.reviewText}
//                                             </div>
//                                         </Col>
//                                     </Row>
//                                     <Row className="d-flex justify-content-end">
//                                         <Col>
//                                             <div className="review-stars-container" dangerouslySetInnerHTML={{ __html: formatReviewRating(review.rating) }}></div>
//                                         </Col>
//                                         <Col className="d-flex justify-content-end">
//                                             <strong>{review.userFirstName}</strong> - {new Date(review.createdAt).toLocaleDateString()}
//                                         </Col>
//                                     </Row>
//                                 </div>
//                             </Card.Body>
//                         </Card.Body>
//                     </Card>
//                 )),
//                 <Row className="p-4">
//                 <Col className="d-flex justify-content-center">
//                     <h4>Rating {resultAction.payload.averageRating}/5 based on {resultAction.payload.totalReviews} reviews. <Link to="/reviews">View all reviews</Link></h4>
//                 </Col>
//             </Row>
//             )}
//         </div>
//     );
// };

// export default HomeReview;




import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getLast3ReviewsThunk } from '../features/reviews/reviewThunks';
import { FaStar } from 'react-icons/fa';
import { Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export function formatReviewRating(rating) {
    const yellowStar = '<img class="rating-stars" src="./icons8-star.png" alt="Yellow Star" />';
    const grayStar = '<img class="rating-stars" src="./icons8-star-filled-30-gray.png" alt="Gray Star" />';
    return yellowStar.repeat(rating) + grayStar.repeat(5 - rating);
}

const HomeReview = () => {
    const dispatch = useDispatch();
    const [reviews, setReviews] = useState([]); // Store reviews in local state
    const [isLoading, setIsLoading] = useState(true);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        const fetchLatest3Reviews = async () => {
            try {
                const resultAction = await dispatch(getLast3ReviewsThunk());
                if (resultAction.payload.latestReviews && Array.isArray(resultAction.payload.latestReviews)) {
                    setReviews(resultAction.payload.latestReviews); // Set the reviews to the response payload
                    setAverageRating(resultAction.payload.averageRating);
                    setTotalReviews(resultAction.payload.totalReviews);
                }
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLatest3Reviews();
    }, [dispatch]);

    const renderStars = (rating) => {
        return (
            <div>
                {[...Array(5)].map((star, index) => {
                    const ratingValue = index + 1;
                    return (
                        <FaStar
                            key={index}
                            size={20}
                            color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <Container >
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* <Container className='ps-0 pe-0 m-0'>
                        <Row className="d-flex  justify-content-between">
                            {reviews.map((review, index) => (

                                <Card key={index} className="home-review-card mt-4 shadow" bg="light" text="dark">
                                    <Card.Body className='d-flex flex-column justify-content-between'>
                                        <Card.Text className='home-review-card-text'>
                                            {review.reviewText}
                                        </Card.Text>
                                        <Row className="d-flex justify-content-center">
                                            <Col >
                                                {renderStars(review.rating)}
                                            </Col>
                                            <Col className="d-flex justify-content-end flex-grow-1">
                                                <strong>{review.userFirstName}</strong> - {new Date(review.createdAt).toLocaleDateString()}
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>

                            ))}
                        </Row>
                    </Container> */}
                    <Container className='ps-0 pe-0 mt-3'>
                        <Row className="d-flex justify-content-center justify-content-md-between">
                            {reviews.map((review, index) => (
                                <Col key={index} xs={12} sm={8} md={4} className="d-flex justify-content-center mb-4">
                                    <Card className="home-review-card shadow" bg="light" text="dark" style={{ width: '24rem' }}>
                                        <Card.Body className='d-flex flex-column justify-content-between'>
                                            <Card.Text className='home-review-card-text'>
                                                {review.reviewText}
                                            </Card.Text>
                                            <Row className="d-flex justify-content-center">
                                                <Col xs="auto">
                                                    {renderStars(review.rating)}
                                                </Col>
                                                <Col className="d-flex justify-content-end flex-grow-1">
                                                    <strong>{review.userFirstName}</strong> - {new Date(review.createdAt).toLocaleDateString()}
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>

                    <Container>
                        <Row className="p-4">
                            <Col className="d-flex justify-content-center">
                                <h5>Rating {averageRating}/5 based on {totalReviews} reviews. <Link to="/reviews">View all reviews</Link></h5>
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </Container>
    );

};


export default HomeReview;

// // // import React from "react";
// // // import { useEffect } from "react";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import Spinner from "../components/Spinner.js";
// // // import { useNavigate } from "react-router-dom";
// // // import { Container } from "react-bootstrap";
// // // import { Col, Row } from "react-bootstrap";
// // // import Button from 'react-bootstrap/Button';
// // // import Card from 'react-bootstrap/Card';
// // // import ProgressBar from 'react-bootstrap/ProgressBar';
// // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // import { faCheckSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
// // // import HomeReview from "./HomeReview.js";
// // // import { formatReviewRating } from "./HomeReview.js";
// // // import { getAllReviewsThunk } from "../features/reviews/reviewThunks.js";

// // // const Reviews = () => {
// // //     const navigate = useNavigate();
// // //     const dispatch = useDispatch();
// // //     const { orders, isLoading, isError, message } = useSelector(state =>
// // //         state.orders)

// // //     const order = useSelector(state => state.order)





// // //     useEffect(() => {
// // //         const fetchAllReviews = async () => {
// // //            const allReviews= await dispatch(getAllReviewsThunk());
// // //         };
    
// // //         fetchAllReviews();
// // //     }, [dispatch]);
    

// // //     return (
// // //         isLoading ? <Spinner /> :
// // //             (
// // //                 <>
// // //                     <Container style={{ minHeight: '65vh' }}>
// // //                         <Container className="md-container">
// // //                             <Row className="mt-4 mb-5 ">
// // //                                 <Col>
// // //                                     <h1 className="auth-header">Customer reviews</h1>
// // //                                 </Col>
// // //                             </Row>
// // //                         </Container>
// // //                         <Container className="md-container mb-5">
// // //                             <Card className='shadow' bg="light" text="dark" >
// // //                                 <Card.Body>
// // //                                     <Card.Title as="h5">Great Service!</Card.Title>
// // //                                     <div>
// // //                                         <Row>
// // //                                             <Col>
// // //                                                 <div className="order-item-p">
// // //                                                     The process was seamless and easy to follow.
// // //                                                     I appreciate the detailed instructions and the quick turnaround time. Will definitely use this service again.
// // //                                                 </div>
// // //                                             </Col>
// // //                                         </Row>
// // //                                         <Row className=" d-flex justify-content-end">
// // //                                             <Col>
// // //                                                 <div className="review-starts-container" dangerouslySetInnerHTML={{ __html: formatReviewRating(4) }}></div>                                    </Col>
// // //                                             <Col className="d-flex justify-content-end">
// // //                                                 <strong>Jane</strong> - date here
// // //                                             </Col>
// // //                                         </Row>
// // //                                     </div>
// // //                                 </Card.Body>
// // //                             </Card>
// // //                         </Container>
// // //                     </Container>
// // //                 </>
// // //             )
// // //     );
// // // }

// // // export default Reviews

// // import React, { useEffect, useState } from "react";
// // import { useDispatch } from "react-redux";
// // import Spinner from "../components/Spinner.js";
// // import { Container, Col, Row, Card } from "react-bootstrap";
// // import { formatReviewRating } from "./HomeReview.js";
// // import { getAllReviewsThunk } from "../features/reviews/reviewThunks.js";

// // const Reviews = () => {
// //     const dispatch = useDispatch();
// //     const [reviews, setReviews] = useState([]);
// //     const [isLoading, setIsLoading] = useState(true);

// //     useEffect(() => {
// //         const fetchAllReviews = async () => {
// //             try {
// //                 const resultAction = await dispatch(getAllReviewsThunk());
// //                 if (resultAction.payload) {
// //                     setReviews(resultAction.payload);
// //                 }
// //             } catch (error) {
// //                 console.error("Failed to fetch reviews:", error);
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };

// //         fetchAllReviews();
// //     }, [dispatch]);

// //     return (
// //         isLoading ? <Spinner /> :
// //             (
// //                 <>
// //                     <Container style={{ minHeight: '65vh' }}>
// //                         <Container className="md-container">
// //                             <Row className="mt-4 mb-5 ">
// //                                 <Col>
// //                                     <h1 className="auth-header">Customer Reviews</h1>
// //                                 </Col>
// //                             </Row>
// //                         </Container>
// //                         <Container className="md-container mb-5">
// //                             {reviews.length > 0 ? (
// //                                 reviews.map((review, index) => (
// //                                     <Card className='shadow mb-3' bg="light" text="dark" key={index}>
// //                                         <Card.Body>
// //                                             <Card.Title as="h5">{review.title || "Customer Review"}</Card.Title>
// //                                             <div>
// //                                                 <Row>
// //                                                     <Col>
// //                                                         <div className="order-item-p">
// //                                                             {review.reviewText}
// //                                                         </div>
// //                                                     </Col>
// //                                                 </Row>
// //                                                 <Row className="d-flex justify-content-end">
// //                                                     <Col>
// //                                                         <div className="review-stars-container" dangerouslySetInnerHTML={{ __html: formatReviewRating(review.rating) }}></div>
// //                                                     </Col>
// //                                                     <Col className="d-flex justify-content-end">
// //                                                         <strong>{review.userFirstName}</strong> - {new Date(review.createdAt).toLocaleDateString()}
// //                                                     </Col>
// //                                                 </Row>
// //                                             </div>
// //                                         </Card.Body>
// //                                     </Card>
// //                                 ))
// //                             ) : (
// //                                 <p>No reviews available.</p>
// //                             )}
// //                         </Container>
// //                     </Container>
// //                 </>
// //             )
// //     );
// // }

// // export default Reviews;



// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import Spinner from "../components/Spinner.js";
// import { Container, Col, Row, Card } from "react-bootstrap";
// import { formatReviewRating } from "./HomeReview.js";
// import { getAllReviewsThunk } from "../features/reviews/reviewThunks.js";

// const Reviews = () => {
//     const dispatch = useDispatch();
//     const [isLoading, setIsLoading] = useState(true);
//     let reviews = [];

//     useEffect(() => {
//         const fetchAllReviews = async () => {
//             try {
//                 const resultAction = await dispatch(getAllReviewsThunk());
//                 if (resultAction.payload) {
//                     reviews = resultAction.payload; // Use reviews directly
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch reviews:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchAllReviews();
//     }, [dispatch]);

//     return (
//         isLoading ? <Spinner /> :
//             (
//                 <>
//                     <Container style={{ minHeight: '65vh' }}>
//                         <Container className="md-container">
//                             <Row className="mt-4 mb-5 ">
//                                 <Col>
//                                     <h1 className="auth-header">Customer Reviews</h1>
//                                 </Col>
//                             </Row>
//                         </Container>
//                         <Container className="md-container mb-5">
//                             {reviews.length > 0 ? (
//                                 reviews.map((review, index) => (
//                                     <Card className='shadow mb-3' bg="light" text="dark" key={index}>
//                                         <Card.Body>
//                                             <Card.Title as="h5">{review.title || "Customer Review"}</Card.Title>
//                                             <div>
//                                                 <Row>
//                                                     <Col>
//                                                         <div className="order-item-p">
//                                                             {review.reviewText}
//                                                         </div>
//                                                     </Col>
//                                                 </Row>
//                                                 <Row className="d-flex justify-content-end">
//                                                     <Col>
//                                                         <div className="review-stars-container" dangerouslySetInnerHTML={{ __html: formatReviewRating(review.rating) }}></div>
//                                                     </Col>
//                                                     <Col className="d-flex justify-content-end">
//                                                         <strong>{review.userFirstName}</strong> - {new Date(review.createdAt).toLocaleDateString()}
//                                                     </Col>
//                                                 </Row>
//                                             </div>
//                                         </Card.Body>
//                                     </Card>
//                                 ))
//                             ) : (
//                                 <p>No reviews available.</p>
//                             )}
//                         </Container>
//                     </Container>
//                 </>
//             )
//     );
// }

// export default Reviews;



import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../components/Spinner.js";
import { Container, Col, Row, Card } from "react-bootstrap";
import { formatReviewRating } from "./HomeReview.js";
import { getAllReviewsThunk } from "../features/reviews/reviewThunks.js";

const Reviews = () => {
    const dispatch = useDispatch();
    const [reviews, setReviews] = useState([]); // Store reviews in local state
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const resultAction = await dispatch(getAllReviewsThunk());
                if (resultAction.payload && Array.isArray(resultAction.payload)) {
                    setReviews(resultAction.payload); // Set the reviews to the response payload
                }
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllReviews();
    }, [dispatch]);

    return (
        isLoading ? <Spinner /> :
            (
                <>
                    <Container style={{ minHeight: '65vh' }}>
                        <Container className="md-container">
                            <Row className="mt-4 mb-5 ">
                                <Col>
                                    <h1 className="auth-header">Customer Reviews</h1>
                                </Col>
                            </Row>
                        </Container>
                        <Container className="md-container mb-5">
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <Card className='shadow mb-3' bg="light" text="dark" key={index}>
                                        <Card.Body>
                                            {/* <Card.Title as="h5">{review.title || "Customer Review"}</Card.Title> */}
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <div className="order-item-p">
                                                            {review.reviewText}
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className="d-flex justify-content-end">
                                                    <Col>
                                                        <div className="review-stars-container" dangerouslySetInnerHTML={{ __html: formatReviewRating(review.rating) }}></div>
                                                    </Col>
                                                    <Col className="d-flex justify-content-end">
                                                        <strong>{review.userFirstName}</strong> - {new Date(review.createdAt).toLocaleDateString()}
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <p>No reviews available.</p>
                            )}
                        </Container>
                    </Container>
                </>
            )
    );
}

export default Reviews;

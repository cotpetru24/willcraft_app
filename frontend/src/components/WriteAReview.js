import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./Spinner.js";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";
import { FaStar } from 'react-icons/fa';

const WriteAReview = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const userId = user._id;
    const userFirstName = user.firstName;

    const isLoading = false;

    useEffect(() => {
        // Placeholder for any side effects or fetching needed
    }, []);

    const [rating, setRating] = useState(5);
    const [hover, setHover] = useState(null);
    const [reviewForm, setReviewForm] = useState({
        reviewText: '',
    });

    const handleSendReview = (e) => {
        e.preventDefault();
        // Submit the review along with the rating
        const reviewData = { userId, userFirstName, rating, reviewText: reviewForm.reviewText };
        // Replace sendReview with the actual function to send review data
        console.log("Review submitted:", reviewData);
        setReviewForm({ reviewText: '' });
        setRating(5); // Reset rating to default value (5 stars)
    }

    return (
        isLoading ? <Spinner /> :
            (
                <>
                    <Container style={{ minHeight: '65vh' }} >
                        <Row className="mt-5 mb-5">
                            <Col>
                                <Form onSubmit={handleSendReview}>
                                    <Form.Group controlId="formGroupRating" className="mb-3">
                                        <div className="star-rating">
                                            {[...Array(5)].map((star, index) => {
                                                const starValue = index + 1;
                                                return (
                                                    <label key={index}>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            value={starValue}
                                                            onClick={() => setRating(starValue)}
                                                            style={{ display: 'none' }}
                                                        />
                                                        <FaStar
                                                            size={30}
                                                            color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                                            onMouseEnter={() => setHover(starValue)}
                                                            onMouseLeave={() => setHover(null)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </Form.Group>

                                    <Form.Group controlId="formGroupTextarea">
                                        <Form.Control
                                            required
                                            className="mb-3"
                                            as="textarea"
                                            placeholder="Your message"
                                            value={reviewForm.reviewText}
                                            onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        className='mb-5'
                                        type="submit"
                                    >
                                        Send
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </>
            )
    );
}

export default WriteAReview;

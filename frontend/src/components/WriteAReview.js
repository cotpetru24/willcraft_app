import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import { FaStar } from 'react-icons/fa';
import { createReviewThunk } from "../features/reviews/reviewThunks.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./Spinner.js";

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

    const handleSendReview = async (e) => {
        e.preventDefault();
        // Submit the review along with the rating
        const reviewData = { userId, userFirstName, rating, reviewText: reviewForm.reviewText };
        console.log("Review submitted:", reviewData);

        await dispatch(createReviewThunk(reviewData));

        // Show toast and navigate to dashboard
        toast.success("Thank you for your feedback!", {
            onClose: () => navigate('/dashboard'),
            position: "top-center",
            autoClose: 1000,  // This ensures the toast will auto-close after 2 seconds
            hideProgressBar: true,  // Optional: hide the progress bar
            closeOnClick: true,  // Close the toast when clicked
            pauseOnHover: false,  // Keep auto-close behavior consistent when hovering
            draggable: false,  // Disable drag to dismiss
        });
        

        // Reset the form fields
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

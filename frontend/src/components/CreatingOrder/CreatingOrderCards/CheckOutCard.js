import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-here'); // Use your Stripe Publishable Key

const CheckOutCard = ({ clientSecret, setShowCheckout }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            setError(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
            }
        }
    };

    return (
        <>
            <Container className="mb-5">
                <Card className="shadow" bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col xs={10}>
                                    <h2>Checkout</h2>
                                </Col>
                            </Row>
                        </Card.Title>
                        <Card.Text as="div">
                            <Row>
                                <Col>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formGroupCardDetails">
                                            <Form.Label className="bold-label">Card Details</Form.Label>
                                            <CardElement />
                                        </Form.Group>
                                        <Button
                                            variant="primary"
                                            className="m-1 add-edit-form-btn"
                                            type="submit"
                                            disabled={!stripe}
                                        >
                                            Pay
                                        </Button>
                                        {error && <div>{error}</div>}
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Text>
                        <Button variant="primary" className="creating-order-tile-btns"
                            // onClick={() => navigate('/ChechOutForm')}
                            onClick={() => setShowCheckout(false)}
                        >
                            Cancel
                        </Button>
                    </Card.Body>
                </Card>
            </Container>

        </>
    );
};

const PaymentPage = ({ clientSecret, setShowCheckout }) => (
    <Elements stripe={stripePromise}>
        <CheckOutCard clientSecret={clientSecret} setShowCheckout={setShowCheckout} />
    </Elements>
);

export default PaymentPage;

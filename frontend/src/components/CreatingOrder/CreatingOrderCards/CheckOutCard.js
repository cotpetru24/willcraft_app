import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaymentIntentThunk,
  createPaymentThunk,
} from "../../../features/payment/paymentThunks";
import { updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_API_FRONTEND_SECRET
);

const CheckOutCard = ({ setShowCheckout }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  const currentOrder = useSelector((state) => state.currentOrder);
  const userId = useSelector((state) => state.auth.user._id);

  // State for checkboxes
  const [addStorage, setAddStorage] = useState(false);
  const [addPrinting, setAddPrinting] = useState(false);

  // Base product
  const baseProduct = { name: "Standard will", price: 20, vat: 4 };

  // Calculate total price and VAT
  const storageProduct = { name: "Storage", price: 25, vat: 5 };
  const printingProduct = { name: "Printing", price: 10, vat: 2 };

  const totalAmount =
    baseProduct.price +
    (addStorage ? storageProduct.price : 0) +
    (addPrinting ? printingProduct.price : 0);
  const totalVAT =
    baseProduct.vat +
    (addStorage ? storageProduct.vat : 0) +
    (addPrinting ? printingProduct.vat : 0);

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      const productsData = { products: { ...baseProduct, price: totalAmount } };
      setProducts(productsData);
      try {
        const paymentIntentResponse = await dispatch(
          createPaymentIntentThunk(productsData)
        ).unwrap();
        setClientSecret(paymentIntentResponse.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, [totalAmount]);

  // const fetchClientSecret = useCallback(async () => {
  //     const products = { products: { ...baseProduct, price: totalAmount }};
  //     try {
  //         const paymentIntentResponse = await dispatch(createPaymentIntentThunk(products)).unwrap();
  //         setClientSecret(paymentIntentResponse.clientSecret);
  //     } catch (error) {
  //         console.error("Error fetching client secret:", error);
  //     }
  // }, [dispatch, baseProduct, totalAmount]);

  // useEffect(() => {
  //     fetchClientSecret();
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(`Payment failed: ${error.message}`);
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Prepare the payment data to dispatch
        const paymentData = {
          orderId: currentOrder.orderId,
          userId: userId,
          amount: paymentIntent.amount,
          status: paymentIntent.status,
          paymentDate: new Date(paymentIntent.created * 1000),
          paymentMethod: paymentIntent.payment_method_types[0],
          products: products.products,
        };

        // Dispatch createPaymentThunk with the payment data
        // dispatch(createPaymentThunk(paymentData));

        await dispatch(createPaymentThunk(paymentData)).unwrap();
        await dispatch(
          updateOrderThunk({
            ...currentOrder,
            status: "complete",
            completionDate: new Date()
          })
        );

        // Handle successful payment
        console.log("Payment successful!");
        setError(null);
        setIsProcessing(false);
        setTimeout(() => {
          setShowCheckout(false);
        }, 2000); // 2-second delay
        toast.success("Payment successfully made!");
      }
    } catch (err) {
      console.error("Payment error: ", err);
      setError(`Payment failed: ${err.message}`);
      setIsProcessing(false);
    }
  };


  // const CARD_ELEMENT_OPTIONS = {
  //   style: {
  //     base: {
  //       color: "#495057", // Standard input text color
  //       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //       fontSmoothing: "antialiased",
  //       fontSize: "16px",
  //       "::placeholder": {
  //         color: "#6c757d" // Placeholder color similar to Bootstrap
  //       },
  //       backgroundColor: "#ffffff", // Input background color
  //       border: "1px solid #ced4da", // Standard Bootstrap input border color
  //       borderRadius: "0.25rem", // Standard Bootstrap border radius
  //       padding: "0.375rem 0.75rem", // Standard Bootstrap padding
  //       boxShadow: "none", // Removing any shadow
  //     },
  //     invalid: {
  //       color: "#dc3545", // Bootstrap danger color for invalid inputs
  //       iconColor: "#dc3545"
  //     }
  //   }
  // };


  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#000000', // Text color
        fontFamily: 'Avenir, Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#73757B', // Placeholder text color
        },
        backgroundColor: '', // Background color
        border: '1px solid #000000', // Border color
        borderRadius: '12px', // Border radius
      },
      invalid: {
        color: '#ff0000', // Error text color
        iconColor: '#ff0000', // Error icon color
      },
    },
    hidePostalCode: true, // Hide postal code field if needed
  };

  const appearance = {
    theme: 'stripe'
  };

  const element ={
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '#fff',
        fontWeight: '500',
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: '#fce883',
        },
        '::placeholder': {
          color: '#87BBFD',
        },
      },
      invalid: {
        iconColor: '#FFC7EE',
        color: '#FFC7EE',
      },
    },
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
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

            {/* Order Breakdown */}
            <Card.Text>
              <p>
                1x {baseProduct.name} = £{baseProduct.price} (£{baseProduct.vat}{" "}
                VAT)
              </p>
              {addStorage && (
                <p>
                  1x {storageProduct.name} = £{storageProduct.price} (£
                  {storageProduct.vat} VAT)
                </p>
              )}
              {addPrinting && (
                <p>
                  1x {printingProduct.name} = £{printingProduct.price} (£
                  {printingProduct.vat} VAT)
                </p>
              )}
              <p>
                <strong>
                  Total: £{totalAmount} (£{totalVAT} VAT)
                </strong>
              </p>
            </Card.Text>

            <Card.Text as="div">
              <Row>
                <Col>
                  <Form onSubmit={handleSubmit}>
                    {/* Checkboxes for add-ons */}
                    <Form.Group className="mb-3" controlId="formGroupAddOns">
                      <Form.Check
                        type="checkbox"
                        label="Add Storage"
                        checked={addStorage}
                        onChange={() => setAddStorage(!addStorage)}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Add Printing"
                        checked={addPrinting}
                        onChange={() => setAddPrinting(!addPrinting)}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formGroupCardDetails"
                    >
                      <Form.Label className="bold-label">
                        Card Details
                      </Form.Label>
                      {/* <CardElement oprions={CARD_ELEMENT_OPTIONS}/> */}
                      <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} className="form-control" />
                    </Form.Group>
                    <Button
                      variant="primary"
                      className="m-1"
                      type="submit"
                      disabled={!stripe || isProcessing}
                    >
                      {isProcessing ? "Processing..." : "Pay"}
                    </Button>
                    {error && <div>{error}</div>}
                  </Form>
                </Col>
              </Row>
            </Card.Text>
            <Button
              variant="primary"
              className="creating-order-tile-btns"
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

const PaymentPage = ({ setShowCheckout }) => (
  <Elements stripe={stripePromise}>
    <CheckOutCard setShowCheckout={setShowCheckout} />
  </Elements>
);

export default PaymentPage;

// ---------------this works with the latest stripe api-----------

// import React, { useState, useEffect } from "react";

// import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from "axios";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_FRONTEND_SECRET);

// const CheckOutCard = ({ setShowCheckout }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [clientSecret, setClientSecret] = useState(null);

//     useEffect(() => {
//         // Fetch client secret from the backend
//         const fetchClientSecret = async () => {
//             const product = { name: "Standard will", price: 20 }; // Example product
//             try {
//                 const response = await axios.post('/api/payments/create-payment-intent', { product });
//                 setClientSecret(response.data.clientSecret);
//             } catch (error) {
//                 console.error("Error fetching client secret:", error);
//             }
//         };

//         fetchClientSecret();
//     }, []);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!stripe || !elements || !clientSecret) {
//             return;
//         }

//         setIsProcessing(true);

//         const cardElement = elements.getElement(CardElement);

//         try {
//             const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: {
//                     card: cardElement,
//                 },
//             });

//             if (error) {
//                 setError(`Payment failed: ${error.message}`);
//                 setIsProcessing(false);
//             } else if (paymentIntent && paymentIntent.status === 'succeeded') {
//                 console.log('Payment successful!');
//                 setError(null);
//                 setIsProcessing(false);
//                 setTimeout(() => {
//                     setShowCheckout(false);
//                 }, 2000); // 2-second delay
//                 toast.success("Payment successfully made!");
//             }
//         } catch (err) {
//             console.error("Payment error: ", err);
//             setError(`Payment failed: ${err.message}`);
//             setIsProcessing(false);
//         }
//     };

//     return (
//         <>
//         <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
//             <Container className="mb-5"></Container>
//         <Container className="mb-5">
//             <Card className="shadow" bg="light" text="dark">
//                 <Card.Body>
//                     <Card.Title>
//                         <Row>
//                             <Col xs={10}>
//                                 <h2>Checkout</h2>
//                             </Col>
//                         </Row>
//                     </Card.Title>
//                     <Card.Text as="div">
//                         <Row>
//                             <Col>
//                                 <Form onSubmit={handleSubmit}>
//                                                                     {/* Checkboxes for add-ons */}
//                                                                     <Form.Group className="mb-3" controlId="formGroupAddOns">
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Add Storage"
//                                             // checked={addStorage}
//                                             // onChange={() => setAddStorage(!addStorage)}
//                                         />
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Add Printing"
//                                             // checked={addPrinting}
//                                             // onChange={() => setAddPrinting(!addPrinting)}
//                                         />
//                                     </Form.Group>

//                                     <Form.Group className="mb-3" controlId="formGroupCardDetails">
//                                         <Form.Label className="bold-label">Card Details</Form.Label>
//                                         <CardElement />
//                                     </Form.Group>
//                                     <Button
//                                         variant="primary"
//                                         className="m-1"
//                                         type="submit"
//                                         disabled={!stripe || isProcessing}
//                                     >
//                                         {isProcessing ? 'Processing...' : 'Pay'}
//                                     </Button>
//                                     {error && <div>{error}</div>}
//                                 </Form>
//                             </Col>
//                         </Row>
//                     </Card.Text>
//                     <Button
//                         variant="primary"
//                         className="creating-order-tile-btns"
//                         onClick={() => setShowCheckout(false)}
//                     >
//                         Cancel
//                     </Button>
//                 </Card.Body>
//             </Card>
//         </Container>
//         </>
//     );
// };

// const PaymentPage = ({ setShowCheckout }) => (
//     <Elements stripe={stripePromise}>
//         <CheckOutCard setShowCheckout={setShowCheckout} />
//     </Elements>
// );

// export default PaymentPage;

// ------------this works-------------------

// import React, { useState } from "react";
// import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import StripeCheckout from 'react-stripe-checkout'
// import axios from "axios";
// const API_URL = '/api/payments/';

// const stripePromise = loadStripe('your-publishable-key-here'); // Use your Stripe Publishable Key

// const CheckOutCard = ({ clientSecret, setShowCheckout }) => {

//     const [product, setProduct] = useState({
//         name: "Standard will",
//         price: 20
//     })

//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         const result = await stripe.confirmCardPayment(process.env.REACT_APP_STRIPE_API_FRONTEND_SECRET, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//             },
//         });

//         if (result.error) {
//             setError(result.error.message);
//         } else {
//             if (result.paymentIntent.status === 'succeeded') {
//                 console.log('Payment successful!');
//             }
//         }
//     };

//     const makePayment = async (token) => {
//         const body = {
//             token,
//             product
//         };

//         const headers = {
//             "Content-Type": "application/json"
//         };

//         try {
//             const response = await axios.post(API_URL, body, { headers });
//             console.log(JSON.stringify(response));
//             const { status } = response;
//             console.log(`status = ${status}`);
//             return response.data;
//         } catch (error) {
//             console.error("Payment error: ", error);
//             throw error;
//         }
//     };

//     return (
//         <>
//             <Container className="mb-5">
//                 <Card className="shadow" bg="light" text="dark">
//                     <Card.Body>
//                         <Card.Title>
//                             <Row>
//                                 <Col xs={10}>
//                                     <h2>Checkout</h2>
//                                 </Col>
//                             </Row>
//                         </Card.Title>
//                         <Card.Text as="div">
//                             <Row>
//                                 <Col>
//                                     <Form onSubmit={handleSubmit}>
//                                         <Form.Group className="mb-3" controlId="formGroupCardDetails">
//                                             <Form.Label className="bold-label">Card Details</Form.Label>
//                                             <CardElement />
//                                         </Form.Group>
//                                         <Button
//                                             variant="primary"
//                                             className=" m-1"
//                                             type="submit"
//                                             disabled={!stripe}
//                                         >
//                                             Pay
//                                         </Button>
//                                         {error && <div>{error}</div>}
//                                     </Form>
//                                 </Col>
//                             </Row>
//                         </Card.Text>
//                         <Button
//                             variant="primary"
//                             className="creating-order-tile-btns"
//                             onClick={() => setShowCheckout(false)}
//                         >
//                             Cancel
//                         </Button>
//                     </Card.Body>
//                 </Card>

//                 <StripeCheckout
//                     stripeKey={process.env.REACT_APP_STRIPE_API_FRONTEND_SECRET}
//                     token={makePayment}
//                     amount={product.price * 100}
//                 >

//                     <Button>Pay {product.price}£</Button>
//                 </StripeCheckout>
//             </Container>

//         </>
//     );
// };

// const PaymentPage = ({ clientSecret, setShowCheckout }) => (

//     <Elements stripe={stripePromise}>
//         {/* <StripeCheckout
//             stripeKey={process.env.REACT_APP_STRIPE_API_FRONTEND_SECRET}
//             token={makePayment}
//         // amount={product.price * 100}
//         >
//             {/* {product.price} */}
//         {/* <Button>Pay</Button> */}
//         {/* </StripeCheckout> */}
//         <CheckOutCard clientSecret={process.env.REACT_APP_STRIPE_API_FRONTEND_SECRET} setShowCheckout={setShowCheckout} />
//     </Elements>
// );

// export default PaymentPage;

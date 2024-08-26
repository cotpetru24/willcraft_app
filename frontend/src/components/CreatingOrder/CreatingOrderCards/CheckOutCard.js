import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntentThunk, createPaymentThunk } from "../../../features/payment/paymentThunks";
import { updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_FRONTEND_SECRET);

const CheckOutCard = ({ setShowCheckout, clientSecret }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
















  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!stripe || !elements || !clientSecret) {
  //     return;
  //   }

  //   setIsProcessing(true);

  //   try {
  //     const { error, paymentIntent } = await stripe.confirmPayment({
  //       elements,
  //       confirmParams: {
  //       },
  //       redirect: "if_required", 
  //     });

  //     if (error) {
  //       setError(`Payment failed: ${error.message}`);
  //       setIsProcessing(false);
  //     } else if (paymentIntent && paymentIntent.status === "succeeded") {
  //       // Prepare the payment data to dispatch
  //       const paymentData = {
  //         orderId: currentOrder.orderId,
  //         userId: userId,
  //         amount: paymentIntent.amount,
  //         status: paymentIntent.status,
  //         paymentDate: new Date(paymentIntent.created * 1000),
  //         paymentMethod: paymentIntent.payment_method_types[0],
  //         products:[products here]
  //       };

  //       await dispatch(createPaymentThunk(paymentData)).unwrap();
  //       await dispatch(
  //         updateOrderThunk({
  //           ...currentOrder,
  //           status: "complete",
  //           completionDate: new Date(),
  //         })
  //       );

  //       // Handle successful payment
  //       console.log("Payment successful!");
  //       setError(null);
  //       setIsProcessing(false);
  //       setTimeout(() => {
  //         setShowCheckout(false);
  //       }, 2000); // 2-second delay
  //       toast.success("Payment successfully made!");
  //     }
  //   } catch (err) {
  //     console.error("Payment error: ", err);
  //     setError(`Payment failed: ${err.message}`);
  //     setIsProcessing(false);
  //   }
  // };









  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }
  
    setIsProcessing(true);
  
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required", 
      });
  
      if (error) {
        setError(`Payment failed: ${error.message}`);
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
  
        // Gather selected products
        const selectedProducts = [
          baseProduct,
          ...(addStorage ? [storageProduct] : []),
          ...(addPrinting ? [printingProduct] : []),
        ];
  
        // Prepare the payment data to dispatch
        const paymentData = {
          orderId: currentOrder.orderId,
          userId: userId,
          amount: paymentIntent.amount,
          status: paymentIntent.status,
          paymentDate: new Date(paymentIntent.created * 1000),
          paymentMethod: paymentIntent.payment_method_types[0],
          products: selectedProducts, // Include selected products here
        };
  
        await dispatch(createPaymentThunk(paymentData)).unwrap();
        await dispatch(
          updateOrderThunk({
            ...currentOrder,
            status: "complete",
            completionDate: new Date(),
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
                      <Form.Label className="bold-label">Card Details</Form.Label>
                      <PaymentElement />
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

const PaymentPage = ({ setShowCheckout }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const baseProduct = { name: "Standard will", price: 20, vat: 4 };
      const productsData = { products: { ...baseProduct, price: 20 } };
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
  }, [dispatch]);

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckOutCard setShowCheckout={setShowCheckout} clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
};

export default PaymentPage;




















// import React, { useState, useEffect, useCallback } from "react";
// import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createPaymentIntentThunk,
//   createPaymentThunk,
// } from "../../../features/payment/paymentThunks";
// import { updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";

// const stripePromise = loadStripe(
//   process.env.REACT_APP_STRIPE_API_FRONTEND_SECRET
// );

// const CheckOutCard = ({ setShowCheckout }) => {
//   const dispatch = useDispatch();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [clientSecret, setClientSecret] = useState(null);

//   const currentOrder = useSelector((state) => state.currentOrder);
//   const userId = useSelector((state) => state.auth.user._id);

//   // State for checkboxes
//   const [addStorage, setAddStorage] = useState(false);
//   const [addPrinting, setAddPrinting] = useState(false);

//   // Base product
//   const baseProduct = { name: "Standard will", price: 20, vat: 4 };

//   // Calculate total price and VAT
//   const storageProduct = { name: "Storage", price: 25, vat: 5 };
//   const printingProduct = { name: "Printing", price: 10, vat: 2 };

//   const totalAmount =
//     baseProduct.price +
//     (addStorage ? storageProduct.price : 0) +
//     (addPrinting ? printingProduct.price : 0);
//   const totalVAT =
//     baseProduct.vat +
//     (addStorage ? storageProduct.vat : 0) +
//     (addPrinting ? printingProduct.vat : 0);

//   const [products, setProducts] = useState(null);

//   useEffect(() => {
//     const fetchClientSecret = async () => {
//       const productsData = { products: { ...baseProduct, price: totalAmount } };
//       setProducts(productsData);
//       try {
//         const paymentIntentResponse = await dispatch(
//           createPaymentIntentThunk(productsData)
//         ).unwrap();
//         setClientSecret(paymentIntentResponse.clientSecret);
//       } catch (error) {
//         console.error("Error fetching client secret:", error);
//       }
//     };

//     fetchClientSecret();
//   }, [totalAmount]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements || !clientSecret) {
//       return;
//     }

//     setIsProcessing(true);

//     const cardElement = elements.getElement(CardElement);

//     try {
//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card: cardElement,
//           },
//         }
//       );

//       if (error) {
//         setError(`Payment failed: ${error.message}`);
//         setIsProcessing(false);
//       } else if (paymentIntent && paymentIntent.status === "succeeded") {
//         // Prepare the payment data to dispatch
//         const paymentData = {
//           orderId: currentOrder.orderId,
//           userId: userId,
//           amount: paymentIntent.amount,
//           status: paymentIntent.status,
//           paymentDate: new Date(paymentIntent.created * 1000),
//           paymentMethod: paymentIntent.payment_method_types[0],
//           products: products.products,
//         };



//         await dispatch(createPaymentThunk(paymentData)).unwrap();
//         await dispatch(
//           updateOrderThunk({
//             ...currentOrder,
//             status: "complete",
//             completionDate: new Date()
//           })
//         );

//         // Handle successful payment
//         console.log("Payment successful!");
//         setError(null);
//         setIsProcessing(false);
//         setTimeout(() => {
//           setShowCheckout(false);
//         }, 2000); // 2-second delay
//         toast.success("Payment successfully made!");
//       }
//     } catch (err) {
//       console.error("Payment error: ", err);
//       setError(`Payment failed: ${err.message}`);
//       setIsProcessing(false);
//     }
//   };


//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         closeOnClick
//         pauseOnHover
//       />
//       <Container className="mb-5">
//         <Card className="shadow" bg="light" text="dark">
//           <Card.Body>
//             <Card.Title>
//               <Row>
//                 <Col xs={10}>
//                   <h2>Checkout</h2>
//                 </Col>
//               </Row>
//             </Card.Title>

//             {/* Order Breakdown */}
//             <Card.Text>
//               <p>
//                 1x {baseProduct.name} = £{baseProduct.price} (£{baseProduct.vat}{" "}
//                 VAT)
//               </p>
//               {addStorage && (
//                 <p>
//                   1x {storageProduct.name} = £{storageProduct.price} (£
//                   {storageProduct.vat} VAT)
//                 </p>
//               )}
//               {addPrinting && (
//                 <p>
//                   1x {printingProduct.name} = £{printingProduct.price} (£
//                   {printingProduct.vat} VAT)
//                 </p>
//               )}
//               <p>
//                 <strong>
//                   Total: £{totalAmount} (£{totalVAT} VAT)
//                 </strong>
//               </p>
//             </Card.Text>

//             <Card.Text as="div">
//               <Row>
//                 <Col>
//                   <Form onSubmit={handleSubmit}>
//                     {/* Checkboxes for add-ons */}
//                     <Form.Group className="mb-3" controlId="formGroupAddOns">
//                       <Form.Check
//                         type="checkbox"
//                         label="Add Storage"
//                         checked={addStorage}
//                         onChange={() => setAddStorage(!addStorage)}
//                       />
//                       <Form.Check
//                         type="checkbox"
//                         label="Add Printing"
//                         checked={addPrinting}
//                         onChange={() => setAddPrinting(!addPrinting)}
//                       />
//                     </Form.Group>

//                     <Form.Group
//                       className="mb-3"
//                       controlId="formGroupCardDetails"
//                     >
//                       <Form.Label className="bold-label">
//                         Card Details
//                       </Form.Label>
//                       <CardElement id="card-element"  className="form-control" />
//                     </Form.Group>
//                     <Button
//                       variant="primary"
//                       className="m-1"
//                       type="submit"
//                       disabled={!stripe || isProcessing}
//                     >
//                       {isProcessing ? "Processing..." : "Pay"}
//                     </Button>
//                     {error && <div>{error}</div>}
//                   </Form>
//                 </Col>
//               </Row>
//             </Card.Text>
//             <Button
//               variant="primary"
//               className="creating-order-tile-btns"
//               onClick={() => setShowCheckout(false)}
//             >
//               Cancel
//             </Button>
//           </Card.Body>
//         </Card>
//       </Container>
//     </>
//   );
// };

// const PaymentPage = ({ setShowCheckout }) => (
//   <Elements stripe={stripePromise}>
//     <CheckOutCard setShowCheckout={setShowCheckout} />
//   </Elements>
// );

// export default PaymentPage;


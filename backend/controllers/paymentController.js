import asyncHandler from 'express-async-handler';
import Person from '../models/personModel.js';
import User from '../models/userModel.js';
import Payment from '../models/paymentModel.js';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import express from 'express';


dotenv.config();  // Make sure to load env variables before using them

const stripe = new Stripe(process.env.STRIPE_API_SECRET);

const router = express.Router();


// Create a new payment
export const createPayment = asyncHandler(async (req, res) => {
    const { orderId, amount, status, paymentDate, products, paymentMethod } = req.body;

    if (!orderId || !amount || !products || !paymentMethod) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const payment = await Payment.create({
        orderId,
        userId: req.user._id,
        amount,
        status: status || 'pending',
        paymentDate: paymentDate || Date.now(),
        products,
        paymentMethod
    });

    res.status(200).json(payment);
});

// Get a specific payment by ID
export const getPayment = asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id).populate('orderId userId');

    if (!payment) {
        res.status(404);
        throw new Error('Payment not found');
    }

    res.status(200).json(payment);
});


// export const paymentIntent = asyncHandler(async (req, res) => {
//     const { products } = req.body;

//     try {
//         console.log('Request body:', JSON.stringify(req.body, null, 2));
//         console.log(`products= ${products}`)
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: products.price * 100, // Stripe works with the smallest currency unit
//             currency: 'gbp',
//             description: products.name,
//             automatic_payment_methods: { enabled: true },
//         });

//         res.status(200).send({
//             clientSecret: paymentIntent.client_secret,
//         });
//     } catch (error) {
//         console.log('Error creating payment intent:', error);
//         res.status(500).send({ error: 'Failed to create payment intent' });
//     }
// });


// export const paymentIntent = asyncHandler(async (req, res) => {
//     const { products } = req.body;

//     try {
//         // console.log('Request body:', JSON.stringify(req.body, null, 2));

//         // Initialize total amount
//         let totalAmount = 0;

//         // Assuming products is an array, sum up the prices
//         console.log(`products= ${JSON.stringify(products)}`)
//         products.forEach(product => {
//             console.log(`Product: ${product.name}, Price: ${product.price}`);
//             totalAmount += product.price;
//         });

//         // Convert total amount to the smallest currency unit (e.g., pence for GBP)
//         totalAmount = totalAmount * 100;

//         console.log(`Total amount (in smallest currency unit): ${totalAmount}`);

//         // Create the payment intent with the calculated total amount
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: totalAmount,
//             currency: 'gbp',
//             description: 'Order payment',
//             automatic_payment_methods: { enabled: true },
//         });

//         // Send the client secret to the client
//         res.status(200).send({
//             clientSecret: paymentIntent.client_secret,
//         });
//     } catch (error) {
//         console.log('Error creating payment intent:', error);
//         res.status(500).send({ error: 'Failed to create payment intent' });
//     }
// });


export const paymentIntent = asyncHandler(async (req, res) => {
    const { products } = req.body;

    try {
        console.log('Request body:', JSON.stringify(req.body, null, 2));

        // Calculate the total amount by summing up the price of each product
        const totalAmount = products.reduce((acc, product) => acc + Number(product.price), 0) * 100;


        console.log('Total amount to be charged (in smallest currency unit):', totalAmount);

        // Create the payment intent with the calculated total amount
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount, // Stripe works with the smallest currency unit (pence for GBP)
            currency: 'gbp',
            description: 'Order payment',
            automatic_payment_methods: { enabled: true },
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: 'Failed to create payment intent' });
    }
});
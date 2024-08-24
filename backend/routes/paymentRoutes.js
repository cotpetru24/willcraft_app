//--------------this works , do not delete

// import express from 'express';
// import { registerUser, loginUser, getCurrentUser } from '../controllers/userController.js';
// import { protect } from '../middleware/authMiddleware.js';
// import { v4 as uuidv4 } from 'uuid';
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_API_SECRET);

// const router = express.Router();

// router.post('/', (req, res) => {
//     const { product, token } = req.body
//     console.log(`product = ${product}`);
//     console.log(`price = ${product.price}`);
//     const idempontencyKey = uuidv4()

//     return stripe.customers.create({
//         email: token.email,
//         source: token.id
//     })
//         .then(customer => {
//             stripe.charges.create({
//                 amount: product.price * 100,
//                 currency: 'gbp',
//                 customer: customer.id,
//                 receipt_email: token.email,
//                 description: product.name,
//                 shipping: {
//                     name: token.card.name,
//                     address: {
//                         country: token.card.address_country,
//                     }
//                 }
//             }, { idempontencyKey })
//         })
//         .then(result => res.status(200).json(result))
//         .catch(err => console.log(err))

// });


// export { router as paymentRoutes };






import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();  // Make sure to load env variables before using them

const stripe = new Stripe(process.env.STRIPE_API_SECRET);

const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
    const { product } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.price * 100, // Stripe works with the smallest currency unit
            currency: 'gbp',
            description: product.name,
            automatic_payment_methods: { enabled: true },
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.log('Error creating payment intent:', error);
        res.status(500).send({ error: 'Failed to create payment intent' });
    }
});

export { router as paymentRoutes };



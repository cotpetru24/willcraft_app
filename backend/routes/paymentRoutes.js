import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { createPayment, paymentIntent,getPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getPayment);

router.post('/create-payment-intent', protect, paymentIntent);

router.post('/', protect, createPayment);

export { router as paymentRoutes };


